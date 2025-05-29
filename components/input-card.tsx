"use client"

import { useState } from "react"
import ResponseDisplay from "./response-display"

interface AnalysisResponse {
  mood: string
  message: string
  suggestion: string
}

export default function InputCard() {
  const [feeling, setFeeling] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [response, setResponse] = useState<AnalysisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!feeling.trim()) return

    setIsGenerating(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: feeling }),
      })

      if (!res.ok) {
        throw new Error("Failed to analyze your input")
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setFeeling("")
    setResponse(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-800 leading-relaxed">How are you feeling today?</h2>
          <p className="text-slate-600 text-sm font-light">Share your thoughts and let us help you reflect</p>
        </div>

        <div className="space-y-4">
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="I'm feeling..."
            className="w-full h-32 px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-transparent placeholder-slate-400 text-slate-700 font-light leading-relaxed transition-all duration-200"
            maxLength={500}
            disabled={isGenerating}
          />

          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>{feeling.length}/500</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={!feeling.trim() || isGenerating}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              "Analyze"
            )}
          </button>

          {(response || error) && (
            <button
              onClick={handleReset}
              className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-2xl transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {response && <ResponseDisplay response={response} />}
    </div>
  )
}
