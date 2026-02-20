import React, { useState, useCallback, useRef } from 'react'
import TextInput from './components/TextInput'
import ConfigBar from './components/ConfigBar'
import TabNavigation from './components/TabNavigation'
import Summary from './components/Summary'
import ListView from './components/ListView'
import BarChartView from './components/ChartView'
import PieChartView from './components/PieChartView'
import DoughnutChartView from './components/DoughnutChartView'
import LoadingSpinner from './components/LoadingSpinner'

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

type TabType = 'list' | 'bar' | 'pie' | 'doughnut'

const App: React.FC = () => {
  const [text, setText] = useState('')
  const [topN, setTopN] = useState(10)
  const [activeTab, setActiveTab] = useState<TabType>('list')
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  /**
   * Fetch analysis from backend
   */
  const analyzeText = useCallback(async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) {
      setAnalysisData(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json() as AnalysisData
      setAnalysisData(data)
    } catch (error) {
      console.error('Analysis error:', error)
      setAnalysisData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Debounced handler for text input changes
   */
  const handleTextChange = useCallback((newText: string) => {
    setText(newText)

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      analyzeText(newText)
    }, 300)
  }, [analyzeText])

  /**
   * Handle top-N change and re-analyze
   */
  const handleTopNChange = useCallback((value: number) => {
    setTopN(value)
  }, [])

  return (
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-center text-blue-600">
            Word Counter
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Map-Reduce based text analysis - Real-time word frequency visualization
          </p>
        </div>

        {/* Input Section */}
        <TextInput value={text} onChange={handleTextChange} />

        {/* Config Section */}
        <ConfigBar topN={topN} onTopNChange={handleTopNChange} />

        {/* Summary Section - Above Charts */}
        {isLoading ? (
          <LoadingSpinner />
        ) : analysisData ? (
          <>
            <Summary data={analysisData} />

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content Tabs */}
            {activeTab === 'list' && <ListView data={analysisData} topN={topN} />}
            {activeTab === 'bar' && <BarChartView data={analysisData} topN={topN} />}
            {activeTab === 'pie' && <PieChartView data={analysisData} topN={topN} />}
            {activeTab === 'doughnut' && <DoughnutChartView data={analysisData} topN={topN} />}
          </>
        ) : (
          <div className="text-gray-500 text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg">Enter text above to see analysis...</p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p>
          💡 How it works: The backend uses the <strong>Map-Reduce pattern</strong> to analyze word frequencies.
        </p>
        <p className="mt-2">
          Map phase extracts words → Shuffle phase groups by word → Reduce phase sums counts
        </p>
      </div>
    </div>
  )
}

export default App
