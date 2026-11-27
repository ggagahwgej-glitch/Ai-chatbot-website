import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      {/* Compact Top Bar is in layout.tsx. Content starts below. */}
      
      {/* Search Input & Filter Pills (Compact Mobile-First SpicyChat Style) */}
      <section className="p-3 md:p-6 surface-dark relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search companions..."
                className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border text-sm md:text-base"
              />
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2 overflow-x-auto pb-1 md:pb-0">
              <button className="px-3 py-1 text-xs md:text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border whitespace-nowrap">Trending</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full glow-border-cyan whitespace-nowrap">Newest</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 rounded-full glow-border-rose whitespace-nowrap">Anime</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border whitespace-nowrap">Realistic</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full glow-border-cyan whitespace-nowrap">USA</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 rounded-full glow-border-rose whitespace-nowrap">Japan</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border whitespace-nowrap">Korea</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full glow-border-cyan whitespace-nowrap">Russia</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Characters - STRICTLY 2 Character Cards Per Row on Mobile */}
      <section className="py-4 px-3 surface-dark">
        <div className="max-w-4xl mx-auto">
          {/* Clean SpicyChat-Style Feed: 2-column grid on mobile (grid-cols-2) */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {[
              { name: 'Kenji', origin: 'Japan', style: 'Anime', image: '/images/characters/kenji.png' },
              { name: 'Sakura', origin: 'Japan', style: 'Anime', image: '/images/characters/sakura.png' },
              { name: 'Victoria', origin: 'USA', style: 'Realistic', image: '/images/characters/victoria.png' },
              { name: 'Adrian', origin: 'Russia', style: 'Mafia', image: '/images/characters/adrian.png' },
              { name: 'Arjun', origin: 'Korea', style: 'Handsome', image: '/images/characters/arjun.png' }
            ].map((char) => (
              <Link
                key={char.name}
                href={`/chat/${char.name.toLowerCase()}`}
                className="group relative block w-full rounded-xl overflow-hidden border border-[#8B5CF6]/30 bg-[#191923] hover:border-[#06B6D4]/50 transition-colors duration-300 glow-border"
              >
                {/* Portrait Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191923]/90 via-[#191923]/40 to-transparent" />
                
                {/* Character Image */}
                <Image
                  src={char.image}
                  alt={char.name}
                  width={400}
                  height={256}
                  className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Character Info (Compact Mobile) */}
                <div className="p-2 md:p-4 relative z-10">
                  <h3 className="text-sm md:text-xl font-bold text-[#F8FAFC] mb-1 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)] truncate">
                    {char.name}
                  </h3>
                  <p className="text-[10px] md:text-sm text-[#F8FAFC]/80 mb-1 truncate">
                    {char.origin} • {char.style}
                  </p>
                  <span className="text-[8px] md:text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-1.5 py-0.5 md:px-2 md:py-1 rounded-full border border-[#8B5CF6]/30 glow-border">
                    International
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Clean & Compact) */}
      <footer className="bg-[#101014] border-t border-[#06B6D4]/30 p-3 md:p-6 text-[#F8FAFC]/60 text-center text-xs md:text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2026 AI Companion Universe. International Market (USA, Europe, Crypto-Friendly)</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#06B6D4] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
