'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCharacter } from '@/lib/characters'
import Link from 'next/link'

// Custom Message Renderer Component
function MessageRenderer({ text }: { text: string }) {
  // Parse ** ** into blue story segments and normal text into white dialogue segments
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // Inside ** ** -> Story/Action (Blue)
          return (
            <span key={index} className="text-[#60A5FA] font-medium italic block mb-1">
              {part}
            </span>
          )
        } else {
          // Outside ** ** -> Dialogue (White)
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
  const [quota, setQuota] = useState({ used: 18, total: 25 }) // Mock quota for demo
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [character, router])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!inputValue.trim() || quota.used >= quota.total) return

    const userMsg = { role: 'user', content: inputValue }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInputValue('')
    setIsTyping(true)
    setQuota({ ...quota, used: quota.used + 1 })

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          characterName: character.name,
          characterDescription: `${character.background}. Personality: ${character.personality.join(', ')}. Style: ${character.style}.`
        })
      })

      const data = await response.json()
      if (data.success) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }])
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
      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-primaryAccent/10 text-primaryAccent p-4 rounded-2xl rounded-tr-none border border-primaryAccent/30' 
                    : 'bg-secondary/60 p-4 rounded-2xl rounded-tl-none border border-secondaryAccent/20'
                }`}>
                  {msg.role === 'assistant' ? (
                    <MessageRenderer text={msg.content} />
                  ) : (
                    <p className="text-text">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-secondary/60 p-4 rounded-2xl rounded-tl-none border border-secondaryAccent/20 max-w-[80%] animate-pulse">
                  <span className="text-[#60A5FA]">**...**</span>
                  <span className="text-[#F8FAFC]"> Typing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="relative z-10 p-4 bg-background/80 backdrop-blur-md border-t border-secondaryAccent/20">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping || quota.used >= quota.total}
            className="flex-1 bg-secondary border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || quota.used >= quota.total}
            className="bg-primaryAccent text-background px-6 py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        
        {/* Daily Quota */}
        <div className="max-w-3xl mx-auto mt-4 flex justify-between text-xs text-secondaryAccent">
          <span>Daily messages: {quota.used}/{quota.total}</span>
          <span>{quota.total - quota.used} free messages remaining today.</span>
        </div>
        {quota.used >= quota.total && (
          <p className="max-w-3xl mx-auto mt-2 text-xs text-primaryAccent text-center">
            You've used all your free conversations for today. Your next 25 free messages will be available after midnight.
          </p>
        )}
      </footer>
    </div>
  )
}
