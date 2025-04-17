"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "../context/ThemeProvider"

const data = [
    { month: "Jan", thisPeriod: 70000, lastPeriod: 25000 },
    { month: "Feb", thisPeriod: 75000, lastPeriod: 27000 },
    { month: "Mar", thisPeriod: 72000, lastPeriod: 30000 },
    { month: "Apr", thisPeriod: 80000, lastPeriod: 35000 },
    { month: "May", thisPeriod: 85000, lastPeriod: 37000 },
    { month: "Jun", thisPeriod: 90000, lastPeriod: 40000 },
    { month: "Jul", thisPeriod: 100000, lastPeriod: 45000 },
    { month: "Aug", thisPeriod: 137210, lastPeriod: 55470 },
    { month: "Sep", thisPeriod: 150000, lastPeriod: 60000 },
    { month: "Oct", thisPeriod: 160000, lastPeriod: 65000 },
    { month: "Nov", thisPeriod: 175000, lastPeriod: 70000 },
    { month: "Dec", thisPeriod: 190350, lastPeriod: 75000 },
]

const SalesChart = () => {
    const { theme } = useTheme()
    const darkMode = theme === "dark"

    const chartColors = {
        text: darkMode ? "#e5e7eb" : "#374151",
        grid: darkMode ? "#374151" : "#e5e7eb",
        thisPeriod: darkMode ? "#93c5fd" : "#818cf8",
        lastPeriod: darkMode ? "#fcd34d" : "#fbbf24",
    }

    return (
        <div className={`rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4`}>
            <div className="mb-4">
                <h2 className={`flex items-baseline gap-2 text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Total Sales
                    <span className="text-sm font-medium text-green-500">+29% from last month</span>
                </h2>
            </div>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="thisPeriod" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColors.thisPeriod} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartColors.thisPeriod} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="lastPeriod" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColors.lastPeriod} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartColors.lastPeriod} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke={chartColors.text} />
                        <YAxis stroke={chartColors.text} />
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                                borderColor: darkMode ? "#374151" : "#e5e7eb",
                                color: chartColors.text,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="thisPeriod"
                            stroke={chartColors.thisPeriod}
                            fillOpacity={1}
                            fill="url(#thisPeriod)"
                        />
                        <Area
                            type="monotone"
                            dataKey="lastPeriod"
                            stroke={chartColors.lastPeriod}
                            fillOpacity={1}
                            fill="url(#lastPeriod)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesChart;