'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LibraryPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', 'current_user') // Replace with actual user ID
      .order('updated_at', { ascending: false })
    if (!error) setConversations(data)
    setLoading(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#F8FAFC]">Loading...</div>

  return (
    <div className="min-h-screen bg-[#101014] p-6">
      <h1 className="text-4xl font-bold text-[#F8FAFC] mb-8 drop-shadow-[0_0_12px_rgba(248,250,252,0.5)]">
        Conversation Library
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            href={`/chat/${conv.character_id}`}
            className="block p-6 rounded-xl bg-[#191923] border border-[#8B5CF6]/30 hover:border-[#06B6D4]/50 transition-colors duration-300 glow-border"
          >
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)]">
              {conv.character_name}
            </h3>
            <p className="text-[#F8FAFC]/80 text-sm mb-4">
              Last updated: {new Date(conv.updated_at).toLocaleDateString()}
            </p>
            <div className="text-[#F8FAFC]/60 text-xs truncate">
              {conv.last_message}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
