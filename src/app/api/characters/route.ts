import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// Secure server-side endpoint for character publishing
export async function POST(request: Request) {
  try {
    const { name, description, style, origin, portraitPath } = await request.json()
    
    // In a real production app, verify admin session here
    // const { data: { session } } = await supabase.auth.getSession()
    // if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { error } = await supabase
      .from('characters')
      .insert([{
        name,
        role: 'Custom Character',
        personality: ['Custom'],
        background: `${description}. Origin: ${origin}. Style: ${style}.`,
        learning_subjects: ['General knowledge'],
        style,
        relationship_boundary: 'Friendly',
        portrait_path: portraitPath,
        card_thumbnail: portraitPath,
        chat_background: portraitPath,
        system_prompt_template: `...` // Fixed hidden system prompt will be injected in chat route
      }])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    
    return NextResponse.json({ success: true, message: 'Character published' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
