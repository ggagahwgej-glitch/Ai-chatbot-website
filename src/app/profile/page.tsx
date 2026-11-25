'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ProfilePage() {
  const [username, setUsername] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (profile) {
          setUsername(profile.username)
          setAgeGroup(profile.age_group)
        }
      }
    }
    fetchProfile()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username, age_group: ageGroup, updated_at: new Date().toISOString() })
      .eq('id', session.user.id)

    if (updateError) setError(updateError.message)
    else setError('Profile updated successfully!')
  }

  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primaryAccent mb-8">Profile Settings</h1>
        
        {error && <p className={`text-sm mb-4 ${error.includes('success') ? 'text-primaryAccent' : 'text-red-400'}`}>{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-6 bg-secondary p-8 rounded-2xl border border-secondaryAccent/30">
          <div>
            <label className="block text-text/80 text-sm mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
            />
          </div>
          <div>
            <label className="block text-text/80 text-sm mb-2">Age Group</label>
            <select 
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
            >
              <option value="teen">Teen (13-17)</option>
              <option value="college">College Student (18-24)</option>
              <option value="adult">Adult (25+)</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-primaryAccent text-background py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-secondaryAccent/20">
          <h2 className="text-xl font-bold text-primaryAccent mb-4">Account Controls</h2>
          <button className="w-full bg-red-900/20 text-red-400 border border-red-900/50 py-3 rounded-xl font-semibold hover:bg-red-900/30 transition-colors">
            Delete Account & Data
          </button>
        </div>
      </div>
    </div>
  )
}
