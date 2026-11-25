'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primaryAccent mb-8">Terms of Service</h1>
      <p className="text-text/80 mb-6 leading-relaxed">
        Last Updated: November 23, 2026
      </p>
      <div className="space-y-6 text-text/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-secondaryAccent mb-4">1. Usage Policy</h2>
          <p>Free users receive 25 messages per day (IST timezone). Premium features may be added later. Use of the platform must comply with Indian laws and safety boundaries (non-NSFW, no explicit content).</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-secondaryAccent mb-4">2. Content Boundaries</h2>
          <p>Strictly non-NSFW. No explicit sexual content, nudity, or adult-minor romantic relationships. Professional mentor characters remain professional. AI characters will redirect inappropriate requests with playful attitude ('nakhre') and topic change.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-secondaryAccent mb-4">3. Intellectual Property</h2>
          <p>Characters and generated content belong to the platform. Users retain ownership of their personal profile data.</p>
        </section>
      </div>
    </div>
  )
}
