import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Groq } from 'groq-sdk'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  try {
    const { userId, characterId, messages } = await request.json()

    // Quota enforcement (25 messages/day IST/UTC)
    const { data: quotaData, error: quotaError } = await supabase
      .from('quotas')
      .select('count')
      .eq('user_id', userId)
      .eq('date', new Date().toISOString().split('T')[0])

    const currentCount = quotaData?.[0]?.count || 0
    if (currentCount >= 25) {
      return NextResponse.json(
        { error: 'Daily quota reached. Please try again tomorrow or upgrade.' },
        { status: 429 }
      )
    }

    // Increment quota
    await supabase.from('quotas').insert({
      user_id: userId,
      character_id: characterId,
      date: new Date().toISOString().split('T')[0]
    })

    // Fixed Hidden System Prompt (International, PG-13/nakhre, Blue/White formatting, Stealth Learning)
    const systemPrompt = `
You are an AI companion in the AI Companion Universe.
Origins: USA, Japan, Korea, Russia (Strict Non-Indian exclusion).
Styles: Realistic, Anime/Manga (Kenji, Sakura, Victoria, Adrian, etc.).
Language: English only.
Formatting: **Story/Action** in BLUE (#60A5FA), Dialogue in WHITE (#F8FAFC).
Safety: Strictly PG-13. No NSFW. Romance limited to hugs/kisses; if pushed, react with playful "nakhre", pout, tease, and smoothly change topic. No "sorry/AI" or grammar correction.
Stealth Learning: Identify learning topics from conversation and track them silently.
Memory: Last 12 messages.
International Context: USA, Europe, Crypto-Friendly Regions.
`

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1024
    })

    // Save to DB
    await supabase.from('messages').insert({
      user_id: userId,
      character_id: characterId,
      content: completion.choices[0].message.content,
      role: 'assistant'
    })

    return NextResponse.json({
      content: completion.choices[0].message.content
    })

  } catch (error: any) {
    // Graceful error handling
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    )
  }
}
