interface ResponseDisplayProps {
  response: {
    mood: string
    message: string
    suggestion: string
  }
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h3 className="text-xl font-medium text-slate-800 mb-6">Your Mindful Analysis</h3>
      </div>

      <div className="space-y-6">
        {/* Mood Label */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full border border-blue-200/50">
            <span className="text-lg font-bold text-slate-800">{response.mood}</span>
          </div>
        </div>

        {/* Calming Message */}
        <div className="text-center px-4">
          <p className="text-slate-700 italic leading-relaxed text-lg">"{response.message}"</p>
        </div>

        {/* Wellness Suggestion */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-400 rounded-r-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 mb-2">Wellness Suggestion</h4>
              <p className="text-slate-700 leading-relaxed">{response.suggestion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
