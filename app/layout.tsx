import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
// import { SpeedInsights } from '@vercel/speed-insights/next'
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
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased site-ocean-bg`}>
        <PuzzleProvider>
          {children}
          <PuzzleOverlay />
        </PuzzleProvider>
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}
