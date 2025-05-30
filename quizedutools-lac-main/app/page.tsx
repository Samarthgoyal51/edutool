import { QuizForm } from "@/components/quiz-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-blue-800">Personalized Quiz Platform</h1>
          <p className="mt-4 text-lg text-blue-600">Generate custom quizzes on any topic using AI</p>
        </div>

        <QuizForm />
      </div>
    </main>
  )
}
