import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      {/* Compact Banner & Search/Filter Row */}
      <section className="relative p-4 md:p-8 surface-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101014] via-[#191923] to-[#0f0a1a] opacity-90" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#EC4899]/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] text-center">
            Your Stories. Your Characters.
          </h1>
          <p className="text-lg md:text-xl text-[#F8FAFC] mb-6 md:mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center max-w-2xl mx-auto">
            Meet companions from USA, Japan, Korea, and Russia.
          </p>
          
          {/* Search & Filter Row (Compact Mobile) */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6 justify-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border text-sm md:text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <button className="px-3 py-1 text-xs md:text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border">Trending</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full glow-border-cyan">Newest</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 rounded-full glow-border-rose">Anime</button>
              <button className="px-3 py-1 text-xs md:text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border">Realistic</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link href="/characters" className="inline-block bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] px-4 py-2 md:px-10 md:py-4 rounded-full text-sm md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] glow-border">
              Start Chatting
            </Link>
            <Link href="/subscription" className="inline-block bg-[#191923] border border-[#06B6D4]/30 text-[#F8FAFC] px-4 py-2 md:px-10 md:py-4 rounded-full text-sm md:text-lg font-semibold hover:bg-[#06B6D4]/10 transition-all duration-300 glow-border-cyan">
              Subscription & Crypto
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Characters - 2-Column Mobile Grid */}
      <section className="py-12 px-4 surface-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] text-center mb-8 md:mb-12 drop-shadow-[0_0_12px_rgba(248,250,252,0.5)]">
            Featured Companions
          </h2>
          {/* 2-Column Grid on Mobile, 3-Column on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { name: 'Kenji', origin: 'Japan', style: 'Anime', image: '/images/characters/kenji.png' },
              { name: 'Sakura', origin: 'Japan', style: 'Anime', image: '/images/characters/sakura.png' },
              { name: 'Victoria', origin: 'USA', style: 'Realistic', image: '/images/characters/victoria.png' }
            ].map((char) => (
              <Link
                key={char.name}
                href="/characters"
                className="group relative block rounded-xl overflow-hidden border border-[#8B5CF6]/30 bg-[#191923] hover:border-[#06B6D4]/50 transition-colors duration-300 glow-border"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#191923]/90 via-[#191923]/40 to-transparent" />
                <Image
                  src={char.image}
                  alt={char.name}
                  width={400}
                  height={256}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-3 md:p-5 relative z-10">
                  <h3 className="text-lg md:text-2xl font-bold text-[#F8FAFC] mb-1 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)]">
                    {char.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#F8FAFC]/80 mb-2 truncate">
                    {char.origin} • {char.style}
                  </p>
                  <span className="text-[10px] md:text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-[#8B5CF6]/30 glow-border">
                    International AI Companion
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Stacked Cleanly on Mobile) */}
      <section className="py-12 px-4 surface-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] text-center mb-8 md:mb-12 drop-shadow-[0_0_12px_rgba(248,250,252,0.5)]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
            {[
              { title: 'Choose', desc: 'Select from USA, Japanese, Korean, or Russian companions. Anime or Realistic styles.' },
              { title: 'Chat', desc: 'Immersive blue/white formatting. 25 free messages daily (IST/UTC reset).' },
              { title: 'Learn', desc: 'Stealth learning engine discovers new topics while you roleplay.' }
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 rounded-xl bg-[#191923]/50 border border-[#06B6D4]/20 hover:border-[#EC4899]/40 transition-colors glow-border-cyan">
                <h3 className="text-xl md:text-2xl font-bold text-[#8B5CF6] mb-3 md:mb-4">{item.title}</h3>
                <p className="text-sm md:text-[#F8FAFC]/90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Daily Quota */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-br from-[#191923] via-[#101014] to-[#191923] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#06B6D4] mb-3 md:mb-4 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            25 Free Messages Every Day
          </h2>
          <p className="text-sm md:text-[#F8FAFC]/90 text-lg mb-4 md:mb-6">
            Reset daily at 00:00 IST / UTC. International and Crypto-friendly subscription options available for unlimited access.
          </p>
          <Link href="/subscription" className="inline-block bg-[#EC4899] text-[#101014] px-6 py-2 md:px-8 md:py-3 rounded-xl font-bold hover:bg-[#EC4899]/80 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            View Subscription & Crypto Plans
          </Link>
        </div>
      </section>

      {/* Footer (Clean & Compact) */}
      <footer className="bg-[#101014] border-t border-[#06B6D4]/30 p-4 md:p-8 text-[#F8FAFC]/60 text-center text-xs md:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 AI Companion Universe. International Market (USA, Europe, Crypto-Friendly)</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#06B6D4] transition-colors">Terms</Link>
            <Link href="/subscription" className="hover:text-[#EC4899] transition-colors">Crypto & International Plans</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
