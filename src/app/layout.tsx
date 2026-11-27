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
        {/* Compact Top Bar & Left Slide-Out Drawer Container */}
        <div className="flex flex-col min-h-screen">
          {/* Compact Top Bar */}
          <header className="bg-surface border-b border-[#06B6D4]/30 p-3 flex justify-between items-center md:p-4 z-50">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors p-2" aria-label="Menu">
                ☰
              </button>
              <h1 className="text-xl md:text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)] truncate">
                AI Companion Universe
              </h1>
            </div>
            <div className="flex gap-2 md:gap-4">
              <a href="/" className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors text-sm md:text-base">
                Home
              </a>
              <a href="/subscription" className="text-[#F8FAFC] hover:text-[#EC4899] transition-colors text-sm md:text-base">
                Plans
              </a>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-h-screen-dark">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
