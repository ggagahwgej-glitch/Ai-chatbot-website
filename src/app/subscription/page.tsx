'use client'

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Vibrant Background */}
      <div className="absolute inset-0 z-0 bg-[#101014]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-[#06B6D4]/10 to-[#EC4899]/10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 p-6 bg-[#191923]/90 backdrop-blur-md border-b border-[#06B6D4]/30 glow-border-cyan">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
          Subscription & International Plans
        </h1>
      </header>

      <main className="flex-1 p-4 md:p-8 relative z-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* International Positioning */}
          <div className="bg-[#101014] rounded-3xl border border-[#06B6D4]/30 p-8 mb-8 glow-border-cyan shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-6">
              Global Access: USA, Europe & Crypto-Friendly Regions
            </h2>
            <p className="text-[#F8FAFC]/80 text-lg mb-6">
              Experience the AI Companion Universe from anywhere in the world. Designed for international English-speaking and European users, with support for crypto-friendly regions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['USA & North America', 'Europe & UK', 'Crypto-Friendly Regions'].map((region, i) => (
                <div key={i} className="bg-[#191923]/60 p-4 rounded-xl border border-[#06B6D4]/20 glow-border-cyan">
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-2">{region}</h3>
                  <p className="text-[#F8FAFC]/80 text-sm">Optimized interface and localized support.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Free Plan */}
            <div className="bg-[#101014] rounded-3xl border border-[#06B6D4]/30 p-8 glow-border-cyan">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-6">
                Free Plan
              </h3>
              <ul className="space-y-4 text-[#F8FAFC]/80 text-sm mb-8">
                <li className="flex gap-2"><span>✓</span> 25 messages per day (IST/UTC reset)</li>
                <li className="flex gap-2"><span>✓</span> All International Characters (USA, Japanese, Korean, Russian)</li>
                <li className="flex gap-2"><span>✓</span> Stealth learning engine</li>
                <li className="flex gap-2"><span>✓</span> Immersive blue/white chat UI</li>
              </ul>
              <button className="w-full bg-[#191923] border border-[#06B6D4]/30 text-[#F8FAFC] py-3 rounded-xl font-semibold hover:bg-[#06B6D4]/10 transition-all duration-300 glow-border-cyan">
                Start Free
              </button>
            </div>

            {/* Premium / Crypto Plan */}
            <div className="bg-[#101014] rounded-3xl border border-[#EC4899]/30 p-8 glow-border-rose relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#EC4899] text-[#101014] px-4 py-1 text-xs font-bold rotate-45 -translate-y-1/2 -translate-x-1/2">
                COMING SOON
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-6">
                Premium International Plan
              </h3>
              <ul className="space-y-4 text-[#F8FAFC]/80 text-sm mb-8">
                <li className="flex gap-2"><span>✓</span> Unlimited messages</li>
                <li className="flex gap-2"><span>✓</span> Extended memory & learning</li>
                <li className="flex gap-2"><span>✓</span> Premium international characters (Anime/Handsome/Waifu/Mafia)</li>
                <li className="flex gap-2"><span>✓</span> Advanced scenarios</li>
              </ul>
              
              {/* Payment Options Placeholder */}
              <div className="mt-8 p-4 bg-[#191923]/80 rounded-xl border border-[#EC4899]/20 glow-border-rose">
                <h4 className="text-sm font-bold text-[#EC4899] mb-3 uppercase tracking-wider">Payment Methods</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-[#F8FAFC]/80 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span> International Credit/Debit
                  </div>
                  <div className="flex items-center gap-2 text-[#F8FAFC]/80 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#EC4899]"></span> Crypto Wallets (BTC, ETH, Stablecoins)
                  </div>
                  <div className="flex items-center gap-2 text-[#F8FAFC]/80 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span> European SEPA/Bank Transfer
                  </div>
                </div>
                <p className="text-[#F8FAFC]/50 text-xs mt-4 italic">
                  Environment variables: PAYMENT_GATEWAY_URL, CRYPTO_PROVIDER_KEY (Server-side only)
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] glow-border">
                Join Waitlist (Crypto/International)
              </button>
            </div>
          </div>

          {/* Safety & Architecture Note */}
          <div className="mt-12 p-6 bg-[#191923]/60 rounded-2xl border border-[#8B5CF6]/30 glow-border">
            <h3 className="text-xl font-bold text-[#8B5CF6] mb-3">Architecture & Safety</h3>
            <ul className="space-y-2 text-[#F8FAFC]/80 text-sm">
              <li>✓ GROQ_API_KEY strictly server-side in /api/chat</li>
              <li>✓ Character Rules: Strictly non-Indian / International (USA, Japanese, Korean, Russian)</li>
              <li>✓ Anime/Handsome/Waifu/Mafia support</li>
              <li>✓ English-only replies, understanding broken English without grammar correction</li>
              <li>✓ Never says "sorry" or "I cannot" or mentions AI</li>
              <li>✓ Romance strictly limited to hugs/kisses with playful "nakhre" and topic twist</li>
              <li>✓ 3-4 line present-tense replies with blue action / white dialogue formatting</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
