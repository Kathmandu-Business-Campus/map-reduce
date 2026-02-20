import React from 'react'
import { Pie } from 'react-chartjs-2'

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

interface PieChartViewProps {
  data: AnalysisData
  topN: number
}

const PieChartView: React.FC<PieChartViewProps> = ({ data, topN }) => {
  const topRepeated = data.repeated.slice(0, topN)

  if (topRepeated.length === 0) {
    return <p className="text-gray-500 text-center py-8">No words to display</p>
  }

  const chartData = {
    labels: topRepeated.map(([word]) => word),
    datasets: [
      {
        label: 'Word Frequency',
        data: topRepeated.map(([, count]) => count),
        backgroundColor: [
          '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
          '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverBorderColor: '#000',
        hoverBorderWidth: 3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `Pie Chart - Top ${topN} Words`
      },
      legend: {
        position: 'right' as const,
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed} (${percentage}%)`
          }
        }
      }
    }
  }

  return <Pie data={chartData} options={options} height={300} />
}

export default PieChartView
