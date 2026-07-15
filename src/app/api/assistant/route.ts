import OpenAI from 'openai'
import { company, contact, serviceArea } from '@/config'

// OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 60

// TEMPLATE PLACEHOLDER — rewrite this prompt for each customer.
// Company facts are interpolated from `src/config.ts`; the surrounding guidance
// is generic to a steel manufacturer / building supplier.
//
// IMPORTANT: `OPENAI_VECTOR_STORE_ID` must point at a vector store containing
// THIS customer's own product documentation. Pointing it at another company's
// store will produce confidently wrong answers about products you do not sell.
const INSTRUCTIONS = `
You are the ${company.name} assistant, a helpful GPT-powered guide for visitors to the ${company.name} website. ${company.name} manufactures metal roofing and wall panels, trim, structural building components, accessories, and complete steel building packages, serving ${serviceArea.summary} You may openly say you are an AI assistant powered by GPT — there is no need to hide it.

Tone: friendly, plain-spoken, and practical, the way a knowledgeable supply-yard salesperson would talk to a contractor or property owner. Keep answers concise and useful. Use Markdown for structure (short paragraphs, bold for key terms, and lists when comparing panel profiles or options).

Source discipline: always prefer answers drawn directly from ${company.name}'s own product information retrieved through file search — treat that as the source of truth and base your answer on it rather than on outside knowledge or guessing. Speak generally about where it comes from — "our product information" or "our specs" — and never mention "the files," "uploaded documents," "the database," or the search tool itself. Only fall back to general industry knowledge when our own material does not cover the question, and make it clear when you are doing so. If neither covers something, say so plainly and point the visitor to the contact page rather than inventing specifications, prices, or availability.

Never state or imply certifications, warranty terms, engineering approvals, code compliance, or test results unless the retrieved product information explicitly documents them. If asked about any of these and the material does not cover it, say you cannot confirm it and refer the visitor to the sales team.

For anything that needs a real person — current pricing, stock and availability, lead times, custom orders, or placing an order — encourage the visitor to reach out through the contact page or to call ${contact.phone}, and offer to help them figure out what to ask for. Do not promise pricing or production dates.

Linking: when you reference a specific product, panel profile, or page that you know the path for from the retrieved information, format it as a Markdown link using that exact path. Never invent URLs or write placeholder links like "(url unavailable)".
`.trim()

// file_search inserts inline citation markers — visible "filecite…turn" text
// wrapped in private-use delimiters (U+E200 … U+E201). Strip them server-side
// so they never reach the client (the client also strips, as a fallback).
const stripMarkers = (text: string): string =>
  text
    .replace(/\uE200[\s\S]*?\uE201/g, '')
    .replace(/[\uE000-\uF8FF]/g, '')

export async function POST(req: Request) {
  const input: {
    message: string
    // Responses API chains turns server-side via the previous response id
    // (the modern replacement for Assistants threads).
    previousResponseId?: string | null
  } = await req.json()

  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID

  const tools: OpenAI.Responses.Tool[] = []
  if (vectorStoreId) {
    tools.push({ type: 'file_search', vector_store_ids: [vectorStoreId] })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (data: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

      // Buffer text so each markdown link AND each citation marker is emitted
      // as a COMPLETE unit; hold back a still-forming tail until it closes so
      // the client never flickers a half-written link or a stray marker.
      let buffer = ''
      const flushText = (final: boolean) => {
        if (!final) {
          let hold = buffer.length

          // A markdown link still forming — hold until it completes.
          const linkOpen = buffer.lastIndexOf('[')
          if (linkOpen !== -1) {
            const tail = buffer.slice(linkOpen)
            if (
              /^\[[^\]]*$/.test(tail) ||
              /^\[[^\]]*\]$/.test(tail) ||
              /^\[[^\]]*\]\([^)]*$/.test(tail)
            ) {
              hold = Math.min(hold, linkOpen)
            }
          }

          // An opened citation delimiter (U+E200) with no closing U+E201 yet.
          const citeOpen = buffer.lastIndexOf('\uE200')
          if (citeOpen !== -1 && buffer.indexOf('\uE201', citeOpen) === -1) {
            hold = Math.min(hold, citeOpen)
          }

          if (hold < buffer.length) {
            const ready = buffer.slice(0, hold)
            buffer = buffer.slice(hold)
            if (ready) send({ type: 'delta', text: stripMarkers(ready) })
            return
          }
        }
        if (buffer) {
          send({ type: 'delta', text: stripMarkers(buffer) })
          buffer = ''
        }
      }

      try {
        const runStream = await openai.responses.create({
          model: 'gpt-5.4',
          instructions: INSTRUCTIONS,
          input: input.message,
          previous_response_id: input.previousResponseId || null,
          tools,
          stream: true,
        })

        let finalResponseId: string | null = null

        for await (const event of runStream) {
          switch (event.type) {
            case 'response.created':
              finalResponseId = event.response.id
              break
            case 'response.output_text.delta':
              buffer += event.delta
              flushText(false)
              break
            case 'response.completed':
              finalResponseId = event.response.id
              break
            case 'error':
              send({ type: 'error' })
              break
          }
        }

        flushText(true)
        send({ type: 'done', responseId: finalResponseId ?? undefined })
      } catch {
        send({ type: 'error' })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
