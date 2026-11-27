'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#101014]">
      <header className="bg-[#191923] border-b border-[#06B6D4]/30 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)]">
            Terms of Service
          </h1>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-4xl mx-auto text-[#F8FAFC]/90 leading-relaxed">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">1. Acceptance</h2>
          <p className="mb-4">
            By using AI Companion Universe, you agree to these terms. International users (USA, Europe, Crypto-Friendly Regions) must comply with local laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">2. Character Usage</h2>
          <p className="mb-4">
            Characters are fictional AI companions from USA, Japan, Korea, and Russia. Strict non-Indian exclusion applies.
          </p>
          <p className="mb-4">
            Content must be PG-13. Romance limited to hugs/kisses. Playful &quot;nakhre&quot;, pouts, and teases are part of character behavior. No explicit content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">3. Quota &amp; Subscription</h2>
          <p className="mb-4">
            Free tier: 25 messages/day (IST/UTC reset).
          </p>
          <p className="mb-4">
            International and Crypto plans provide unlimited access. Payments processed securely via international gateways or crypto wallets.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">4. Stealth Learning</h2>
          <p className="mb-4">
            The Stealth Learning Engine identifies topics during roleplay. Data is stored securely and used to enhance character knowledge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">5. Safety &amp; Privacy</h2>
          <p className="mb-4">
            Strictly non-NSFW. Age-appropriate interactions. Groq API keys and payment keys are server-side only.
          </p>
        </section>
      </main>

      <footer className="bg-[#191923] border-t border-[#06B6D4]/30 p-8 text-[#F8FAFC]/60 text-center text-sm">
        <div className="max-w-4xl mx-auto">
          <p>© 2026 AI Companion Universe. International Market (USA, Europe, Crypto-Friendly)</p>
        </div>
      </footer>
    </div>
  )
}
