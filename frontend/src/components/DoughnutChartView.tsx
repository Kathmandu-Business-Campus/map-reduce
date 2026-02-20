import React from 'react'
import { Doughnut } from 'react-chartjs-2'

interface AnalysisData {
  unique: string[]
  repeated: [string, number][]
  counts: Record<string, number>
  totalWords: number
  uniqueWordCount: number
  repeatedWordCount: number
}

interface DoughnutChartViewProps {
  data: AnalysisData
  topN: number
}

const DoughnutChartView: React.FC<DoughnutChartViewProps> = ({ data, topN }) => {
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
          '#667EEA', '#764BA2', '#F093FB', '#4FACFE', '#00F2FE',
          '#43E97B', '#FA709A', '#FED766', '#FF6B6B', '#4ECDC4'
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
        text: `Doughnut Chart - Top ${topN} Words Distribution`
      },
      legend: {
        position: 'bottom' as const,
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

  return <Doughnut data={chartData} options={options} height={300} />
}

export default DoughnutChartView
