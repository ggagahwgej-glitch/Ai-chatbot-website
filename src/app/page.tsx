import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background opacity-80" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-primaryAccent mb-6">
            Your Stories. Your Characters. Your World.
          </h1>
          <p className="text-xl md:text-2xl text-secondaryAccent mb-10">
            Meet fascinating AI companions, explore immersive conversations and discover something new every day.
          </p>
          <Link href="/characters" className="inline-block bg-primaryAccent text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondaryAccent transition-colors shadow-lg shadow-primaryAccent/20">
            Meet Your Companion
          </Link>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primaryAccent">
            Meet Your Companions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Aanya */}
            <div className="bg-background rounded-2xl overflow-hidden border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
              <div className="h-64 bg-secondaryAccent/20 flex items-center justify-center relative overflow-hidden">
                <Image src="/images/aanya-portrait.webp" alt="Aanya" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 text-center p-4">
                  <h3 className="text-2xl font-bold text-primaryAccent mb-2">Aanya</h3>
                  <p className="text-sm text-secondaryAccent">College Companion</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/80 mb-4">
                  A fictional university student who enjoys books, music, science, campus life and interesting conversations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">English</span>
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Science</span>
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">History</span>
                </div>
                <Link href="/characters" className="w-full block text-center bg-secondaryAccent/10 text-secondaryAccent py-2 rounded-lg hover:bg-secondaryAccent/20 transition-colors">
                  Start Conversation
                </Link>
              </div>
            </div>

            {/* Victoria */}
            <div className="bg-background rounded-2xl overflow-hidden border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
              <div className="h-64 bg-secondaryAccent/20 flex items-center justify-center relative overflow-hidden">
                <Image src="/images/victoria-portrait.webp" alt="Victoria" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 text-center p-4">
                  <h3 className="text-2xl font-bold text-primaryAccent mb-2">Victoria</h3>
                  <p className="text-sm text-secondaryAccent">CEO Mentor</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/80 mb-4">
                  A fictional successful business executive.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Business</span>
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Economics</span>
                </div>
                <Link href="/characters" className="w-full block text-center bg-secondaryAccent/10 text-secondaryAccent py-2 rounded-lg hover:bg-secondaryAccent/20 transition-colors">
                  Start Conversation
                </Link>
              </div>
            </div>

            {/* Adrian */}
            <div className="bg-background rounded-2xl overflow-hidden border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
              <div className="h-64 bg-secondaryAccent/20 flex items-center justify-center relative overflow-hidden">
                <Image src="/images/adrian-portrait.webp" alt="Adrian" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 text-center p-4">
                  <h3 className="text-2xl font-bold text-primaryAccent mb-2">Adrian</h3>
                  <p className="text-sm text-secondaryAccent">Detective</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/80 mb-4">
                  A fictional detective who enjoys solving mysteries and analysing situations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Psychology</span>
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Logic</span>
                </div>
                <Link href="/characters" className="w-full block text-center bg-secondaryAccent/10 text-secondaryAccent py-2 rounded-lg hover:bg-secondaryAccent/20 transition-colors">
                  Start Conversation
                </Link>
              </div>
            </div>

            {/* Arjun */}
            <div className="bg-background rounded-2xl overflow-hidden border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
              <div className="h-64 bg-secondaryAccent/20 flex items-center justify-center relative overflow-hidden">
                <Image src="/images/arjun-portrait.webp" alt="Arjun" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 text-center p-4">
                  <h3 className="text-2xl font-bold text-primaryAccent mb-2">Arjun</h3>
                  <p className="text-sm text-secondaryAccent">Police Officer</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/80 mb-4">
                  A fictional Indian police officer.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Law</span>
                  <span className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">Civic</span>
                </div>
                <Link href="/characters" className="w-full block text-center bg-secondaryAccent/10 text-secondaryAccent py-2 rounded-lg hover:bg-secondaryAccent/20 transition-colors">
                  Start Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primaryAccent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primaryAccent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primaryAccent text-2xl">1</div>
              <h3 className="text-xl font-bold mb-3">Select Character</h3>
              <p className="text-text/80">Choose from Aanya, Victoria, Adrian, or Arjun.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primaryAccent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primaryAccent text-2xl">2</div>
              <h3 className="text-xl font-bold mb-3">Immersive Chat</h3>
              <p className="text-text/80">Natural storytelling with blue narration and white dialogue.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primaryAccent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primaryAccent text-2xl">3</div>
              <h3 className="text-xl font-bold mb-3">Stealth Learning</h3>
              <p className="text-text/80">Discover vocabulary and knowledge naturally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Daily Conversations */}
      <section className="py-20 px-4 bg-background border-y border-secondaryAccent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primaryAccent">
            25 Free Messages Daily
          </h2>
          <p className="text-xl text-text/80 mb-8">
            Enjoy 25 free conversations every day. Your quota resets at midnight IST.
          </p>
          <div className="bg-secondary p-8 rounded-2xl border border-secondaryAccent/30">
            <h3 className="text-2xl font-bold text-secondaryAccent mb-4">India-First Design</h3>
            <p className="text-text/80">
              Optimized for India. Mobile-first. IST timezone. INR ready.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-secondary text-center text-text/60 text-sm">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">© {new Date().getFullYear()} AI Companion Universe. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-primaryAccent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primaryAccent transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-primaryAccent transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
