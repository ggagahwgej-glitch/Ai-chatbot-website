'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ProfilePage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
      if (!profileError && data) setProfile(data[0])
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Implementation for profile update
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#101014]">
      <header className="bg-[#191923] border-b border-[#06B6D4]/30 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)]">
            Profile Settings
          </h1>
          <Link href="/" className="text-[#F8FAFC] hover:text-[#8B5CF6] transition-colors">
            Home
          </Link>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-4xl mx-auto">
        {error && (
          <div className="bg-[#EC4899]/10 border border-[#EC4899]/30 text-[#EC4899] p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6 bg-[#191923] border border-[#8B5CF6]/30 rounded-2xl p-8 glow-border">
          <div>
            <label className="block text-[#F8FAFC]/80 text-sm mb-2">Display Name</label>
            <input
              type="text"
              defaultValue={profile?.display_name || ''}
              className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border"
            />
          </div>

          <div>
            <label className="block text-[#F8FAFC]/80 text-sm mb-2">Region Preference (USA/Europe/Crypto)</label>
            <select className="w-full bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border">
              <option>USA</option>
              <option>Europe</option>
              <option>Crypto-Friendly Region</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5CF6] text-[#101014] px-6 py-3 rounded-xl font-bold hover:bg-[#8B5CF6]/80 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>

        <div className="mt-8 flex gap-4">
          <Link href="/subscription" className="inline-block bg-[#06B6D4] text-[#101014] px-6 py-3 rounded-xl font-bold hover:bg-[#06B6D4]/80 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] glow-border-cyan">
            Manage Subscription
          </Link>
          <Link href="/privacy" className="inline-block bg-[#191923] border border-[#EC4899]/30 text-[#F8FAFC] px-6 py-3 rounded-xl font-bold hover:bg-[#EC4899]/10 transition-colors glow-border-rose">
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  )
}
