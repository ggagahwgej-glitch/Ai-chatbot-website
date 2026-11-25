'use client'

import Link from 'next/link'

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primaryAccent mb-8">Conversation History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mock History Cards */}
        {[1, 2, 3].map((i) => (
          <Link key={i} href="/chat/aanya-001" className="bg-secondary p-6 rounded-2xl border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold">A</div>
              <div>
                <h3 className="text-xl font-bold text-primaryAccent">Conversation with Aanya</h3>
                <p className="text-sm text-text/60">Nov 23, 2026 • 12 messages</p>
              </div>
            </div>
            <p className="text-text/80 line-clamp-2 mb-4">
              **She smiles and gently looks at the book.** "Did you know that resilience is the ability to recover..."
            </p>
            <div className="text-xs text-secondaryAccent font-semibold">
              View History
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
