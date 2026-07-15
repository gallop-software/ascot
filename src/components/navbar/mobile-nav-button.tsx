'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useState, type ReactElement } from 'react'
import bars2Icon from '@iconify/icons-heroicons/bars-2-20-solid'
import xMarkIcon from '@iconify/icons-heroicons/x-mark-20-solid'
import { Icon } from '@/components/icon'
import { MobileNav } from './mobile-nav'

/**
 * Hamburger button (shown on the dark bar) that opens the mobile
 * navigation panel in a sliding dialog.
 */
export function MobileNavButton(): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden rounded-lg transition-colors duration-200 p-3 cursor-pointer -mr-3 text-accent hover:text-accent-dark focus:outline-none"
        aria-label="Open menu"
      >
        <Icon
          icon={bars2Icon}
          className="h-7 w-7"
        />
      </button>

      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={closeModal}
        open={isOpen}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-contrast-dark/60 backdrop-blur-sm duration-500 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 font-body h-screen text-contrast max-w-[86%] md:max-w-[60%] w-full right-0 left-auto">
          <div className="flex justify-end h-full">
            <DialogPanel
              transition
              className="pointer-events-auto h-full bg-body shadow-xl overflow-y-auto scrollbar-hide w-full duration-500 ease-in-out transition data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-body-dark/60">
                <DialogTitle className="font-heading text-lg font-semibold tracking-wide text-contrast">
                  Menu
                </DialogTitle>
                <button
                  type="button"
                  className="rounded-full p-1.5 cursor-pointer -mr-2 text-contrast hover:text-accent focus:outline-none"
                  onClick={closeModal}
                  aria-label="Close menu"
                >
                  <Icon
                    icon={xMarkIcon}
                    className="h-7 w-7"
                  />
                </button>
              </div>

              <MobileNav close={closeModal} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
