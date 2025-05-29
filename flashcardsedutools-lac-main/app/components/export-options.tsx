"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, FileSpreadsheet, FileJson } from "lucide-react"
import type { Flashcard } from "./flashcard-generator"

interface ExportOptionsProps {
  flashcards: Flashcard[]
}

export function ExportOptions({ flashcards }: ExportOptionsProps) {
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(flashcards, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "flashcards.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportAsCSV = () => {
    const headers = ["Question", "Answer", "Category"]
    const csvContent = [
      headers.join(","),
      ...flashcards.map((card) =>
        [
          `"${card.question.replace(/"/g, '""')}"`,
          `"${card.answer.replace(/"/g, '""')}"`,
          `"${card.category || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const dataBlob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "flashcards.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportAsText = () => {
    const textContent = flashcards
      .map(
        (card, index) =>
          `Card ${index + 1}${card.category ? ` (${card.category})` : ""}\nQ: ${card.question}\nA: ${card.answer}\n\n`,
      )
      .join("")

    const dataBlob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "flashcards.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  const printFlashcards = () => {
    const printContent = `
      <html>
        <head>
          <title>Flashcards</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .flashcard { border: 2px solid #3b82f6; margin: 20px 0; padding: 20px; border-radius: 8px; page-break-inside: avoid; }
            .category { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 10px; }
            .question { font-weight: bold; margin-bottom: 10px; color: #1e40af; }
            .answer { color: #374151; }
            @media print { .flashcard { page-break-inside: avoid; } }
          </style>
        </head>
        <body>
          <h1 style="color: #1e40af;">Flashcards</h1>
          ${flashcards
            .map(
              (card) => `
            <div class="flashcard">
              ${card.category ? `<div class="category">${card.category}</div>` : ""}
              <div class="question">Q: ${card.question}</div>
              <div class="answer">A: ${card.answer}</div>
            </div>
          `,
            )
            .join("")}
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Card className="border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Options
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={exportAsJSON} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <FileJson className="h-4 w-4 mr-2" />
            JSON
          </Button>

          <Button onClick={exportAsCSV} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV
          </Button>

          <Button onClick={exportAsText} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <FileText className="h-4 w-4 mr-2" />
            Text
          </Button>

          <Button
            onClick={printFlashcards}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
