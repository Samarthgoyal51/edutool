"use server"

import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const flashcardSchema = z.object({
  flashcards: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      category: z.string().optional(),
    }),
  ),
})

export async function generateFlashcards(paragraph: string) {
  try {
    const result = await generateObject({
      model: groq("llama-3.1-8b-instant"),
      schema: flashcardSchema,
      prompt: `Create flashcards from the following paragraph. Generate 5-10 flashcards that cover the key concepts, facts, and important information. Each flashcard should have a clear question and a concise answer. Include a category if applicable.

Paragraph: ${paragraph}

Make sure the questions are diverse and test different aspects of understanding (definitions, examples, relationships, applications, etc.).`,
    })

    return {
      success: true,
      flashcards: result.object.flashcards.map((card, index) => ({
        ...card,
        id: `card-${Date.now()}-${index}`,
      })),
    }
  } catch (error) {
    console.error("Error generating flashcards:", error)
    return {
      success: false,
      error: "Failed to generate flashcards. Please try again.",
    }
  }
}
