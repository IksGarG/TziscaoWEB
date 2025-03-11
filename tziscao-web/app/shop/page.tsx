'use client'

import { ShopItem } from '@/components'

const products = [
  {
    name: 'Café Tziscao ☕',
    description:
      'Café de especialidad arábica 100% puro, cultivado en Chiapas.',
    price: '$250 MXN',
    image: '/tziscao1.png',
  },
  {
    name: 'Miel Artesanal 🍯',
    description:
      'Miel orgánica pura, cosechada de manera sostenible en Tziscao.',
    price: '$150 MXN',
    image: '/honey1.png',
  },
  {
    name: 'Chocolate Artesanal 🍫',
    description: 'Chocolate hecho a mano con cacao local de Tziscao y sin conservantes.',
    price: '$180 MXN',
    image: '/chocolate1.png',
  },
]

export default function Shop() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center py-16 bgimg">
      <div className="container mx-auto px-6">
        <h1 className="text-foreground-light font-playfair mb-8 text-center text-5xl font-bold">
          Nuestra Tienda
        </h1>

        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, index) => (
            <ShopItem key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}
