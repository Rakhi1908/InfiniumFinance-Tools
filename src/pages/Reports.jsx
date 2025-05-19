"use client"

import { useEffect, useRef, useState } from "react"
import { Download, BarChart2, LineChart } from "lucide-react"
import Chart from "chart.js/auto"

const Reports = () => {
  const growthChartRef = useRef(null)
  const returnsChartRef = useRef(null)
  const [growthChart, setGrowthChart] = useState(null)
  const [returnsChart, setReturnsChart] = useState(null)

  useEffect(() => {
    // Growth Chart
    if (growthChartRef.current) {
      const growthCtx = growthChartRef.current.getContext("2d")

      // Create gradient
      const gradient = growthCtx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, "rgba(5, 150, 105, 0.4)")
      gradient.addColorStop(1, "rgba(5, 150, 105, 0.0)")

      // Destroy previous chart if it exists
      if (growthChart) {
        growthChart.destroy()
      }

      const newGrowthChart = new Chart(growthCtx, {
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

      setGrowthChart(newGrowthChart)
    }
  }, [growthChartRef])

  useEffect(() => {
    // Returns Chart
    if (returnsChartRef.current) {
      const returnsCtx = returnsChartRef.current.getContext("2d")

      // Destroy previous chart if it exists
      if (returnsChart) {
        returnsChart.destroy()
      }

      const newReturnsChart = new Chart(returnsCtx, {
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

      setReturnsChart(newReturnsChart)
    }
  }, [returnsChartRef])

  // Download report PDF
  const downloadReportPDF = (reportType) => {
    // Create HTML content for the report
    const reportContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${reportType} Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #333;
    }
    .report {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #0f766e;
      padding: 30px;
      position: relative;
      background-color: #f9fafb;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #0f766e;
      margin: 10px 0;
    }
    .subtitle {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .content {
      margin: 30px 0;
      line-height: 1.6;
    }
    .chart-placeholder {
      width: 100%;
      height: 300px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      border: 1px dashed #ccc;
    }
    .info-section {
      margin: 20px 0;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="report">
    <div class="header">
      <div class="subtitle">INFINIUM FINANCE</div>
      <div class="title">${reportType}</div>
      <div class="subtitle">Report ID: RPT-${Date.now()}</div>
    </div>
    
    <div class="content">
      <p>This report provides detailed information about your investment performance.</p>
      
      <div class="chart-placeholder">
        <p>Chart visualization would appear here in the actual report</p>
      </div>
      
      <div class="info-section">
        <h3>Summary</h3>
        <p>Period: Last 6 months</p>
        <p>Total Investment: ₹50,000</p>
        <p>Current Value: ₹58,125</p>
        <p>Total Profit: ₹8,125 (16.25%)</p>
      </div>
      
      ${
        reportType === "Quarterly Returns"
          ? `
      <h3>Quarterly Performance</h3>
      <table>
        <thead>
          <tr>
            <th>Quarter</th>
            <th>Return (%)</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1</td>
            <td>3.5%</td>
            <td>₹1,750</td>
          </tr>
          <tr>
            <td>Q2</td>
            <td>4.2%</td>
            <td>₹2,100</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td>4.8%</td>
            <td>₹2,400</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td>3.75%</td>
            <td>₹1,875</td>
          </tr>
        </tbody>
      </table>
      `
          : ""
      }
      
      ${
        reportType === "Growth Analysis"
          ? `
      <h3>Monthly Growth</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Value (₹)</th>
            <th>Growth (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>January</td>
            <td>₹50,000</td>
            <td>-</td>
          </tr>
          <tr>
            <td>February</td>
            <td>₹51,500</td>
            <td>3.0%</td>
          </tr>
          <tr>
            <td>March</td>
            <td>₹53,000</td>
            <td>2.9%</td>
          </tr>
          <tr>
            <td>April</td>
            <td>₹54,500</td>
            <td>2.8%</td>
          </tr>
          <tr>
            <td>May</td>
            <td>₹56,000</td>
            <td>2.8%</td>
          </tr>
          <tr>
            <td>June</td>
            <td>₹58,125</td>
            <td>3.8%</td>
          </tr>
        </tbody>
      </table>
      `
          : ""
      }
    </div>
    
    <div class="footer">
      <p>This report is electronically generated and does not require a physical signature.</p>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <p>For any discrepancies, please contact our customer support.</p>
    </div>
  </div>
</body>
</html>
  `

    // Create a Blob with the HTML content
    const blob = new Blob([reportContent], { type: "text/html" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = url
    link.download = `${reportType.replace(/\s+/g, "_")}_Report_${Date.now()}.html`

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Release the URL object
    URL.revokeObjectURL(url)
  }

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
            <button
              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => downloadReportPDF("Investment Summary")}
            >
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
            <button
              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => downloadReportPDF("Growth Analysis")}
            >
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
            <button
              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => downloadReportPDF("Quarterly Returns")}
            >
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
