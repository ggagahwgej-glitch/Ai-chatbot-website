'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [ageGroup, setAgeGroup] = useState('college') // teen, college, adult
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 1. Create Auth User
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // 2. Create Profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: user?.id,
        username,
        email,
        age_group: ageGroup,
        created_at: new Date().toISOString()
      }])

    if (profileError) {
      setError(profileError.message)
      // Optional: Delete auth user if profile creation fails
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-secondary p-8 rounded-2xl border border-secondaryAccent/30 shadow-xl">
        <h1 className="text-3xl font-bold text-primaryAccent mb-6 text-center">
          Join the Universe
        </h1>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-text/80 text-sm mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-text/80 text-sm mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-text/80 text-sm mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
              required
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
            disabled={loading}
            className="w-full bg-primaryAccent text-background py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-text/60 text-sm">
          Already have an account? <Link href="/login" className="text-primaryAccent hover:text-secondaryAccent transition-colors">Login</Link>
        </div>
      </div>
    </div>
  )
}
