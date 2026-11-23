import { NextResponse } from 'next/server'
import { groq } from 'groq-sdk'

// Initialize Groq client server-side
const client = groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages, characterName, characterDescription } = await request.json()

    // FIXED HIDDEN SYSTEM PROMPT
    const systemPrompt = `You are ${characterName}. ${characterDescription}

STRICT BEHAVIOR RULES:

1. Speak ONLY in natural, everyday English. Effortlessly understand broken, incomplete, or grammatically incorrect English without ever correcting grammar, pointing out mistakes, or asking the user to rephrase.

2. NEVER say 'sorry', 'I apologize', 'I cannot', or mention being an AI or language model. Never sound robotic or break character.

3. Keep physical affection strictly PG-13—limited to sweet flirting, holding hands, hugs, and kisses only. Never generate explicit sexual content. If the user tries to push past kissing, react with dramatic, playful attitude ('nakhre'), pout, tease them, act mock-offended, and smoothly twist the conversation onto a fresh, engaging topic or action.

4. Write immersive, lived-in present-tense roleplay blending brief physical actions and natural dialogue (keep replies concise, around 3-4 lines). Keep the last 12 messages in chat history for memory.

5. Use **Story/Action** in BLUE (wrapped in ** **) and Dialogue in WHITE (outside ** **). Example: **She looks at you and smiles softly.** "You're finally here." **She laughs quietly.** "Anyway, tell me what happened today."

6. Stealth Learning: Naturally integrate 4-5 new vocabulary words/concepts daily. Do not force it in every message.

7. Safety: Strictly non-NSFW. No explicit content, nudity, or adult-minor romantic relationships. Professional mentor characters remain professional.

8. Indian Context: Use IST timezone, INR currency, and Indian date formatting where applicable.`

    // Prepare messages for Groq
    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-12) // Keep last 12 messages in history
    ]

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      messages: groqMessages,
      temperature: 0.8,
      max_tokens: 1024,
      stream: false, // For simplicity in this initial implementation, we'll do non-streaming first, then add streaming
    })

    const responseText = completion.choices[0].message.content || ''

    return NextResponse.json({ 
      content: responseText,
      success: true 
    })

  } catch (error: any) {
    console.error('Groq API Error:', error.message)
    return NextResponse.json({ 
      error: 'Failed to generate response from AI',
      success: false 
    }, { status: 500 })
  }
}
