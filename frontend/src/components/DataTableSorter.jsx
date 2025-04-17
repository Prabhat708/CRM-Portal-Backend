// components/DataTableSorter.js
import { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { useTheme } from '../context/ThemeProvider'

const dummyData = [
    {
        id: 1,
        firstName: "Caroline",
        lastName: "Jensen",
        email: "carolinejensen@zidant.com",
        phone: "+1 (821) 447-3782"
    },
    // ... add more dummy data as shown in the image
]

const DataTableSorter = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    // Sorting logic
    const sortData = (data) => {
        if (!sortConfig.key) return data

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1
            }
            return 0
        })
    }

    // Filtering logic
    const filterData = (data) => {
        return data.filter(item =>
            Object.values(item).some(val =>
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }

    // Pagination logic
    const paginateData = (data) => {
        const startIndex = (currentPage - 1) * entriesPerPage
        return data.slice(startIndex, startIndex + entriesPerPage)
    }

    const requestSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) {
            return <ChevronsUpDown className="w-4 h-4" />
        }
        return sortConfig.direction === 'ascending' ?
            <ChevronUp className="w-4 h-4" /> :
            <ChevronDown className="w-4 h-4" />
    }

    const filteredData = filterData(dummyData)
    const sortedData = sortData(filteredData)
    const paginatedData = paginateData(sortedData)
    const totalPages = Math.ceil(filteredData.length / entriesPerPage)

    return (
        <div className={`w-full ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="flex justify-between mb-4">
                <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className={`
            rounded-md border p-2
            ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
          `}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>

                <input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`
            rounded-md border p-2
            ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
          `}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <tr>
                            {['ID', 'First Name', 'Last Name', 'Email', 'Phone'].map((column) => (
                                <th
                                    key={column}
                                    className="text-left py-3 px-4 cursor-pointer"
                                    onClick={() => requestSort(column.toLowerCase().replace(' ', ''))}
                                >
                                    <div className="flex items-center gap-1">
                                        {column}
                                        {getSortIcon(column.toLowerCase().replace(' ', ''))}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                className={`
                  border-t
                  ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}
                `}
                            >
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4">{item.firstName}</td>
                                <td className="py-3 px-4">{item.lastName}</td>
                                <td className="py-3 px-4">{item.email}</td>
                                <td className="py-3 px-4">{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div>
                    Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`
                px-3 py-1 rounded-md
                ${currentPage === page ?
                                    (isDark ? 'bg-gray-700' : 'bg-gray-200') :
                                    'hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default DataTableSorter;