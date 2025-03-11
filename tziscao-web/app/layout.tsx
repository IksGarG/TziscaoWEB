import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar, ChatbotWidgetBox } from '@/components'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tziscao',
  description: 'Tziscao es un lugar mágico en Chiapas, México. Café Tziscao es un café de especialidad cultivado en la región de Tziscao, Chiapas.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background-light text-foreground-light antialiased`}
      >
        <Navbar />
        {children}
        <ChatbotWidgetBox />
      </body>
    </html>
  )
}
