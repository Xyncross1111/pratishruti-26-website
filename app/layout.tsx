import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PuzzleProvider } from '@/components/atlantis/PuzzleProvider'
import PuzzleOverlay from '@/components/atlantis/PuzzleOverlay'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pratishruti 2026 • Atlas of Atlantis',
  description: 'Dive into the depths of Atlantis. Experience the immersive world of Pratishruti 2026—a journey through ancient ruins, bioluminescent wonders, and forgotten treasures.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <PuzzleProvider>
          {children}
          <PuzzleOverlay />
        </PuzzleProvider>
        <Analytics />
      </body>
    </html>
  )
}
