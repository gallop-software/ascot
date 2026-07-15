import { proxy, useSnapshot, subscribe } from 'valtio'
import { DEFAULT_PANEL_COLOR } from '@/utils/panel-colors'

const state = proxy({
  playVideo: false,
  offsetTop: 0,
  windowHeight: 0,
  lastOffsetTop: 0,
  isScrolling: false,
  dialogOpen: false,
  scrollingDirection: 'down',
  lastScrollingDirection: 'down',
  lockScrollDirection: false,
  /** Currently selected panel finish (hex), driven by the color chart picker. */
  panelColor: DEFAULT_PANEL_COLOR,
  /** When flipped true, opens the floating AI chat panel from anywhere. */
  aiSearchOpen: false,
})

export { state, useSnapshot, subscribe, proxy }
