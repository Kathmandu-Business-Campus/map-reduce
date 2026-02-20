import React from 'react'

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

interface SummaryProps {
  data: AnalysisData
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const stats = [
    {
      label: 'Total Words',
      value: data.totalWords,
      icon: '📝',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      label: 'Unique Words',
      value: data.uniqueWordCount,
      icon: '✨',
      color: 'bg-green-50 border-green-200'
    },
    {
      label: 'Repeated Words',
      value: data.repeatedWordCount,
      icon: '🔁',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      label: 'Avg Frequency',
      value: data.repeatedWordCount > 0 
        ? (data.totalWords / data.uniqueWordCount).toFixed(2)
        : '0',
      icon: '📊',
      color: 'bg-orange-50 border-orange-200'
    }
  ]

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`${stat.color} border rounded-lg p-4 transition hover:shadow-md`}
        >
          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
          <div className="text-sm text-gray-600 mt-1">
            <span className="mr-2">{stat.icon}</span>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Summary
