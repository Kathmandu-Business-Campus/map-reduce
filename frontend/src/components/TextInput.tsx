import React from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Enter your text below:
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-2 border-gray-300 rounded p-4 mb-4 focus:border-blue-500 focus:outline-none resize-none"
        rows={4}
        placeholder="Start typing or paste your text here..."
      />
    </div>
  )
}

export default TextInput
