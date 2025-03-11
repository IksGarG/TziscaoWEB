'use client'
import React, { MouseEvent } from 'react'
import HeroImages from '../heroImages'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Hero() {
  const router = useRouter()
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push('/aboutus')
  }
  return (
    <div className="flex h-full w-full flex-col-reverse justify-center md:flex-row">
      {/* Hero Image Section */}
      <HeroImages />
      {/* Hero Text Section */}
      <div className="mb-10 flex w-full items-center justify-center p-6 text-center md:mb-0 md:w-1/2 md:p-12 md:text-left">
        <div className="flex w-full max-w-lg flex-col items-center space-y-4 md:items-start">
          <h1 className="font-playfair text-center text-4xl font-bold md:text-left md:text-6xl">
            Café Tziscao
          </h1>
          <p className="font-crimson text-center text-xl md:text-left md:text-3xl">
            Cultivado con pasión, servido con{' '}
            <span className="text-secondary">amor</span>.
          </p>
          <p className="font-crimson text-md text-center md:text-left md:text-lg">
            Directo desde el corazón de Chiapas hasta tu taza, apoyando a
            familias productoras locales.
          </p>
          <div className="flex w-full justify-center md:justify-start">
            <button
              className="border-secondary font-crimson text-secondary hover:bg-secondary flex cursor-pointer items-center space-x-2 rounded-lg border-2 px-4 py-2 text-lg transition-all duration-200 hover:scale-105 hover:text-white"
              onClick={handleButtonClick}
            >
              <span>Conoce más</span>
              <MoveRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
