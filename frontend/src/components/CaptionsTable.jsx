// components/CaptionsTable.js

import { useTheme } from "../context/ThemeProvider"

const dummyData = [
  { item: "ASOS Ridley High Waist", price: 79.49, quantity: 82, status: "In Progress" },
  { item: "Marco Lightweight Shirt", price: 128.50, quantity: 37, status: "Competed" },
  { item: "Half Sleeve Shirt", price: 39.99, quantity: 64, status: "Pending" },
  { item: "Lightweight Jacket", price: 20.00, quantity: 184, status: "Competed" },
  { item: "Marco Shoes", price: 28.49, quantity: 64, status: "In Progress" },
  { item: "ASOS Ridley High Waist", price: 79.49, quantity: 82, status: "In Progress" }
]

const getStatusColor = (status, isDark) => {
  const colors = {
    "In Progress": isDark ? "text-purple-400" : "text-purple-600",
    "Competed": isDark ? "text-green-400" : "text-green-600",
    "Pending": isDark ? "text-blue-400" : "text-blue-600"
  }
  return colors[status] || ""
}

const CaptionsTable= ()=> {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <tr>
            <th className="text-left py-3 px-4">Item</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Quantity</th>
            <th className="text-left py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {dummyData.map((item, index) => (
            <tr 
              key={index}
              className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <td className="py-3 px-4">{item.item}</td>
              <td className="py-3 px-4">${item.price.toFixed(2)}</td>
              <td className="py-3 px-4">{item.quantity}</td>
              <td className={`py-3 px-4 ${getStatusColor(item.status, isDark)}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default CaptionsTable;