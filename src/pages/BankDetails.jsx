"use client"

import { useState } from "react"
import { Edit2, AlertCircle } from "lucide-react"

const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false)

  // Mock bank data
  const bankData = {
    accountNumber: "XXXX XXXX 1234",
    accountType: "Savings",
    bankName: "State Bank of India",
    ifscCode: "SBIN0001234",
  }

  const [formData, setFormData] = useState(bankData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save the data to the server here
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bank Details</h1>
            <p className="text-gray-600">Manage your bank account information</p>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Bank Details</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      id="accountType"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" >
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Number</p>
                  <p className="mt-1 text-sm text-gray-900">{bankData.accountNumber}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Account Type</p>
                  <p className="mt-1 text-sm text-gray-900">{bankData.accountType}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Bank Name</p>
                  <p className="mt-1 text-sm text-gray-900">{bankData.bankName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">IFSC Code</p>
                  <p className="mt-1 text-sm text-gray-900">{bankData.ifscCode}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Important Note</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  All payouts will be processed to the bank account details provided above. Please ensure the
                  information is accurate and up-to-date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankDetails
