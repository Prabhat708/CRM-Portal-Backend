// components/ActionTable.js
import { Download } from 'lucide-react'
import { useTheme } from '../context/ThemeProvider'

const dummyData = [
  {
    orderId: "678935899",
    details: "Darknight transparency 36 Icons Pack",
    date: "Nov 24, 2022",
    amount: 38.00,
  },
  {
    orderId: "578433345",
    details: "Seller Fee",
    date: "Aug 10, 2022",
    amount: -2.60,
  },
  {
    orderId: "678935899",
    details: "Cartoon Mobile Emoji Phone Pack",
    date: "May 06, 2022",
    amount: 76.00,
  },
  {
    orderId: "098669322",
    details: "Iphone 12 Pro Mockup Mega Bundle",
    date: "Apr 30, 2022",
    amount: -5.00,
  },
  {
    orderId: "245899092",
    details: "Parcel Shipping / Delivery Service App",
    date: "Feb 29, 2022",
    amount: 204.00,
  }
]

const ActionTable = ()=> {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <tr>
            <th className="text-left py-3 px-4">Order ID</th>
            <th className="text-left py-3 px-4">Details</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Amount</th>
            <th className="text-left py-3 px-4">Invoice</th>
          </tr>
        </thead>
        <tbody className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {dummyData.map((item) => (
            <tr 
              key={item.orderId}
              className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <td className="py-3 px-4">{item.orderId}</td>
              <td className="py-3 px-4">{item.details}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.date}
                </span>
              </td>
              <td className={`py-3 px-4 ${item.amount < 0 ? 'text-purple-500' : ''}`}>
                ${Math.abs(item.amount).toFixed(2)}
              </td>
              <td className="py-3 px-4">
                <button 
                  className={`p-1 rounded-md hover:bg-gray-100 
                    ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ActionTable;