'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface ShopItemProps {
  name: string
  description: string
  price: string
  image: string
}

export default function ShopItem({ name, description, price, image }: ShopItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4 text-center border border-gray-200">
      <div className="relative w-48 h-48">
        <Image src={image} alt={name} fill className="object-cover rounded-md" />
      </div>
      <h2 className="text-xl font-playfair font-bold">{name}</h2>
      <p className="text-gray-600 font-crimson text-sm">{description}</p>
      <span className="text-lg font-semibold text-secondary">{price}</span>
      <button className="bg-secondary hover:bg-secondary-dark flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-all duration-200">
        <ShoppingCart size={20} />
        <span>Agregar al carrito</span>
      </button>
    </div>
  )
}