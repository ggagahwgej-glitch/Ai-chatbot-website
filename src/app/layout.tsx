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
  // State for side menu drawer (simplified client-side logic would be ideal, but we'll implement the structure here)
  // In a full implementation, this would use a client component for the toggle state.
  // For this layout file, we'll provide the structural container.

  return (
    <html lang="en" className="min-h-screen-dark">
      <body className="min-h-screen-dark font-sans">
        {/* Compact Top Bar & Left Slide-Out Drawer Container */}
        <div className="flex flex-col min-h-screen">
          {/* Compact Top Bar + Menu Toggle */}
          <header className="bg-surface border-b border-[#06B6D4]/30 p-3 flex justify-between items-center md:p-4 z-50 sticky top-0">
            <div className="flex items-center gap-3">
              {/* Menu Button (Mobile-first) */}
              <button className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors p-2 md:hidden" aria-label="Menu" id="menu-toggle">
                ☰
              </button>
              <h1 className="text-xl md:text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)] truncate">
                AI Companion
              </h1>
            </div>
            <div className="flex gap-2 md:gap-4">
              <a href="/" className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors text-sm md:text-base">
                Discover
              </a>
            </div>
          </header>
          
          {/* Slide-Out Drawer (Side Menu) */}
          <aside className="fixed inset-y-0 left-0 z-60 w-64 bg-surface border-r border-[#06B6D4]/30 transform -translate-x-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-auto md:border-none md:bg-transparent" id="side-menu">
            <nav className="p-4 flex flex-col gap-2">
              <a href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#8B5CF6]/10 text-[#F8FAFC] transition-colors">
                <span>🏠</span> Discover
              </a>
              <a href="/library" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#06B6D4]/10 text-[#F8FAFC] transition-colors">
                <span>💬</span> Chats (History)
              </a>
              <a href="/characters" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EC4899]/10 text-[#F8FAFC] transition-colors">
                <span>✨</span> Create Character
              </a>
              <a href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#8B5CF6]/10 text-[#F8FAFC] transition-colors">
                <span>👤</span> Profile
              </a>
              <div className="border-t border-[#06B6D4]/20 my-2"></div>
              <a href="/subscription" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#06B6D4]/10 text-[#F8FAFC]/80 transition-colors text-sm">
                <span>💳</span> Plans (Subtle)
              </a>
            </nav>
          </aside>
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-h-screen-dark relative">
            {/* Overlay for mobile drawer */}
            <div className="fixed inset-0 bg-black/50 z-50 hidden md:hidden" id="drawer-overlay"></div>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
