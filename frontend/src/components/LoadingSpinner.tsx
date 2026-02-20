import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-12 h-12">
        {/* Outer spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Animated spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <span className="ml-4 text-gray-600 font-medium">Analyzing text...</span>
    </div>
  )
}

export default LoadingSpinner
