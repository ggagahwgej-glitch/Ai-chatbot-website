'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCharacter } from '@/lib/characters'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

function MessageRenderer({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // Story/Action -> BLUE (#60A5FA) with glow
          return (
            <span key={index} className="text-[#60A5FA] font-medium italic block mb-1 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
              {part}
            </span>
          )
        } else {
          // Dialogue -> WHITE (#F8FAFC)
          return (
            <span key={index} className="text-[#F8FAFC] block">
              {part}
            </span>
          )
        }
      })}
    </>
  )
}

export default function CharacterChat({ params }: { params: { id: string } }) {
  const router = useRouter()
  const character = getCharacter(params.id)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [quota, setQuota] = useState({ used: 0, total: 25 })
  const [session, setSession] = useState<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { data: authSession } = supabase.auth.getSession()
    setSession(authSession.data.session)

    if (!character) {
      router.push('/characters')
    } else {
      setLoading(false)
      // Initial greeting
      setMessages([
        {
          role: 'assistant',
          content: `**She smiles and gently looks at you.**\n"Hello! I'm ${character.name}. It's nice to meet you. What would you like to talk about today?"`
        }
      ])
    }

    const subscription = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    }).data.subscription

    return () => subscription.unsubscribe()
  }, [character, router])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!inputValue.trim() || !session || quota.used >= quota.total) return

    const userMsg = { role: 'user', content: inputValue }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          messages: newMessages,
          characterName: character.name,
          characterDescription: `${character.background}. Personality: ${character.personality.join(', ')}. Style: ${character.style}.`,
          userId: session.user.id
        })
      })

      const data = await response.json()
      if (data.success) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }])
        setQuota(data.quota)
      } else {
        alert(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error(error)
      alert('Network error')
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>
  if (!character) return <div className="min-h-screen flex items-center justify-center text-text">Character not found</div>
  if (!session) return <div className="min-h-screen flex flex-col items-center justify-center text-text p-4"><p>Please login first</p><Link href="/login" className="text-[#06B6D4] hover:text-[#8B5CF6] transition-colors mt-4">Login</Link></div>

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
        {/* Vibrant Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101014]/95 via-[#101014]/40 to-[#101014]/95" />
        {/* Subtle Glow Border around chat area */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent hover:border-[#8B5CF6]/10 transition-colors" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 bg-[#191923]/80 backdrop-blur-md border-b border-[#06B6D4]/30 glow-border-cyan">
        <div className="flex items-center gap-4">
          <Link href="/characters" className="text-[#06B6D4] hover:text-[#8B5CF6] transition-colors font-medium">
            ← Back
          </Link>
          <img 
            src={character.portraitPath} 
            alt={character.name} 
            className="w-10 h-10 rounded-full border border-[#06B6D4]/50 object-cover glow-border-cyan"
          />
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">{character.name}</h1>
            <p className="text-xs text-[#06B6D4] font-medium">{character.role} • Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-[#06B6D4] hover:text-[#8B5CF6] transition-colors">
            ⋮
          </button>
        </div>
      </header>

      {/* Chat Body */}
      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] p-4 rounded-2xl rounded-tr-none border border-[#8B5CF6]/30 glow-border' 
                    : 'bg-[#191923]/60 p-4 rounded-2xl rounded-tl-none border border-[#06B6D4]/30 glow-border-cyan'
                }`}>
                  {msg.role === 'assistant' ? (
                    <MessageRenderer text={msg.content} />
                  ) : (
                    <p className="text-[#F8FAFC]">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-[#191923]/60 p-4 rounded-2xl rounded-tl-none border border-[#06B6D4]/30 glow-border-cyan max-w-[80%] animate-pulse">
                  <span className="text-[#60A5FA] font-medium">**...**</span>
                  <span className="text-[#F8FAFC]"> Typing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="relative z-10 p-4 bg-[#191923]/90 backdrop-blur-md border-t border-[#06B6D4]/30 glow-border-cyan">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping || quota.used >= quota.total}
            className="flex-1 bg-[#101014] border border-[#06B6D4]/30 rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors disabled:opacity-50 glow-border-cyan"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || quota.used >= quota.total}
            className="bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border"
          >
            Send
          </button>
        </div>
        
        {/* Daily Quota */}
        <div className="max-w-3xl mx-auto mt-4 flex justify-between text-xs text-[#06B6D4]">
          <span>Daily messages: {quota.used}/{quota.total}</span>
          <span>{quota.total - quota.used} free messages remaining today.</span>
        </div>
        {quota.used >= quota.total && (
          <p className="max-w-3xl mx-auto mt-2 text-xs text-[#EC4899] text-center font-medium">
            You've used all your free conversations for today. Your next 25 free messages will be available after midnight IST.
          </p>
        )}
      </footer>
    </div>
  )
}
