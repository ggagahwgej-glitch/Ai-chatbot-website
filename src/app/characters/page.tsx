'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCharacter } from '@/lib/characters'
import Link from 'next/link'

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>

  return (
    <main className="min-h-screen flex flex-col">
      {/* Vibrant Header */}
      <header className="bg-[#191923] border-b border-[#06B6D4]/30 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
            Characters
          </h1>
          <Link href="/admin" className="text-[#06B6D4] hover:text-[#8B5CF6] transition-colors font-medium">
            Admin / Create
          </Link>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CHARACTERS.map((char) => (
              <Link key={char.id} href={`/chat/${char.id}`} className={`bg-[#101014] rounded-3xl overflow-hidden ${getBorderColor(char.name)} hover:scale-[1.03] transition-all duration-300 group relative`}>
                {/* Vibrant Portrait */}
                <div className="h-72 relative overflow-hidden">
                  <img 
                    src={char.portraitPath} 
                    alt={char.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Vibrant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014]/95 via-[#101014]/30 to-transparent" />
                  {/* Character Info */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-1">{char.name}</h3>
                    <p className="text-sm text-[#06B6D4] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{char.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#F8FAFC]/80 mb-4 line-clamp-3">
                    {char.background}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {char.learningSubjects.slice(0, 3).map((subject, i) => (
                      <span key={i} className="text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full border border-[#8B5CF6]/30 glow-border">
                        {subject}
                      </span>
                    ))}
                    {char.learningSubjects.length > 3 && (
                      <span className="text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-3 py-1 rounded-full border border-[#06B6D4]/30 glow-border-cyan">
                        + {char.learningSubjects.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link href={`/chat/${char.id}`} className="w-full block text-center bg-gradient-to-r from-[#8B5CF6]/20 via-[#06B6D4]/20 to-[#EC4899]/20 text-[#F8FAFC] py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#8B5CF6]/40 hover:via-[#06B6D4]/40 hover:to-[#EC4899]/40 transition-colors font-semibold border border-[#8B5CF6]/30 glow-border">
                    Start Conversation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function getBorderColor(name: string) {
  if (name === 'Kenji') return 'glow-border-cyan'
  if (name === 'Sakura') return 'glow-border-rose'
  return 'glow-border'
}
