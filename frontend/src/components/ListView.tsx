import React from 'react'

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

interface ListViewProps {
  data: AnalysisData
  topN: number
}

const ListView: React.FC<ListViewProps> = ({ data, topN }) => {
  const topRepeated = data.repeated.slice(0, topN)

  return (
    <div>
      {/* Unique Words Section - First */}
      <h2 className="font-semibold mt-0 mb-2 text-lg text-green-700">Unique Words ({data.unique.length})</h2>
      <div className="bg-green-50 rounded p-4 mb-6">
        {data.unique.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.unique.map((word) => (
              <span
                key={word}
                className="bg-green-200 hover:bg-green-300 px-3 py-1 rounded text-sm transition"
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No unique words found</p>
        )}
      </div>

      {/* Top N Repeated Words Section */}
      <h2 className="font-semibold mb-2 text-lg text-blue-700">Top {topN} Repeated Words</h2>
      <div className="bg-gray-50 rounded p-4">
        {topRepeated.length > 0 ? (
          topRepeated.map(([word, count]) => (
            <div key={word} className="flex justify-between border-b py-2 hover:bg-gray-100">
              <span className="font-medium">{word}</span>
              <span className="text-blue-600 font-bold">{count}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No repeated words found</p>
        )}
      </div>
    </div>
  )
}

export default ListView

