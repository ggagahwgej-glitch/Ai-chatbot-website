import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section - VIBRANT UPGRADE */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101014] via-[#191923] to-[#0f0a1a] opacity-90" />
        {/* Vibrant Glow Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#EC4899]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[30%] h-[30%] bg-[#06B6D4]/20 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            Your Stories. Your Characters. Your World.
          </h1>
          <p className="text-xl md:text-2xl text-[#F8FAFC] mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Meet fascinating AI companions, explore immersive conversations and discover something new every day.
          </p>
          <Link href="/characters" className="inline-block bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] glow-border">
            Meet Your Companion
          </Link>
        </div>
      </section>

      {/* Featured Characters - VIBRANT CARDS */}
      <section className="py-20 px-4 bg-[#191923]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
            Meet Your Companions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Aanya', role: 'College Companion', color: 'glow-border', img: '/images/characters/aanya-portrait.png' },
              { name: 'Victoria', role: 'CEO Mentor', color: 'glow-border-cyan', img: '/images/characters/victoria-portrait.png' },
              { name: 'Adrian', role: 'Detective', color: 'glow-border-rose', img: '/images/characters/adrian-portrait.png' },
              { name: 'Arjun', role: 'Police Officer', color: 'glow-border', img: '/images/characters/arjun-portrait.png' }
            ].map((char) => (
              <div key={char.name} className={`bg-[#101014] rounded-3xl overflow-hidden ${char.color} hover:scale-[1.02] transition-all duration-300 group`}>
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={char.img} 
                    alt={char.name} 
                    fill 
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014]/90 via-[#101014]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-1">{char.name}</h3>
                    <p className="text-sm text-[#06B6D4] font-medium">{char.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#F8FAFC]/80 mb-4">
                    Explore unique personality and immersive stories.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full border border-[#8B5CF6]/20">English</span>
                    <span className="text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-3 py-1 rounded-full border border-[#06B6D4]/20">Science</span>
                  </div>
                  <Link href={`/characters`} className="w-full block text-center bg-gradient-to-r from-[#8B5CF6]/20 via-[#06B6D4]/20 to-[#EC4899]/20 text-[#F8FAFC] py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#8B5CF6]/40 hover:via-[#06B6D4]/40 hover:to-[#EC4899]/40 transition-colors font-semibold border border-[#8B5CF6]/30">
                    Start Conversation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '1', title: 'Select Character', desc: 'Choose from Aanya, Victoria, Adrian, Arjun or Create Custom (Anime/Handsome/Waifu/International).' },
              { num: '2', title: 'Immersive Chat', desc: 'Natural storytelling with blue narration and white dialogue. Vibrant UI.' },
              { num: '3', title: 'Stealth Learning', desc: 'Discover vocabulary and knowledge naturally.' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8B5CF6]/20 via-[#06B6D4]/20 to-[#EC4899]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B5CF6] text-2xl font-bold glow-border">
                  {item.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#F8FAFC]">{item.title}</h3>
                <p className="text-[#F8FAFC]/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Daily Conversations */}
      <section className="py-20 px-4 bg-[#101014] border-y border-[#06B6D4]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
            25 Free Messages Daily
          </h2>
          <p className="text-xl text-[#F8FAFC]/80 mb-8">
            Enjoy 25 free conversations every day. Your quota resets at midnight IST.
          </p>
          <div className="bg-[#191923] p-8 rounded-2xl border border-[#06B6D4]/30 glow-border-cyan">
            <h3 className="text-2xl font-bold text-[#06B6D4] mb-4">India-First Design</h3>
            <p className="text-[#F8FAFC]/80">
              Optimized for India. Mobile-first. IST timezone. INR ready.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#191923] text-center text-[#F8FAFC]/60 text-sm">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">© {new Date().getFullYear()} AI Companion Universe. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-[#8B5CF6] transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
