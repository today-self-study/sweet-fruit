import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl mb-4">🍓</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Sweet Fruit</h2>
        <p className="text-gray-600 mb-8">AI-powered fruit sweetness analyzer</p>

        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
        >
          Test Button: {count}
        </button>

        <p className="mt-8 text-sm text-gray-500">
          Coming soon: Camera, AI analysis, and results!
        </p>
      </div>
    </div>
  )
}

export default App
