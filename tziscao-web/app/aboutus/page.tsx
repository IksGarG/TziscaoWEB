'use client'

import Image from 'next/image'

export default function AboutUs() {
  return (
    <div className="bgimg min-h-screen w-full flex items-center justify-center bg-background py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        <div className="lg:w-1/2 flex flex-col space-y-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 text-foreground-light font-playfair">
              Quienes Somos
            </h1>
            <p className="text-2xl text-foreground-light leading-relaxed font-crimson">
              Creemos en un café que beneficia a todos. Desde los productores
              locales hasta el medio ambiente, nuestra misión es ofrecer un
              producto excepcional cultivado con respeto y cuidado. Café Tziscao
              es el sabor auténtico de Chiapas con un impacto positivo.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden">
            <Image 
              src="/img1.png" 
              alt="logo" 
              width={500} 
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}