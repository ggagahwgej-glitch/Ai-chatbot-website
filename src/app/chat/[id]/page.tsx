'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCharacter } from '@/lib/characters'
import Link from 'next/link'

export default function CharacterDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const character = getCharacter(params.id)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!character) {
      router.push('/characters')
    } else {
      setLoading(false)
    }
  }, [character, router])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>
  if (!character) return <div className="min-h-screen flex items-center justify-center text-text">Character not found</div>

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Character Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${character.chatBackground || character.portraitPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 bg-background/50 backdrop-blur-md border-b border-secondaryAccent/20">
        <div className="flex items-center gap-4">
          <Link href="/characters" className="text-secondaryAccent hover:text-primaryAccent transition-colors">
            ← Back
          </Link>
          <img 
            src={character.portraitPath} 
            alt={character.name} 
            className="w-10 h-10 rounded-full border border-secondaryAccent/50 object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-primaryAccent">{character.name}</h1>
            <p className="text-xs text-secondaryAccent">{character.role} • Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-secondaryAccent hover:text-primaryAccent transition-colors">
            ⋮
          </button>
        </div>
      </header>

      {/* Chat Body */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Message container */}
          <div className="space-y-6">
            {/* Example Messages */}
            <div className="flex flex-col items-start">
              <div className="bg-secondary/60 p-4 rounded-2xl rounded-tl-none border border-secondaryAccent/20 max-w-[80%]">
                <p className="text-text/80">
                  **She smiles and gently changes the subject, pulling you toward the balcony.**
                </p>
                <p className="text-text mt-2">
                  "Come on, let's get some fresh air. I have something interesting to tell you."
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="bg-primaryAccent/10 text-primaryAccent p-4 rounded-2xl rounded-tr-none border border-primaryAccent/30 max-w-[80%]">
                "That sounds nice. What did you want to tell me?"
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="relative z-10 p-4 bg-background/80 backdrop-blur-md border-t border-secondaryAccent/20">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 bg-secondary border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
          />
          <button className="bg-primaryAccent text-background px-6 py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors">
            Send
          </button>
        </div>
        
        {/* Daily Quota */}
        <div className="max-w-3xl mx-auto mt-4 flex justify-between text-xs text-secondaryAccent">
          <span>Daily messages: 18/25</span>
          <span>7 free messages remaining today.</span>
        </div>
      </footer>
    </div>
  )
}
