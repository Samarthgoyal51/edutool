import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { topic, difficulty, questionCount } = await req.json()

    const prompt = `
      Create a quiz about "${topic}" with ${questionCount} multiple-choice questions at ${difficulty} difficulty level.
      
      Return ONLY a valid JSON object with no markdown formatting, no code blocks, and no backticks.
      The response should be a raw JSON object with the following structure:
      {
        "title": "Quiz title related to the topic",
        "questions": [
          {
            "id": 1,
            "question": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The correct option (exactly as written in options array)",
            "explanation": "Brief explanation of why this is the correct answer"
          }
          // More questions...
        ]
      }
      
      Make sure:
      1. Each question has exactly 4 options
      2. The options are varied and plausible
      3. The correct answer is one of the options (exactly matching text)
      4. The explanation is informative but concise
      5. The difficulty matches what was requested (${difficulty})
      6. Questions are interesting and educational
      7. The JSON is valid and properly formatted
      8. DO NOT include any markdown formatting, code blocks, or backticks in your response
    `

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
    })

    // Clean the response by removing any markdown formatting
    let cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    // Try to find JSON content if it's still wrapped in other text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }

    try {
      // Parse the JSON response
      const quizData = JSON.parse(cleanedText)

      // Validate the quiz data structure
      if (!quizData.title || !Array.isArray(quizData.questions)) {
        throw new Error("Invalid quiz data structure")
      }

      return Response.json(quizData)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError, "Raw text:", cleanedText)
      return Response.json({ error: "Failed to parse quiz data" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error generating quiz:", error)
    return Response.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
