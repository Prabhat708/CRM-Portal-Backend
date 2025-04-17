// components/AreaChart.js
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "../context/ThemeProvider"

const data = [
  { month: "Jan", value: 1650 },
  { month: "Feb", value: 1670 },
  { month: "Mar", value: 1550 },
  { month: "Apr", value: 1750 },
  { month: "May", value: 1550 },
  { month: "Jun", value: 1650 },
  { month: "Jul", value: 1850 },
  { month: "Aug", value: 1600 },
  { month: "Sep", value: 1500 },
  { month: "Oct", value: 1700 },
  { month: "Nov", value: 1400 },
  { month: "Dec", value: 1700 }
]

const AreaChartComponent=()=> {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`w-full p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Area Chart
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke={isDark ? "#9ca3af" : "#6b7280"}
            />
            <YAxis 
              stroke={isDark ? "#9ca3af" : "#6b7280"}
              domain={[1300, 2000]}
            />
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default AreaChartComponent