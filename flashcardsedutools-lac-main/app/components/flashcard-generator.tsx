"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import { generateFlashcards } from "../actions/generate-flashcards"
import { FlashcardViewer } from "./flashcard-viewer"
import { ExportOptions } from "./export-options"

export interface Flashcard {
  id: string
  question: string
  answer: string
  category?: string
}

export function FlashcardGenerator() {
  const [paragraph, setParagraph] = useState("")
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!paragraph.trim()) {
      setError("Please enter a paragraph to generate flashcards from.")
      return
    }

    setIsGenerating(true)
    setError("")

    const result = await generateFlashcards(paragraph)

    if (result.success) {
      setFlashcards(result.flashcards)
    } else {
      setError(result.error || "Failed to generate flashcards")
    }

    setIsGenerating(false)
  }

  const handleClear = () => {
    setParagraph("")
    setFlashcards([])
    setError("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Flashcards
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="paragraph" className="block text-sm font-medium text-blue-900 mb-2">
                Enter your paragraph or text content:
              </label>
              <Textarea
                id="paragraph"
                placeholder="Paste your paragraph here. The AI will analyze the content and create relevant flashcards covering key concepts, definitions, and important information..."
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                className="min-h-32 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !paragraph.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Flashcards
                  </>
                )}
              </Button>

              <Button
                onClick={handleClear}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {flashcards.length > 0 && (
        <>
          <ExportOptions flashcards={flashcards} />
          <FlashcardViewer flashcards={flashcards} />
        </>
      )}
    </div>
  )
}
