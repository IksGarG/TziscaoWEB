'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import React from 'react'

const floatAnimation = {
  y: [0, -10, 0], // animate up and back down
  transition: {
    duration: 5,
    ease: 'easeInOut',
    repeat: Infinity,
  },
}

function HeroImages() {
  return (
    <div className="relative w-full md:w-1/2 h-[300px] md:h-full flex justify-center items-center">
      <motion.div
        className="absolute bottom-20 left-1/4 md:bottom-2/12 md:left-1/5 z-10 -rotate-12"
        animate={floatAnimation}
      >
        <Image src="/tziscao1.png" alt="hello" width={250} height={250} className="w-40 md:w-[350px]" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-3/6 md:bottom-1/12 md:left-5/12 -z-0 rotate-12"
        animate={{
          ...floatAnimation,
          transition: { ...floatAnimation.transition, delay: 1 },
        }}
      >
        <Image src="/tziscao2.png" width={250} height={250} alt="" className="w-40 md:w-[350px]" />
      </motion.div>
    </div>
  )
}

export default HeroImages