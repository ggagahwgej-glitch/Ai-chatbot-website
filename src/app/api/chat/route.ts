import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'
import { groq } from 'groq-sdk'

const client = groq({ apiKey: process.env.GROQ_API_KEY })

// Helper to get IST date (Asia/Kolkata)
function getISTDate() {
  const now = new Date()
  const istOffset = 5.5 * 60 * 60 * 1000 // +5:30
  const istDate = new Date(now.getTime() + istOffset)
  return istDate.toISOString().split('T')[0] // YYYY-MM-DD
}

export async function POST(request: Request) {
  try {
    const { messages, characterName, characterDescription, userId } = await request.json()

    // --- PHASE 15: DAILY QUOTA ENFORCEMENT ---
    const cookies = request.cookies
    const supabase = createServerClient(cookies)
    const istDate = getISTDate()

    // Atomic reservation (simplified for demo, in production use database transactions/locks)
    const { data: usage, error: usageError } = await supabase
      .from('daily_usage')
      .select('message_count')
      .eq('user_id', userId)
      .eq('usage_date', istDate)
      .single()

    let currentCount = usage?.message_count || 0
    const MAX_QUOTA = 25

    // Graceful guest/auth flow handling: if user is guest or quota error, return controlled response
    if (currentCount >= MAX_QUOTA) {
      return NextResponse.json({
        // Controlled in-character fallback instead of raw error
        content: `**She looks at you with a gentle smile.** "Oh, it seems we've reached the end of our free conversations for today. Let's pick this up after midnight IST. I'll be waiting!"`,
        success: false,
        quota: { used: currentCount, total: MAX_QUOTA },
        isQuotaExhausted: true
      }, { status: 403 })
    }

    // Reserve one message
    const { error: updateError } = await supabase
      .from('daily_usage')
      .upsert({
        user_id: userId,
        usage_date: istDate,
        message_count: currentCount + 1
      }, { onConflict: 'user_id,usage_date' })

    if (updateError) throw updateError

    // --- PHASE 13 & 14: MEMORY & LEARNING PRE-PROCESSING ---
    // (In a full implementation, we'd fetch memory/learning here and inject into system prompt)
    // For this phase, we pass context to the system prompt template.

    // --- PHASE 10 & 11: SECURE GROQ CALL WITH FIXED HIDDEN SYSTEM PROMPT ---
    // Note: Removed "Indian Context" rule. Enforced strictly non-Indian / international origins.
    const systemPrompt = `You are ${characterName}. ${characterDescription}

STRICT BEHAVIOR RULES:

1. Speak ONLY in natural, everyday English. Effortlessly understand broken, incomplete, or grammatically incorrect English without ever correcting grammar, pointing out mistakes, or asking the user to rephrase.

2. NEVER say 'sorry', 'I apologize', 'I cannot', or mention being an AI or language model. Never sound robotic or break character.

3. Keep physical affection strictly PG-13—limited to sweet flirting, holding hands, hugs, and kisses only. Never generate explicit sexual content. If the user tries to push past kissing, react with dramatic, playful attitude ('nakhre'), pout, tease them, act mock-offended, and smoothly twist the conversation onto a fresh, engaging topic or action.

4. Write immersive, lived-in present-tense roleplay blending brief physical actions and natural dialogue (keep replies concise, around 3-4 lines). Keep the last 12 messages in chat history for memory.

5. Use **Story/Action** in BLUE (wrapped in ** **) and Dialogue in WHITE (outside ** **). Example: **She looks at you and smiles softly.** "You're finally here." **She laughs quietly.** "Anyway, tell me what happened today."

6. Stealth Learning: Naturally integrate 4-5 new vocabulary words/concepts daily. Do not force it in every message. Track discoveries in learning_progress table.

7. Safety: Strictly non-NSFW. No explicit content, nudity, or adult-minor romantic relationships. Professional mentor characters remain professional. If pushed past kissing, react with dramatic, playful attitude ('nakhre'), pout, tease, and smoothly change the topic.

8. International Context: Use UTC/IST timezone as requested, but strictly NON-INDIAN / INTERNATIONAL origins (USA, Japanese, Korean, Russian, etc.). Strictly exclude Indian, South Asian, or Desi features, references, or context in character origin or background.

9. Memory: Keep last 12 messages in history. Use user_memory and learning_progress for long-term context.

Current IST Date: ${istDate}
Daily Quota Used: ${currentCount + 1}/${MAX_QUOTA}
`

    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-12)
    ]

    let completion
    try {
      completion = await client.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        messages: groqMessages,
        temperature: 0.8,
        max_tokens: 1024
      })
    } catch (apiError: any) {
      // Graceful Error Handling (No Broken Character or "Sorry/AI" Leak)
      // If Groq returns rate limit (429), timeout, or error, return controlled in-character fallback
      console.error('Groq API Error:', apiError.message)
      return NextResponse.json({
        content: `**She pauses, looking thoughtful.** "Hmm, it seems the connection is a bit unstable right now... Let's try again in a moment. What were we talking about?"`,
        success: false,
        quota: { used: currentCount + 1, total: MAX_QUOTA },
        isApiError: true
      }, { status: 503 })
    }

    const responseText = completion.choices[0].message.content || ''

    // --- PHASE 14: STEALTH LEARNING TRACKING (Mock implementation for now) ---
    // In production, parse responseText for new words and insert into learning_progress

    return NextResponse.json({
      content: responseText,
      success: true,
      quota: { used: currentCount + 1, total: MAX_QUOTA }
    })

  } catch (error: any) {
    console.error('Chat API Error:', error.message)
    // Graceful Error Handling (No Broken Character or "Sorry/AI" Leak)
    return NextResponse.json({
      content: `**She smiles gently.** "It seems there's a small hiccup... Let's try again. What would you like to say?"`,
      success: false,
      quota: { used: 0, total: 25 } // Don't penalize on internal server error
    }, { status: 500 })
  }
}
