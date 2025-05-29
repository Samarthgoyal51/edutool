import { QuizForm } from "@/components/quiz-form"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Personalized Quiz Platform</h1>
          <p className="mt-4 text-lg text-muted-foreground">Generate custom quizzes on any topic using AI</p>
        </div>

        <QuizForm />
      </div>
    </main>
  )
}
