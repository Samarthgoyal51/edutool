"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Home, RotateCcw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface QuizData {
  title: string
  questions: Question[]
}

interface QuizResults {
  quizData: QuizData
  selectedAnswers: Record<number, string>
  timestamp: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem("quizResults")

    if (!storedResults) {
      router.push("/")
      return
    }

    try {
      setResults(JSON.parse(storedResults))
    } catch (error) {
      console.error("Error parsing quiz results:", error)
      router.push("/")
    }
  }, [router])

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading results...</p>
      </div>
    )
  }

  const { quizData, selectedAnswers } = results
  const totalQuestions = quizData.questions.length

  // Calculate score
  const correctAnswers = quizData.questions.filter(
    (question) => selectedAnswers[question.id] === question.correctAnswer,
  ).length

  const score = (correctAnswers / totalQuestions) * 100

  // Get feedback based on score
  const getFeedback = () => {
    if (score >= 90) return "Excellent! You've mastered this topic!"
    if (score >= 70) return "Great job! You have a solid understanding."
    if (score >= 50) return "Good effort! Keep studying to improve."
    return "Keep practicing! You'll get better with time."
  }

  const handleTryAgain = () => {
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Quiz Results</h1>
          <p className="mt-2 text-xl text-blue-600">{quizData.title}</p>
        </div>

        <Card className="mb-8 shadow-lg border-blue-100">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-center text-blue-900">Your Score: {Math.round(score)}%</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <Progress value={score} className="h-3" />
            </div>
            <p className="text-center text-lg text-blue-700">{getFeedback()}</p>
            <div className="mt-4 text-center">
              <p className="text-blue-600">
                You got {correctAnswers} out of {totalQuestions} questions correct.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleTryAgain} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Question Review</h2>

        {quizData.questions.map((question, index) => {
          const userAnswer = selectedAnswers[question.id]
          const isCorrect = userAnswer === question.correctAnswer

          return (
            <Card key={question.id} className={`mb-4 ${isCorrect ? "border-green-200" : "border-red-200"}`}>
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  <span className="mt-1">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                  <span>
                    {index + 1}. {question.question}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = option === userAnswer
                    const isCorrectAnswer = option === question.correctAnswer

                    let className = "p-2 rounded"

                    if (isUserAnswer && isCorrectAnswer) {
                      className += " bg-green-100 border border-green-300"
                    } else if (isUserAnswer && !isCorrectAnswer) {
                      className += " bg-red-100 border border-red-300"
                    } else if (isCorrectAnswer) {
                      className += " bg-green-50 border border-green-200"
                    }

                    return (
                      <div key={optIndex} className={className}>
                        {option}
                        {isCorrectAnswer && !isUserAnswer && (
                          <span className="ml-2 text-green-600 text-sm">(Correct answer)</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium">Explanation:</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
