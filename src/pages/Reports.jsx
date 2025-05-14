"use client"

import { useEffect, useRef } from "react"
import { Download, BarChart2, LineChart } from "lucide-react"
import Chart from 'chart.js/auto'

const Reports = () => {
  const growthChartRef = useRef(null)
  const returnsChartRef = useRef(null)

  useEffect(() => {
    // Growth Chart
    if (growthChartRef.current) {
      const growthCtx = growthChartRef.current.getContext("2d")

      // Create gradient
      const gradient = growthCtx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, "rgba(5, 150, 105, 0.4)")
      gradient.addColorStop(1, "rgba(5, 150, 105, 0.0)")

      const growthChart = new Chart(growthCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Portfolio Value",
              data: [50000, 51500, 53000, 54500, 56000, 58125],
              borderColor: "#059669",
              backgroundColor: gradient,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#059669",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#fff",
              titleColor: "#1F2937",
              bodyColor: "#6B7280",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: (context) => {
                  return `₹${context.raw.toLocaleString()}`
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
              },
            },
            y: {
              grid: {
                color: "#F3F4F6",
              },
              ticks: {
                color: "#9CA3AF",
                callback: (value) => {
                  return `₹${value / 1000}k`
                },
              },
              beginAtZero: false,
            },
          },
        },
      })

      return () => {
        growthChart.destroy()
      }
    }
  }, [])

  useEffect(() => {
    // Returns Chart
    if (returnsChartRef.current) {
      const returnsCtx = returnsChartRef.current.getContext("2d")

      const returnsChart = new Chart(returnsCtx, {
        type: "bar",
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "Quarterly Returns",
              data: [3.5, 4.2, 4.8, 3.75],
              backgroundColor: "#059669",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#fff",
              titleColor: "#1F2937",
              bodyColor: "#6B7280",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: (context) => {
                  return `${context.raw}%`
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
              },
            },
            y: {
              grid: {
                color: "#F3F4F6",
              },
              ticks: {
                color: "#9CA3AF",
                callback: (value) => {
                  return `${value}%`
                },
              },
              beginAtZero: true,
            },
          },
        },
      })

      return () => {
        returnsChart.destroy()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Investment Reports</h1>
            <p className="text-gray-600">Track your investment performance over time</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last 1 year</option>
              <option>All time</option>
            </select>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Growth Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <LineChart className="h-5 w-5 text-teal-700 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Growth Analysis</h2>
            </div>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </button>
          </div>

          <div className="p-5">
            <div className="h-80">
              <canvas ref={growthChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Quarterly Returns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-teal-700 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Quarterly Returns</h2>
            </div>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </button>
          </div>

          <div className="p-5">
            <div className="h-80">
              <canvas ref={returnsChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
