'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function LearningPage() {
  const [discoveries, setDiscoveries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiscoveries()
  }, [])

  const fetchDiscoveries = async () => {
    const { data, error } = await supabase
      .from('learning_discoveries')
      .select('*')
      .eq('user_id', 'current_user') // Replace with actual user ID
      .order('created_at', { ascending: false })
    if (!error) setDiscoveries(data)
    setLoading(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#F8FAFC]">Loading...</div>

  return (
    <div className="min-h-screen bg-[#101014] p-6">
      <h1 className="text-4xl font-bold text-[#06B6D4] mb-8 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
        Stealth Learning Discoveries
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {discoveries.map((disc) => (
          <div key={disc.id} className="p-6 rounded-xl bg-[#191923] border border-[#EC4899]/30 hover:border-[#8B5CF6]/50 transition-colors duration-300 glow-border-rose">
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)]">
              {disc.topic}
            </h3>
            <p className="text-[#F8FAFC]/90 text-sm">
              {disc.content}
            </p>
            <div className="mt-4 text-[#F8FAFC]/60 text-xs">
              Discovered on: {new Date(disc.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
