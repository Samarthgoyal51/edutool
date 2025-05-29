"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff } from "lucide-react"
import type { Flashcard } from "./flashcard-generator"

interface FlashcardViewerProps {
  flashcards: Flashcard[]
}

export function FlashcardViewer({ flashcards }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentCard = flashcards[currentIndex]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowAnswer(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const resetToFirst = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-900">Review Flashcards ({flashcards.length} cards)</h2>
        <div className="text-sm text-blue-600">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
      </div>

      <Card className="border-blue-200 min-h-64">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {currentCard.category && (
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {currentCard.category}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Question:</h3>
                <p className="text-gray-800 text-lg leading-relaxed">{currentCard.question}</p>
              </div>

              {showAnswer && (
                <div className="border-t border-blue-100 pt-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">Answer:</h3>
                  <p className="text-gray-800 text-lg leading-relaxed">{currentCard.answer}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={prevCard}
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button onClick={toggleAnswer} className="bg-blue-600 hover:bg-blue-700 text-white">
          {showAnswer ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Answer
            </>
          )}
        </Button>

        <Button
          onClick={nextCard}
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          onClick={resetToFirst}
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
