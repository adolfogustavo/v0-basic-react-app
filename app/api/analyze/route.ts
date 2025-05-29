import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json()

    if (!userInput || userInput.trim().length === 0) {
      return Response.json({ error: "User input is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: `Analyze this user input and return: a mood label, a brief calming message, and a wellness suggestion (breathing exercise, music, or visual activity). 

Format your response as JSON with these exact keys:
- "mood": a single word or short phrase describing the emotional state
- "message": a brief, empathetic and calming message (2-3 sentences)
- "suggestion": a specific wellness activity suggestion

Input: ${userInput}`,
      temperature: 0.7,
    })

    // Parse the response to extract structured data
    let parsedResponse
    try {
      parsedResponse = JSON.parse(text)
    } catch {
      // Fallback if GPT doesn't return valid JSON
      parsedResponse = {
        mood: "Reflective",
        message: "Thank you for sharing your feelings. It takes courage to express what's on your mind.",
        suggestion: "Try taking 5 deep breaths, inhaling for 4 counts and exhaling for 6 counts.",
      }
    }

    return Response.json(parsedResponse)
  } catch (error) {
    console.error("Error analyzing input:", error)
    return Response.json({ error: "Failed to analyze input" }, { status: 500 })
  }
}
