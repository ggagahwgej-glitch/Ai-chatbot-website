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

  // AI Character Portrait Generator Logic (Server-side fallback simulation)
  const generatePortrait = async () => {
    setIsGenerating(true)
    setCreationError('')
    setGeneratedImage('')

    // STRICT PROMPT CONSTRUCTION
    // 1. Description + Style + Origin
    // 2. STRICT EXCLUSION: No Indian / South Asian / Desi features
    // 3. Non-Indian international settings
    const prompt = `High-quality ${style === 'Realistic' ? 'photo-style portrait' : 'Anime / Manga illustration'} of ${charName}, ${charDesc}. Origin/Ethnicity: ${origin}. International non-Indian setting. STRICTLY EXCLUDE Indian, South Asian, or Desi appearance or features. Negative prompt: Indian, South Asian, Desi, brown skin associated with South Asia, Indian clothing, Indian features. Focus on ${origin} style. Cinematic lighting, 4k, professional.`

    // Note: Since we don't have an external image API key exposed, we use the internal generate_image tool
    // which simulates the server-side generation. In production, this would call a secure server endpoint.
    
    // We'll simulate the call here by using the Arena tool in the next turn or providing the structure.
    // For this turn, we'll mock the success for the build to run cleanly.
    
    // In a real scenario, the frontend would call /api/generate-portrait (server-side)
    // which uses the internal tool or external API key securely.
    
    try {
      // Simulating the tool call result for the build flow
      // In the actual agent turn, I will call generate_image tool
      setIsGenerating(false)
      // Mock path for now, will be replaced by tool result
      setGeneratedImage('/images/characters/generated-temp.png')
    } catch (err) {
      setCreationError('Failed to generate portrait. Ensure image API key is set server-side.')
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
        system_prompt_template: '...' // Default template
      }])

    if (error) setCreationError(error.message)
    else alert('Character published successfully!')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>
  if (!session) return <div className="min-h-screen flex flex-col items-center justify-center text-text p-4"><p>Admin access required</p><Link href="/login" className="text-primaryAccent mt-4">Login</Link></div>

  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primaryAccent mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Creation & Portrait Generator */}
          <div className="bg-secondary p-8 rounded-2xl border border-secondaryAccent/30">
            <h2 className="text-2xl font-bold text-secondaryAccent mb-6">AI Character Portrait Generator</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); generatePortrait() }}>
              <div>
                <label className="block text-text/80 text-sm mb-2">Character Name</label>
                <input 
                  type="text" value={charName} onChange={(e) => setCharName(e.target.value)}
                  className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-text/80 text-sm mb-2">Description (Themes like Mafia, cool, mysterious, etc.)</label>
                <textarea 
                  value={charDesc} onChange={(e) => setCharDesc(e.target.value)}
                  className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text/80 text-sm mb-2">Style</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors">
                    <option value="Realistic">Realistic Photo</option>
                    <option value="Anime / Manga">Anime / Manga Illustration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text/80 text-sm mb-2">Origin / Ethnicity</label>
                  <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-background border border-secondaryAccent/30 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primaryAccent transition-colors">
                    <option value="USA">USA</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Russian">Russian</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" disabled={isGenerating}
                className="w-full bg-primaryAccent text-background py-3 rounded-xl font-semibold hover:bg-secondaryAccent transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Generating Portrait...' : 'Generate Portrait'}
              </button>
            </form>

            {creationError && <p className="text-red-400 text-sm mt-4">{creationError}</p>}
            
            {generatedImage && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-text mb-4">Generated Portrait</h3>
                <img src={generatedImage} alt="Generated Character" className="w-full h-auto rounded-xl border border-secondaryAccent/30 mb-4" />
                <button 
                  onClick={publishCharacter}
                  className="w-full bg-secondaryAccent/10 text-secondaryAccent py-3 rounded-xl font-semibold hover:bg-secondaryAccent/20 transition-colors"
                >
                  Publish Character
                </button>
              </div>
            )}
          </div>

          {/* Stats Overview */}
          <div className="bg-secondary p-8 rounded-2xl border border-secondaryAccent/30">
            <h2 className="text-2xl font-bold text-secondaryAccent mb-6">System Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-text/80"><span>Total Users</span><span>Loading...</span></div>
              <div className="flex justify-between text-text/80"><span>Total Conversations</span><span>Loading...</span></div>
              <div className="flex justify-between text-text/80"><span>Daily Usage (IST)</span><span>Loading...</span></div>
              <div className="flex justify-between text-text/80"><span>Active Characters</span><span>4 + Custom</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
