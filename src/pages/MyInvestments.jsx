import { Link } from "react-router-dom"
import { ArrowUp, Filter, Plus } from "lucide-react"

const MyInvestments = () => {
  // Mock data
  const investments = [
    {
      id: 1,
      name: "Quarterly Compounding Plan",
      type: "active",
      color: "teal",
      amount: 30000,
      currentValue: 34875,
      startDate: "01 Jan 2023",
      nextPayout: "30 Jun 2023",
      returns: 16.25,
    },
    {
      id: 2,
      name: "Tree Family Plan",
      type: "active",
      color: "amber",
      amount: 20000,
      currentValue: 23250,
      startDate: "15 Feb 2023",
      nextPayout: "15 Aug 2023",
      returns: 16.25,
    },
  ]

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
            <button className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800">
              <Plus className="mr-2 h-4 w-4" />
              New Investment
            </button>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Total Investment</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">₹50,000</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">16.25%</span>
              <span className="ml-1 text-gray-500">overall returns</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Current Value</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">₹58,125</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">₹8,125</span>
              <span className="ml-1 text-gray-500">total profit</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Active Plans</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">2</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-500">Next payout:</span>
              <span className="ml-1 font-medium text-gray-900">30 Jun 2023</span>
            </div>
          </div>
        </div>

        {/* Investment List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Investments</h2>
          </div>

          {/* Investment Cards */}
          <div className="divide-y divide-gray-200">
            {investments.map((investment) => (
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
                          <span className="font-medium text-gray-700">₹{investment.currentValue.toLocaleString()}</span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyInvestments
