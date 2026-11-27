'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [quota, setQuota] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
    fetchQuota()
  }, [params.id])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('character_id', params.id)
      .order('created_at', { ascending: true })
    if (!error) setMessages(data)
  }

  const fetchQuota = async () => {
    const { data, error } = await supabase
      .from('quotas')
      .select('count')
      .eq('user_id', 'current_user') // Replace with actual user ID
      .eq('date', new Date().toISOString().split('T')[0])
    if (!error) setQuota(data?.[0]?.count || 0)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    const newMessage = { role: 'user', content: input, timestamp: new Date() }
    setMessages([...messages, newMessage])
    setInput('')

    try {
      const res = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'current_user', // Replace with actual user ID
          characterId: params.id,
          messages: [...messages, newMessage].map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setMessages([...messages, newMessage, { role: 'assistant', content: data.content, timestamp: new Date() }])
        fetchQuota()
      }
    } catch (err) {
      alert('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen flex flex-col bg-[#101014]">
      {/* Header */}
      <header className="bg-[#191923] border-b border-[#06B6D4]/30 p-4 flex justify-between items-center">
        <Link href="/characters" className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors">
          ← Back to Characters
        </Link>
        <div className="text-[#F8FAFC] font-semibold">
          Quota: {quota}/25 messages today
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${
              msg.role === 'user' 
                ? 'bg-[#8B5CF6]/20 text-[#F8FAFC] border border-[#8B5CF6]/30 glow-border' 
                : 'bg-[#191923] text-[#F8FAFC] border border-[#06B6D4]/30 glow-border-cyan'
            }`}>
              {/* Parse Blue/White formatting */}
              <div dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, '<span class="text-[#60A5FA] font-bold">$1</span>')
                  .replace(/\n/g, '<br/>')
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-[#191923] border-t border-[#06B6D4]/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message... (**Action** in blue, dialogue in white)"
          className="flex-1 bg-[#101014] text-[#F8FAFC] border border-[#8B5CF6]/30 rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] glow-border"
          disabled={loading || quota >= 25}
        />
        <button
          type="submit"
          disabled={loading || quota >= 25}
          className="bg-[#8B5CF6] text-[#101014] px-6 py-2 rounded-lg font-bold hover:bg-[#8B5CF6]/80 transition-colors disabled:opacity-50 glow-border"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
