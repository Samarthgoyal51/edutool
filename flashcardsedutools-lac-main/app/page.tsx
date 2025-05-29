import { FlashcardGenerator } from "./components/flashcard-generator"
import { GraduationCap, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900">AI Flashcard Generator</h1>
          </div>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Transform any paragraph into interactive flashcards using AI. Perfect for studying, memorization, and
            knowledge retention.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-blue-600">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <FlashcardGenerator />
        </main>

        <footer className="text-center mt-12 text-blue-600">
          <p className="text-sm">Create, study, and export your flashcards with ease</p>
        </footer>
      </div>
    </div>
  )
}
