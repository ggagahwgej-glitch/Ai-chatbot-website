import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Companion Universe | International & Crypto',
  description: 'Meet fascinating fictional AI companions from USA, Japan, Korea, and Russia. Immersive chat, stealth learning, and international crypto plans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-screen-dark">
      <body className="min-h-screen-dark font-sans">
        {children}
      </body>
    </html>
  )
}
