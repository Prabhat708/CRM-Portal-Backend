"use client"

import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import FilterBar from "../components/FilterBar";
import SalesChart from "../components/SalesChart";
import { useTheme } from '../context/ThemeProvider';
import HoverTable from "../components/HoverTable";
import ActionTable from "../components/ActionTable";
import { AreaChart } from "lucide-react";
import DonutChart from "../components/DonutChart";
import DataTableSorter from "../components/DataTableSorter";
import CaptionsTable from "../components/CaptionsTable";

const Analytics = () => {
    const { theme } = useTheme();

    const handleProductChange = (value) => {
        console.log("Product changed:", value);
    };

    const handleCategoryChange = (value) => {
        console.log("Category changed:", value);
    };

    const handlePeriodChange = (value) => {
        console.log("Period changed:", value);
    };

    return (
        <div className={`container mx-auto p-6 space-y-6 pt-24 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}> 
            <Navbar isNavbarVisible={true} />

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Month Income"
                    value="$245,280"
                    change={25.57}
                    timestamp="20 Dec 2025, 10:10 AM"
                    trend="up"
                    color="blue"
                />
                <MetricCard
                    title="Month Sales"
                    value="47,950"
                    change={17.88}
                    timestamp="20 Dec 2025, 10:10 AM"
                    trend="up"
                    color="green"
                />
                <MetricCard
                    title="Total Return"
                    value="$103,990"
                    change={12.24}
                    timestamp="20 Dec 2025, 10:10 AM"
                    trend="down"
                    color="red"
                />
            </div>
            <div className="space-y-4">
                <FilterBar
                    onProductChange={handleProductChange}
                    onCategoryChange={handleCategoryChange}
                    onPeriodChange={handlePeriodChange}
                />
                <SalesChart />
                <HoverTable />
                <CaptionsTable />
                <ActionTable />
                <AreaChart />
                <DonutChart />
                <DataTableSorter />
            </div>
        </div>
    );
};

export default Analytics;
