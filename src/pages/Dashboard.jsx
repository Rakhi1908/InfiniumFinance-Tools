import { Link } from "react-router-dom"
import { ArrowRight, Plus, FileText, CreditCard, Phone } from "lucide-react"

const Dashboard = () => {
  // Mock data
  const userData = {
    name: "Preview User",
    totalInvestment: 50000,
    currentValue: 58125,
    totalProfit: 8125,
    profitPercentage: 16.25,
    activePlans: 2,
    plans: [
      {
        name: "Quarterly Compounding",
        amount: 30000,
      },
      {
        name: "Tree Family Plan",
        amount: 20000,
      },
    ],
    nextPayout: {
      amount: 3000,
      date: "30 Jun 2023",
      status: "Scheduled",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {userData.name}</h1>
            <p className="text-gray-600">Manage your investments and track your financial growth</p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800">
            <Plus className="mr-2 h-4 w-4" />
            New Investment
          </button>
        </div>

        {/* Investment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Investment Card */}
          <div className="bg-teal-800 text-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-teal-100">Total Investment</p>
                <p className="mt-1 text-2xl font-bold">₹{userData.totalInvestment.toLocaleString()}</p>
              </div>
              <button className="text-teal-100 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-teal-100">Current Value</p>
                <p className="text-sm font-medium text-white">₹{userData.currentValue.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm font-medium text-teal-100">Total Profit</p>
                <p className="text-sm font-medium text-green-300">
                  ₹{userData.totalProfit.toLocaleString()} ({userData.profitPercentage}%)
                </p>
              </div>
            </div>
          </div>

          {/* Active Plans Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Plans</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{userData.activePlans}</p>
              </div>
              <div className="bg-teal-100 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-teal-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {userData.plans.map((plan, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">{plan.name}</p>
                  <p className="text-sm font-medium text-gray-900">₹{plan.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Payout Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Next Payout</p>
                <p className="mt-1 text-2xl font-bold text-amber-500">₹{userData.nextPayout.amount.toLocaleString()}</p>
              </div>
              <div className="bg-amber-100 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">{userData.nextPayout.date}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-sm font-medium text-green-600">{userData.nextPayout.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/reports"
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-lg p-3 mr-4">
                <FileText className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Reports</h3>
                <p className="text-sm text-gray-500">Check your investment performance</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            to="/bank-details"
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-lg p-3 mr-4">
                <CreditCard className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Bank Details</h3>
                <p className="text-sm text-gray-500">Manage your bank account information</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </Link>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-lg p-3 mr-4">
                <Phone className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Contact Support</h3>
                <p className="text-sm text-gray-500">Get help with your investments</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
