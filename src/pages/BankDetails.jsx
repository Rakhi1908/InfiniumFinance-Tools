"use client"

import { useState } from "react"
import { Edit2, AlertCircle, Download } from "lucide-react"

const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false)

  // Mock bank data
  const [bankData, setBankData] = useState({
    accountNumber: "XXXX XXXX 1234",
    accountType: "Savings",
    bankName: "State Bank of India",
    ifscCode: "SBIN0001234",
  })

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
    // Update the bank data with form data
    setBankData({ ...formData })
    // Close the edit form
    setIsEditing(false)
    // Show success message
    alert("Bank details updated successfully!")
  }

  // Download bank statement
  const downloadBankStatement = () => {
    // Create HTML content for the bank statement
    const statementContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Bank Statement</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #333;
    }
    .statement {
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
      font-size: 16px;
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
  <div class="statement">
    <div class="header">
      <div class="subtitle">INFINIUM FINANCE</div>
      <div class="title">BANK STATEMENT</div>
      <div class="subtitle">Statement ID: BS-${Date.now()}</div>
    </div>
    
    <div class="content">
      <p>This document contains your bank statement details as registered with Infinium Finance.</p>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Account Number:</div>
          <div class="value">${bankData.accountNumber}</div>
        </div>
        <div class="info-item">
          <div class="label">Bank Name:</div>
          <div class="value">${bankData.bankName}</div>
        </div>
      </div>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Account Type:</div>
          <div class="value">${bankData.accountType}</div>
        </div>
        <div class="info-item">
          <div class="label">IFSC Code:</div>
          <div class="value">${bankData.ifscCode}</div>
        </div>
      </div>
      
      <h3>Transaction History (Last 6 months)</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15 May 2023</td>
            <td>Investment Deposit</td>
            <td>₹25,000.00</td>
            <td>₹75,000.00</td>
          </tr>
          <tr>
            <td>30 Apr 2023</td>
            <td>Quarterly Payout</td>
            <td>₹3,750.00</td>
            <td>₹50,000.00</td>
          </tr>
          <tr>
            <td>15 Feb 2023</td>
            <td>Investment Deposit</td>
            <td>₹20,000.00</td>
            <td>₹46,250.00</td>
          </tr>
          <tr>
            <td>01 Jan 2023</td>
            <td>Investment Deposit</td>
            <td>₹30,000.00</td>
            <td>₹26,250.00</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <p>This statement is electronically generated and does not require a physical signature.</p>
      <p>Issued on: ${new Date().toLocaleDateString()}</p>
      <p>For any discrepancies, please contact our customer support.</p>
    </div>
  </div>
</body>
</html>
  `

    // Create a Blob with the HTML content
    const blob = new Blob([statementContent], { type: "text/html" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = url
    link.download = `Bank_Statement_${Date.now()}.html`

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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    >
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

        {/* Bank Statement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Bank Statement</h2>
            <p className="text-sm text-gray-500">Download your bank statement for verification</p>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="bg-teal-100 rounded-lg p-3 mr-4">
                  <Download className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Bank Statement</h3>
                  <p className="text-sm text-gray-500">Last 6 months</p>
                </div>
              </div>
              <button
                onClick={downloadBankStatement}
                className="inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
            </div>
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
