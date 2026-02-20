import React from 'react'

interface ConfigBarProps {
  topN: number
  onTopNChange: (value: number) => void
}

const ConfigBar: React.FC<ConfigBarProps> = ({ topN, onTopNChange }) => {
  return (
    <div className="flex items-center gap-3 mb-6 bg-gray-50 p-4 rounded">
      <label className="font-semibold text-gray-700">Top N Words:</label>
      <input
        type="number"
        value={topN}
        onChange={(e) => onTopNChange(parseInt(e.target.value) || 10)}
        min="1"
        max="100"
        className="border-2 border-gray-300 px-3 py-2 w-24 rounded focus:border-blue-500 focus:outline-none"
        title="Number of top words to display (1-100)"
      />
      <span className="text-sm text-gray-600">(adjust to show more or fewer words)</span>
    </div>
  )
}

export default ConfigBar
