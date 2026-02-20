import React from 'react'

type TabType = 'list' | 'bar' | 'pie' | 'doughnut'

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'list', label: 'List', icon: '📋' },
    { id: 'bar', label: 'Bar Chart', icon: '📊' },
    { id: 'pie', label: 'Pie Chart', icon: '🥧' },
    { id: 'doughnut', label: 'Doughnut', icon: '🍩' }
  ]

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-t font-semibold transition whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
