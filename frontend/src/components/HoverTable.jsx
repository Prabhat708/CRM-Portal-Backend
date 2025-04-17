// components/HoverTable.js

import { useTheme } from "../context/ThemeProvider"

const dummyData = [
  { name: "ASOS Ridley High Waist", price: 79.49, quantity: 82, amount: 6518.18 },
  { name: "Marco Lightweight Shirt", price: 128.50, quantity: 37, amount: 4754.50 },
  { name: "Half Sleeve Shirt", price: 39.99, quantity: 64, amount: 2559.36 },
  { name: "Lightweight Jacket", price: 20.00, quantity: 184, amount: 3680.00 },
  { name: "Marco Shoes", price: 28.49, quantity: 64, amount: 1965.81 },
  { name: "ASOS Ridley High Waist", price: 79.49, quantity: 82, amount: 6518.18 }
]

const  HoverTable = ()=> {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <tr>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Quantity</th>
            <th className="text-left py-3 px-4">Amount</th>
          </tr>
        </thead>
        <tbody className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {dummyData.map((item, index) => (
            <tr 
              key={index}
              className={`
                border-t
                ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}
              `}
            >
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">${item.price.toFixed(2)}</td>
              <td className="py-3 px-4">{item.quantity}</td>
              <td className="py-3 px-4">${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default HoverTable;