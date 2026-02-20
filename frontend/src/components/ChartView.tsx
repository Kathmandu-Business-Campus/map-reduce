import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

// Register ChartJS modules for react-chartjs-2
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

interface BarChartViewProps {
  data: AnalysisData
  topN: number
}

const BarChartView: React.FC<BarChartViewProps> = ({ data, topN }) => {
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
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        text: `Top ${topN} Words by Frequency`
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Words'
        }
      }
    }
  }

  return <Bar data={chartData} options={options} height={300} />
}

export default BarChartView
