'use client'

import Link from 'next/link'

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen-dark flex flex-col">
      {/* Compact Top Bar (Already in layout, but ensure content fits) */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            International & Crypto Plans
          </h2>
          <p className="text-lg md:text-xl text-[#F8FAFC]/90 max-w-2xl mx-auto">
            Unlock unlimited messages and exclusive AI companions from USA, Japan, Korea, and Russia.
            Support international payments and crypto wallets (ETH, BTC, Stablecoins).
          </p>
        </section>

        {/* Plans Grid - Stacked Cleanly on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Free Plan */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#191923] border border-[#8B5CF6]/30 flex flex-col glow-border">
            <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3 md:mb-4">Free Tier</h3>
            <p className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-4 md:mb-6">0</p>
            <p className="text-sm md:text-[#F8FAFC]/80 mb-6 md:mb-8">
              25 messages/day (IST/UTC reset)<br/>
              Standard AI companions<br/>
              Basic learning engine
            </p>
            <Link href="/characters" className="mt-auto inline-block bg-[#8B5CF6] text-[#101014] px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:bg-[#8B5CF6]/80 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border text-sm md:text-base">
              Get Started
            </Link>
          </div>

          {/* International Plan */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#191923] border-2 border-[#06B6D4] flex flex-col glow-border-cyan relative">
            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-[#06B6D4] text-[#101014] px-3 py-1 md:px-4 md:py-1 rounded-full font-bold text-[10px] md:text-sm">
              Popular
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3 md:mb-4">International</h3>
            <p className="text-3xl md:text-4xl font-bold text-[#06B6D4] mb-4 md:mb-6">$19.99</p>
            <p className="text-sm md:text-[#F8FAFC]/80 mb-6 md:mb-8">
              Unlimited messages<br/>
              Premium Anime/Realistic companions<br/>
              Advanced Stealth Learning<br/>
              USA, Europe, Global support
            </p>
            <Link href="/checkout?plan=international" className="mt-auto inline-block bg-[#06B6D4] text-[#101014] px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:bg-[#06B6D4]/80 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] glow-border-cyan text-sm md:text-base">
              Subscribe
            </Link>
          </div>

          {/* Crypto Plan */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#191923] border border-[#EC4899]/30 flex flex-col glow-border-rose">
            <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3 md:mb-4">Crypto Pro</h3>
            <p className="text-3xl md:text-4xl font-bold text-[#EC4899] mb-4 md:mb-6">0.005 ETH</p>
            <p className="text-sm md:text-[#F8FAFC]/80 mb-6 md:mb-8">
              Unlimited messages<br/>
              Exclusive Anime/Handsome/Waifu presets<br/>
              Priority Groq API access<br/>
              Crypto wallet integration (MetaMask, Phantom)
            </p>
            <Link href="/checkout?plan=crypto" className="mt-auto inline-block bg-[#EC4899] text-[#101014] px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:bg-[#EC4899]/80 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)] glow-border-rose text-sm md:text-base">
              Connect Wallet
            </Link>
          </div>
        </div>

        {/* Payment Methods (Stacked on Mobile) */}
        <section className="mt-12 md:mt-20 p-6 md:p-8 rounded-2xl bg-[#101014] border border-[#8B5CF6]/20 text-center glow-border">
          <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3 md:mb-4">Accepted Payments</h3>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 text-[#F8FAFC]/80 text-sm md:text-base">
            <span>International Credit Cards</span>
            <span>Bank Transfer (SEPA/ACH)</span>
            <span>Crypto: ETH, BTC, USDC, SOL</span>
            <span>Stablecoin (USDT/USDC)</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#191923] border-t border-[#06B6D4]/30 p-4 md:p-8 text-[#F8FAFC]/60 text-center text-xs md:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 AI Companion Universe. Secure International & Crypto Payments.</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#06B6D4] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
