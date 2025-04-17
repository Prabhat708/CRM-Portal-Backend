// components/DonutChart.js
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { useTheme } from "../context/ThemeProvider"

const data = [
  { name: "United States", value: 38.6 },
  { name: "Canada", value: 22.5 },
  { name: "Mexico", value: 30.8 },
  { name: "Other", value: 8.1 }
]

const COLORS = ['#000000', '#8884d8', '#4ade80', '#a78bfa']

const DonutChart= ()=> {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`w-full p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Basic Donut
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default DonutChart;