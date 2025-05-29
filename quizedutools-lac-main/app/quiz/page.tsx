"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export default function QuizPage() {
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Get quiz data from localStorage
    const storedQuizData = localStorage.getItem("quizData")

    if (!storedQuizData) {
      router.push("/")
      return
    }

    try {
      setQuizData(JSON.parse(storedQuizData))
    } catch (error) {
      console.error("Error parsing quiz data:", error)
      router.push("/")
    }
  }, [router])

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading quiz...</p>
      </div>
    )
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const totalQuestions = quizData.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answer,
    })
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(selectedAnswers).length < totalQuestions) {
      alert("Please answer all questions before submitting.")
      return
    }

    setIsSubmitted(true)

    // Store results in localStorage
    const results = {
      quizData,
      selectedAnswers,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("quizResults", JSON.stringify(results))

    // Navigate to results page
    router.push("/results")
  }

  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{quizData.title}</h1>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswers[currentQuestion.id]} onValueChange={handleAnswerSelect}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button onClick={handleSubmit} disabled={!isAnswered}>
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isAnswered}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
