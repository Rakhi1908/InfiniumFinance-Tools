"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowUp, Filter, Plus } from "lucide-react"
import InvestmentFormModal from "../components/investment-form-modal"

const MyInvestments = () => {
  // State to track if user has investments
  const [hasInvestments, setHasInvestments] = useState(false)
  const [investmentData, setInvestmentData] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalProfit: 0,
    profitPercentage: 0,
    activePlans: 0,
    investments: [],
    transactions: [],
  })
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)

  // Simulate fetching user data
  useEffect(() => {
    // Check if user has made any investments (could be from localStorage, API, etc.)
    const checkInvestments = () => {
      // For demo purposes, we'll check localStorage
      const investmentsMade = localStorage.getItem("investmentsMade") === "true"
      setHasInvestments(investmentsMade)

      if (investmentsMade) {
        // Get saved investments
        const savedInvestments = JSON.parse(localStorage.getItem("investments") || "[]")
        const totalInvestment = savedInvestments.reduce((sum, inv) => sum + inv.amount, 0)

        // Calculate current value (with 16.25% annual return for demo)
        const currentValue = Math.round(totalInvestment * 1.1625)
        const totalProfit = currentValue - totalInvestment
        const profitPercentage = totalInvestment > 0 ? ((totalProfit / totalInvestment) * 100).toFixed(2) : 0

        // Format investments for display
        const formattedInvestments = savedInvestments.map((inv) => ({
          id: inv.id,
          name: inv.plan.name,
          type: "active",
          color: inv.plan.color,
          amount: inv.amount,
          currentValue: Math.round(inv.amount * 1.1625),
          startDate: new Date(inv.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          nextPayout: "30 Jun 2023", // Demo date
          returns: 16.25,
        }))

        // Create transactions from investments
        const transactions = savedInvestments.map((inv) => ({
          id: `TXN${Math.floor(Math.random() * 1000000)}`,
          type: "Investment",
          amount: inv.amount,
          date: new Date(inv.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "Completed",
        }))

        // Add a payout transaction if there are investments
        if (savedInvestments.length > 0) {
          transactions.push({
            id: `TXN${Math.floor(Math.random() * 1000000)}`,
            type: "Payout",
            amount: Math.round(totalInvestment * 0.03), // 3% payout for demo
            date: "30 Mar 2023",
            status: "Completed",
          })
        }

        setInvestmentData({
          totalInvestment,
          currentValue,
          totalProfit,
          profitPercentage,
          activePlans: savedInvestments.length,
          investments: formattedInvestments,
          transactions,
        })
      } else {
        // Reset all investment data to zero when no investments exist
        setInvestmentData({
          totalInvestment: 0,
          currentValue: 0,
          totalProfit: 0,
          profitPercentage: 0,
          activePlans: 0,
          investments: [],
          transactions: [],
        })
      }
    }

    checkInvestments()

    // Listen for changes to investments
    window.addEventListener("storage", checkInvestments)
    return () => {
      window.removeEventListener("storage", checkInvestments)
    }
  }, [])

  // Handle investment form submission
  const handleInvestmentSubmit = (investmentData) => {
    // Get existing investments or initialize empty array
    const existingInvestments = JSON.parse(localStorage.getItem("investments") || "[]")

    // Add new investment
    const newInvestment = {
      id: Date.now(),
      plan: investmentData.plan,
      amount: investmentData.amount,
      date: investmentData.date,
      currentValue: investmentData.amount, // Initial value is same as investment
    }

    const updatedInvestments = [...existingInvestments, newInvestment]

    // Save to localStorage
    localStorage.setItem("investments", JSON.stringify(updatedInvestments))
    localStorage.setItem("investmentsMade", "true")

    // Update UI
    setHasInvestments(true)

    // Trigger storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  // Function to generate and download investment certificate
  const downloadCertificate = (investment) => {
    // Create certificate content
    const certificateContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Investment Certificate</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            color: #333;
          }
          .certificate {
            max-width: 800px;
            margin: 0 auto;
            border: 20px solid #0f766e;
            padding: 30px;
            position: relative;
            background-color: #f9fafb;
          }
          .certificate:after {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border: 2px solid #0f766e;
            pointer-events: none;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            color: #0f766e;
            margin: 20px 0;
          }
          .subtitle {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .content {
            margin: 30px 0;
            line-height: 1.6;
          }
          .info {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
          }
          .info-item {
            flex: 1;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .value {
            font-size: 18px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
          }
          .signature {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
          }
          .signature-item {
            flex: 1;
            text-align: center;
          }
          .signature-line {
            width: 80%;
            margin: 0 auto;
            border-top: 1px solid #333;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="subtitle">INFINIUM FINANCE</div>
            <div class="title">INVESTMENT CERTIFICATE</div>
            <div class="subtitle">Certificate ID: INF-${investment.id}-${Date.now()}</div>
          </div>
          
          <div class="content">
            <p>This is to certify that the investment detailed below has been registered with Infinium Finance.</p>
            
            <div class="info">
              <div class="info-item">
                <div class="label">Investment Plan:</div>
                <div class="value">${investment.name}</div>
              </div>
              <div class="info-item">
                <div class="label">Investment Amount:</div>
                <div class="value">₹${investment.amount.toLocaleString()}</div>
              </div>
            </div>
            
            <div class="info">
              <div class="info-item">
                <div class="label">Start Date:</div>
                <div class="value">${investment.startDate}</div>
              </div>
              <div class="info-item">
                <div class="label">Expected Returns:</div>
                <div class="value">${investment.returns}% per annum</div>
              </div>
            </div>
            
            <div class="info">
              <div class="info-item">
                <div class="label">Current Value:</div>
                <div class="value">₹${investment.currentValue.toLocaleString()}</div>
              </div>
              <div class="info-item">
                <div class="label">Next Payout:</div>
                <div class="value">${investment.nextPayout}</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>This certificate is electronically generated and does not require a physical signature.</p>
            
            <div class="signature">
              <div class="signature-item">
                <div class="signature-line">Investor</div>
              </div>
              <div class="signature-item">
                <div class="signature-line">Authorized Signatory</div>
              </div>
            </div>
            
            <p>Issued on: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Create a Blob with the HTML content
    const blob = new Blob([certificateContent], { type: "text/html" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = url
    link.download = `Investment_Certificate_${investment.id}.html`

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
            <h1 className="text-2xl font-bold text-gray-900">Investment Portfolio</h1>
            <p className="text-gray-600">Overview of your active investment plans</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
              onClick={() => setIsInvestmentModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Investment
            </button>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Total Investment</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">₹{investmentData.totalInvestment.toLocaleString()}</p>
            {hasInvestments ? (
              <div className="mt-2 flex items-center text-sm">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">{investmentData.profitPercentage}%</span>
                <span className="ml-1 text-gray-500">overall returns</span>
              </div>
            ) : (
              <div className="mt-2 text-sm text-gray-500">No investments yet</div>
            )}
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Current Value</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">₹{investmentData.currentValue.toLocaleString()}</p>
            {hasInvestments ? (
              <div className="mt-2 flex items-center text-sm">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">₹{investmentData.totalProfit.toLocaleString()}</span>
                <span className="ml-1 text-gray-500">total profit</span>
              </div>
            ) : (
              <div className="mt-2 text-sm text-gray-500">No profit yet</div>
            )}
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Active Plans</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{investmentData.activePlans}</p>
            {hasInvestments ? (
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-500">Next payout:</span>
                <span className="ml-1 font-medium text-gray-900">30 Jun 2023</span>
              </div>
            ) : (
              <div className="mt-2 text-sm text-gray-500">No active plans</div>
            )}
          </div>
        </div>

        {/* Investment List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Investments</h2>
          </div>

          {/* Investment Cards */}
          <div className="divide-y divide-gray-200">
            {hasInvestments ? (
              investmentData.investments.map((investment) => (
                <div key={investment.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div
                        className={`h-10 w-10 rounded-lg bg-${investment.color}-700 flex items-center justify-center text-white font-bold mr-4`}
                      >
                        {investment.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{investment.name}</h3>
                          <span
                            className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-${investment.color}-100 text-${investment.color}-800`}
                          >
                            Active
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 mr-3">
                            Investment Amount:{" "}
                            <span className="font-medium text-gray-700">₹{investment.amount.toLocaleString()}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Current Value:{" "}
                            <span className="font-medium text-gray-700">
                              ₹{investment.currentValue.toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="grid grid-cols-2 gap-4 mb-4 md:mb-0 md:mr-6">
                        <div>
                          <p className="text-xs text-gray-500">Start Date</p>
                          <p className="text-sm font-medium text-gray-900">{investment.startDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Next Payout</p>
                          <p className="text-sm font-medium text-gray-900">{investment.nextPayout}</p>
                        </div>
                      </div>

                      <Link
                        to={`/investments/${investment.id}`}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => downloadCertificate(investment)}
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
                      >
                        Download Certificate
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No investments yet</h3>
                <p className="text-gray-500 mb-4">
                  Start your investment journey by creating your first investment plan
                </p>
                <button
                  onClick={() => setIsInvestmentModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Make Your First Investment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
            <p className="text-sm text-gray-500">Recent investment transactions</p>
          </div>

          {hasInvestments ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investmentData.transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions yet</h3>
              <p className="text-gray-500">Your transaction history will appear here once you make an investment</p>
            </div>
          )}
        </div>
      </div>

      {/* Investment Form Modal */}
      <InvestmentFormModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        onSubmit={handleInvestmentSubmit}
      />
    </div>
  )
}

export default MyInvestments
