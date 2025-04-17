import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { useTheme } from '../context/ThemeProvider'

export default function MetricCard({ title, value, change, timestamp, trend, color }) {
  const { theme } = useTheme()
  const darkMode = theme === "dark"

  const colorClasses = {
    blue: darkMode ? "text-blue-400" : "text-blue-500",
    green: darkMode ? "text-green-400" : "text-green-500",
    red: darkMode ? "text-red-400" : "text-red-500",
  }

  return (
    <div className={`rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4`}>
      <div className="pb-2">
        <h3 className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
          {title}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</div>
          <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{timestamp}</div>
        </div>
        <div className={`flex items-center ${colorClasses[color]}`}>
          {trend === "up" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
          <span className="ml-1 text-sm font-medium">{change}%</span>
        </div>
      </div>
    </div>
  )
}