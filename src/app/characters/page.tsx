'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCharacter } from '@/lib/characters'
import Link from 'next/link'

// Helper to get border color based on character name
function getBorderColor(name: string) {
  if (name === 'Kenji') return 'glow-border-cyan'
  if (name === 'Sakura') return 'glow-border-rose'
  return 'glow-border'
}

export default function CharactersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text">
        Loading...
      </div>
    )
  }

  // Cast or ensure it's an array
  const characters = (getCharacter('international') as unknown as any[]) || []

  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* Vibrant Header */}
        <header className="bg-[#191923] border-b border-[#06B6D4]/30 p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)]">
              AI Companion Universe
            </h1>
            <div className="flex gap-4">
              <Link href="/" className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors">
                Home
              </Link>
              <Link href="/subscription" className="text-[#F8FAFC] hover:text-[#EC4899] transition-colors">
                Plans
              </Link>
            </div>
          </div>
        </header>

        {/* Character Grid */}
        <div className="flex-1 relative p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char: any) => (
              <Link
                key={char.id}
                href={`/chat/${char.id}`}
                className={`relative group block w-full rounded-2xl overflow-hidden border transition-all duration-300 ${getBorderColor(char.name)}`}
              >
                {/* Portrait Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191923]/90 via-[#191923]/40 to-transparent" />
                
                {/* Character Image */}
                <img
                  src={char.image || '/images/characters/placeholder.png'}
                  alt={char.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Character Info */}
                <div className="p-5 relative z-10">
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)]">
                    {char.name}
                  </h3>
                  <p className="text-[#F8FAFC]/80 text-sm mb-4">
                    {char.origin} • {char.style}
                  </p>
                  
                  {/* Learning Subjects */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {char.learningSubjects.slice(0, 3).map((subject: string, i: number) => (
                      <span key={i} className={`text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full border border-[#8B5CF6]/30 ${getBorderColor(char.name)}`}>
                        {subject}
                      </span>
                    ))}
                    {char.learningSubjects.length > 3 && (
                      <span className={`text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-3 py-1 rounded-full border border-[#06B6D4]/30 ${getBorderColor(char.name)}`}>
                        + {char.learningSubjects.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/chat/${char.id}`} className="w-full block text-center bg-gradient-to-r from-[#8B5CF6]/20 via-[#06B6D4]/20 to-[#EC4899]/20 text-[#F8FAFC] py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#8B5CF6]/40 hover:via-[#06B6D4]/40 hover:to-[#EC4899]/40 transition-colors font-semibold border border-[#8B5CF6]/30 glow-border">
                    Start Conversation
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
