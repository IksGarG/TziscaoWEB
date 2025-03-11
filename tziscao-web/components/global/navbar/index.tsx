'use client'

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'
import { Languages, Menu, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'

const NavLinks = ({ mobile = false, onClick = () => {} }) => (
  <>
    <Link
      href="/"
      className={`hover:text-main cursor-pointer transition-colors duration-200 ${
        mobile ? 'py-2 text-2xl' : ''
      }`}
      onClick={onClick}
    >
      Inicio
    </Link>
    <Link
      href="/aboutus"
      className={`hover:text-main cursor-pointer transition-colors duration-200 ${
        mobile ? 'py-2 text-2xl' : ''
      }`}
      onClick={onClick}
    >
      Quienes Somos
    </Link>
    <Link
      href="/meetus"
      className={`hover:text-main cursor-pointer transition-colors duration-200 ${
        mobile ? 'py-2 text-2xl' : ''
      }`}
      onClick={onClick}
    >
      Ven a conocernos
    </Link>
    <Link
      href="/shop"
      className={`hover:text-main cursor-pointer transition-colors duration-200 ${
        mobile ? 'py-2 text-2xl' : ''
      }`}
      onClick={onClick}
    >
      Tienda
    </Link>
  </>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <div className="bg-background/80 font-playfair fixed z-50 flex w-full items-center justify-between p-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center">
        <Image src="/logo2.png" alt="logo" width={70} height={70} priority />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden space-x-8 text-lg md:flex">
        <NavLinks />
      </div>

      <div className="hidden items-center space-x-4 md:flex">
        <button className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light">
          <Languages className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light">
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center space-x-4 md:hidden">
        <button className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light">
          <ShoppingCart className="h-5 w-5" />
        </button>
        <button
          onClick={openModal}
          className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm transform rounded-lg bg-white p-6 shadow-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4 flex flex-col items-center space-y-4 font-crimson">
              <NavLinks mobile onClick={closeModal} />
            </nav>

            {/* Language Switcher */}
            <div className="mt-8 flex justify-center border-t pt-4">
              <button className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary-light">
                <Languages className="h-5 w-5" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default Navbar
