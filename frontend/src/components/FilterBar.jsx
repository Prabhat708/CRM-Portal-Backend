import { useState } from 'react'
import { useTheme } from '../context/ThemeProvider'

export default function FilterBar({ onProductChange, onCategoryChange, onPeriodChange }) {
  const { theme } = useTheme()
  const [productOpen, setProductOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [productValue, setProductValue] = useState('All Products')
  const [categoryValue, setCategoryValue] = useState('All Categories')

  const darkMode = theme === "dark"
  const selectClasses = darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
  const buttonClasses = darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => setProductOpen(!productOpen)}
            className={`w-[180px] flex items-center justify-between px-3 py-2 text-sm border rounded-md ${selectClasses}`}
          >
            {productValue}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {productOpen && (
            <div className={`absolute z-10 w-[180px] mt-1 border rounded-md shadow-lg ${selectClasses}`}>
              {['All Products', 'Digital', 'Physical'].map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setProductValue(item)
                    setProductOpen(false)
                    onProductChange(item.toLowerCase())
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className={`w-[180px] flex items-center justify-between px-3 py-2 text-sm border rounded-md ${selectClasses}`}
          >
            {categoryValue}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {categoryOpen && (
            <div className={`absolute z-10 w-[180px] mt-1 border rounded-md shadow-lg ${selectClasses}`}>
              {['All Categories', 'Electronics', 'Clothing'].map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setCategoryValue(item)
                    setCategoryOpen(false)
                    onCategoryChange(item.toLowerCase())
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {['Weekly', 'Monthly', 'Yearly'].map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period.toLowerCase())}
            className={`px-3 py-1 text-sm border rounded-md ${buttonClasses} ${period === 'Monthly' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  )
}