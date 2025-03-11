'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const images = [
  { src: '/img2.png', alt: 'Finca de Café Tziscao' },
  { src: '/img3.png', alt: 'Proceso de secado del café' },
  { src: '/img4.png', alt: 'Granos de café listos para tostar' },
  { src: '/img5.png', alt: 'Hermosa vista de la finca' },
  { src: '/img6.png', alt: 'Hermosa vista de la finca' },
]

export default function AboutUs() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="bgimg bg-background flex min-h-screen w-full items-center justify-center py-16">
      <div className="container mx-auto flex flex-col items-center gap-12 px-6 lg:flex-row">
        {/* Left Section (Text) */}
        <div className="flex flex-col space-y-8 lg:w-1/2">
          <div className="max-w-2xl">
            <h1 className="text-foreground-light font-playfair mb-6 text-6xl font-bold">
              Ven a conocernos
            </h1>
            <p className="text-foreground-light font-crimson text-2xl leading-relaxed">
              Cerca de nuestra comunidad, en la región de Tziscao, Chiapas,
              México se encuentra la finca de Café Tziscao. Un lugar donde la
              naturaleza y la cultura se unen para ofrecer un café de calidad
              excepcional. Si deseas conocer más acerca de nuestra historia,
              nuestro proceso de producción y degustar nuestro café, no dudes en
              visitarnos. Contamos con unas cabañas rústicas para que puedas
              disfrutar de una estancia inolvidable en medio de la naturaleza.
            </p>
          </div>
        </div>

        {/* Right Section (Image Carousel) */}
        <div className="flex justify-center lg:w-1/2">
          <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            {/* Image Display */}
            <TabPanels>
              {images.map((image, index) => (
                <TabPanel
                  key={index}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    className="h-full w-full rounded-2xl object-cover transition-all duration-500"
                  />
                </TabPanel>
              ))}
            </TabPanels>

            {/* TabList for Thumbnail Selection */}
            <TabList className="mt-4 flex justify-center space-x-2">
              {images.map((image, index) => (
                <Tab key={index} className="focus:outline-none">
                  {({ selected }) => (
                    <div
                      className={`h-16 w-16 overflow-hidden rounded-md border-2 ${
                        selected ? 'border-secondary' : 'border-transparent'
                      } cursor-pointer transition-all duration-200 hover:scale-105`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>
    </div>
  )
}
