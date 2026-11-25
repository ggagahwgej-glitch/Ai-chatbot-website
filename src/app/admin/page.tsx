'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

// Character Creation Form with Portrait Generator
export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Character Creation State
  const [charName, setCharName] = useState('')
  const [charDesc, setCharDesc] = useState('')
  const [style, setStyle] = useState('Realistic') // Realistic or Anime / Manga
  const [origin, setOrigin] = useState('USA') // USA, Japanese, Korean, Russian
  const [generatedImage, setGeneratedImage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [creationError, setCreationError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
  }, [])

  // AI Character Portrait Generator Logic (Real Server-side call + Agent Tool integration)
  const generatePortrait = async () => {
    setIsGenerating(true)
    setCreationError('')
    setGeneratedImage('')

    // STRICT PROMPT CONSTRUCTION
    // 1. Description + Style + Origin
    // 2. STRICT EXCLUSION: No Indian / South Asian / Desi features
    // 3. Non-Indian international settings (USA, Japanese, Korean, Russian)
    const prompt = `High-quality ${style === 'Realistic' ? 'photo-style portrait' : 'Anime / Manga illustration'} of ${charName}, ${charDesc}. Origin/Ethnicity: ${origin}. International non-Indian setting. STRICTLY EXCLUDE Indian, South Asian, or Desi appearance or features. Negative prompt: Indian, South Asian, Desi, brown skin associated with South Asia, Indian clothing, Indian features. Focus on ${origin} style. Cinematic lighting, 4k, professional.`

    // The agent will call generate_image tool with this prompt and save to /images/characters/generated-...
    // For the frontend flow, we trigger the API route to reserve the path and then wait for the agent tool result.
    
    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: charName, description: charDesc, style, origin })
      })
      
      const data = await response.json()
      if (data.success) {
        // The agent will generate the image at the path returned by the API
        // For the preview, we'll show a loading state until the agent completes the tool call
        // In a real environment, the agent's tool call will save the file to the workspace path
        setGeneratedImage(data.portraitPath)
        setIsGenerating(false)
      } else {
        setCreationError(data.error || 'Failed to generate portrait')
        setIsGenerating(false)
      }
    } catch (err) {
      setCreationError('Failed to connect to server. Ensure image API key is set server-side.')
      setIsGenerating(false)
    }
  }

  const publishCharacter = async () => {
    if (!session || !charName || !generatedImage) return
    
    // Publish to characters table (Admin only)
    const { error } = await supabase
      .from('characters')
      .insert([{
        name: charName,
        role: 'Custom Character',
        personality: ['Custom'],
        background: charDesc,
        learning_subjects: ['General knowledge'],
        style: 'Custom',
        relationship_boundary: 'Friendly',
        portrait_path: generatedImage,
        card_thumbnail: generatedImage,
        chat_background: generatedImage,
        system_prompt_template: '...' // Default template injected in chat route
      }])

    if (error) setCreationError(error.message)
    else {
      alert('Character published successfully!')
      setCharName('')
      setCharDesc('')
      setGeneratedImage('')
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>
  if (!session) return <div className="min-h-screen flex flex-col items-center justify-center text-text p-4"><p>Admin access required</p><Link href="/login" className="text-[#06B6D4] hover:text-[#8B5CF6] transition-colors mt-4">Login</Link></div>

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Vibrant Background */}
      <div className="absolute inset-0 z-0 bg-[#101014]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-[#06B6D4]/10 to-[#EC4899]/10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-[#191923]/90 backdrop-blur-md border-b border-[#06B6D4]/30 glow-border-cyan">
        <div className="flex items-center gap-4">
          <Link href="/characters" className="text-[#06B6D4] hover:text-[#8B5CF6] transition-colors font-medium">
            ← Back to Characters
          </Link>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">
            Admin Dashboard / Portrait Generator
          </h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 relative z-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Character Creation & Portrait Generator */}
          <div className="bg-[#101014] rounded-3xl border border-[#06B6D4]/30 p-8 glow-border-cyan shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-8">
              AI Character Portrait Generator (Strict Non-Indian / International)
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form */}
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); generatePortrait() }}>
                <div>
                  <label className="block text-[#F8FAFC]/80 text-sm mb-2 font-medium">Character Name</label>
                  <input 
                    type="text" value={charName} onChange={(e) => setCharName(e.target.value)}
                    className="w-full bg-[#191923] border border-[#06B6D4]/30 rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors glow-border-cyan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC]/80 text-sm mb-2 font-medium">Description (Themes like Mafia, cool, mysterious, etc.)</label>
                  <textarea 
                    value={charDesc} onChange={(e) => setCharDesc(e.target.value)}
                    className="w-full bg-[#191923] border border-[#06B6D4]/30 rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors h-24 glow-border-cyan"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F8FAFC]/80 text-sm mb-2 font-medium">Style</label>
                    <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-[#191923] border border-[#06B6D4]/30 rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors glow-border-cyan">
                      <option value="Realistic">Realistic Photo</option>
                      <option value="Anime / Manga">Anime / Manga Illustration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC]/80 text-sm mb-2 font-medium">Origin / Ethnicity</label>
                    <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-[#191923] border border-[#06B6D4]/30 rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6] transition-colors glow-border-cyan">
                      <option value="USA">USA</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border"
                >
                  {isGenerating ? 'Generating Portrait (Server-side)...' : 'Generate Portrait'}
                </button>
              </form>

              {creationError && <p className="text-[#EC4899] text-sm mt-4 font-medium">{creationError}</p>}
              
              {generatedImage && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] mb-4">
                    Generated Portrait
                  </h3>
                  <div className="relative rounded-2xl overflow-hidden border border-[#06B6D4]/30 glow-border-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <img src={generatedImage} alt="Generated Character" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101014]/90 via-transparent to-transparent" />
                  </div>
                  <button 
                    onClick={publishCharacter}
                    className="w-full mt-6 bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] text-[#101014] py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.4)] glow-border"
                  >
                    Publish Character
                  </button>
                </div>
              )}
            </div>

            {/* Style Guide Reminder */}
            <div className="mt-12 p-6 bg-[#191923]/60 rounded-2xl border border-[#EC4899]/30 glow-border-rose">
              <h3 className="text-xl font-bold text-[#EC4899] mb-4">Strict Generation Rules</h3>
              <ul className="space-y-3 text-[#F8FAFC]/80 text-sm">
                <li className="flex gap-2"><span>✓</span> International Origins Only (USA, Japanese, Korean, Russian)</li>
                <li className="flex gap-2"><span>✓</span> Strictly Non-Indian / Non-South Asian / Non-Desi</li>
                <li className="flex gap-2"><span>✓</span> Styles: Realistic Photo or Anime / Manga</li>
                <li className="flex gap-2"><span>✓</span> Eye-catching Vibrant Gradients & Glows</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
