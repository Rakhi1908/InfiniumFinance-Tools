"use client"

import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Clock,
  Calendar,
  ChevronRight,
  Edit2,
  Download,
  Copy,
  LogOut,
  Bell,
  Shield,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Lock,
  Briefcase,
  PieChart,
  BarChart2,
  TrendingUp,
  Settings,
  X,
  Filter,
} from "lucide-react"
import InvestmentFormModal from "../components/investment-form-modal"
// Use window.location for navigation instead of Next.js router

export default function Profile() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview")
  const [showPassword, setShowPassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [hasInvestments, setHasInvestments] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState("English")
  const [currencyFormat, setCurrencyFormat] = useState("₹ (INR)")

  // User data state that will be updated with investments
  const [userData, setUserData] = useState({
    name: "Preview User",
    email: "rakhi@gmail.com",
    phone: "+91 1234567890",
    pan: "ABCDE1234F",
    totalInvestment: 50000,
    currentValue: 58125,
    totalProfit: 8125,
    profitPercentage: 16.25,
    activePlans: 2,
    plans: [
      {
        id: 1,
        name: "Quarterly Compounding",
        amount: 30000,
        currentValue: 34875,
        startDate: "01 Jan 2023",
        nextPayout: "30 Jun 2023",
        status: "Active",
        type: "teal",
      },
      {
        id: 2,
        name: "Tree Family Plan",
        amount: 20000,
        currentValue: 23250,
        startDate: "15 Feb 2023",
        nextPayout: "15 Aug 2023",
        status: "Active",
        type: "amber",
      },
    ],
    nextPayout: {
      amount: 3000,
      date: "30 Jun 2023",
      status: "Scheduled",
    },
    bankDetails: {
      accountNumber: "XXXX XXXX 1234",
      accountType: "Savings",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
    },
    kycStatus: "Verified",
    nomineeDetails: {
      name: "Rahul Kumar",
      relation: "Brother",
      phone: "+91 9876543211",
    },
    documents: [
      { name: "PAN Card", status: "Verified", date: "15 Jan 2023" },
      { name: "Aadhar Card", status: "Verified", date: "15 Jan 2023" },
      { name: "Bank Statement", status: "Verified", date: "16 Jan 2023" },
    ],
    transactions: [
      { id: "TXN123456", type: "Investment", amount: 30000, date: "01 Jan 2023", status: "Completed" },
      { id: "TXN123457", type: "Investment", amount: 20000, date: "15 Feb 2023", status: "Completed" },
      { id: "TXN123458", type: "Payout", amount: 1500, date: "30 Mar 2023", status: "Completed" },
    ],
  })

  // Form states
  const [formData, setFormData] = useState({
    fullName: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Bank details form state
  const [bankFormData, setBankFormData] = useState({
    accountNumber: userData.bankDetails.accountNumber,
    accountType: userData.bankDetails.accountType,
    ifscCode: userData.bankDetails.ifscCode,
    bankName: userData.bankDetails.bankName,
  })

  // Nominee details form state
  const [nomineeFormData, setNomineeFormData] = useState({
    name: userData.nomineeDetails.name,
    relation: userData.nomineeDetails.relation,
    phone: userData.nomineeDetails.phone,
  })

  // Check for existing investments on component mount
  useEffect(() => {
    // Check if user has made any investments (from localStorage)
    const checkInvestments = () => {
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
        const formattedPlans = savedInvestments.map((inv) => ({
          id: inv.id,
          name: inv.plan.name,
          amount: inv.amount,
          currentValue: Math.round(inv.amount * 1.1625),
          startDate: new Date(inv.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          nextPayout: "30 Jun 2023",
          status: "Active",
          type: inv.plan.color,
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

        // Update user data with new investment information
        setUserData((prevData) => ({
          ...prevData,
          totalInvestment,
          currentValue,
          totalProfit,
          profitPercentage,
          activePlans: savedInvestments.length,
          plans: formattedPlans,
          nextPayout: {
            amount: Math.round(totalInvestment * 0.06), // 6% payout for demo
            date: "30 Jun 2023",
            status: "Scheduled",
          },
          transactions,
        }))
      } else {
        // Reset all investment data to zero when no investments exist
        setUserData((prevData) => ({
          ...prevData,
          totalInvestment: 0,
          currentValue: 0,
          totalProfit: 0,
          profitPercentage: 0,
          activePlans: 0,
          plans: [],
          nextPayout: {
            amount: 0,
            date: "N/A",
            status: "No scheduled payouts",
          },
          transactions: [],
        }))
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

    // Calculate new totals
    const totalInvestment = updatedInvestments.reduce((sum, inv) => sum + inv.amount, 0)
    const currentValue = Math.round(totalInvestment * 1.1625)
    const totalProfit = currentValue - totalInvestment
    const profitPercentage = ((totalProfit / totalInvestment) * 100).toFixed(2)

    // Format the new investment for display
    const newPlan = {
      id: newInvestment.id,
      name: newInvestment.plan.name,
      amount: newInvestment.amount,
      currentValue: Math.round(newInvestment.amount * 1.1625),
      startDate: new Date(newInvestment.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      nextPayout: "30 Jun 2023",
      status: "Active",
      type: newInvestment.plan.color,
    }

    // Create a new transaction for this investment
    const newTransaction = {
      id: `TXN${Math.floor(Math.random() * 1000000)}`,
      type: "Investment",
      amount: newInvestment.amount,
      date: new Date(newInvestment.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Completed",
    }

    // Update user data with new investment information
    setUserData((prevData) => ({
      ...prevData,
      totalInvestment,
      currentValue,
      totalProfit,
      profitPercentage,
      activePlans: updatedInvestments.length,
      plans: [...prevData.plans, newPlan],
      nextPayout: {
        amount: Math.round(totalInvestment * 0.06), // 6% payout for demo
        date: "30 Jun 2023",
        status: "Scheduled",
      },
      transactions: [...prevData.transactions, newTransaction],
    }))

    // Trigger storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle bank form input changes
  const handleBankInputChange = (e) => {
    const { name, value } = e.target
    setBankFormData({
      ...bankFormData,
      [name]: value,
    })
  }

  // Handle nominee form input changes
  const handleNomineeInputChange = (e) => {
    const { name, value } = e.target
    setNomineeFormData({
      ...nomineeFormData,
      [name]: value,
    })
  }

  // Open modal
  const openModal = (type) => {
    setModalType(type)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isModalOpen && e.target.classList.contains("modal-overlay")) {
        closeModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Update user data based on modal type
    if (modalType === "personal") {
      setUserData((prevData) => ({
        ...prevData,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      }))
    } else if (modalType === "bank") {
      setUserData((prevData) => ({
        ...prevData,
        bankDetails: {
          accountNumber: bankFormData.accountNumber,
          accountType: bankFormData.accountType,
          ifscCode: bankFormData.ifscCode,
          bankName: bankFormData.bankName,
        },
      }))
    } else if (modalType === "nominee") {
      setUserData((prevData) => ({
        ...prevData,
        nomineeDetails: {
          name: nomineeFormData.name,
          relation: nomineeFormData.relation,
          phone: nomineeFormData.phone,
        },
      }))
    } else if (modalType === "password") {
      // In a real app, you would validate and update the password
      // For demo purposes, we'll just show a success message
      alert("Password updated successfully!")
    }

    // Simulate API call
    setTimeout(() => {
      closeModal()
      // Show success notification (in a real app)
    }, 1000)
  }

  // Handle logout
  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("investments")
    localStorage.removeItem("investmentsMade")
    localStorage.setItem("isLoggedIn", "false") // Set login status to false

    // In a real app, you would clear authentication tokens

    // Redirect to login page
    alert("Logged out successfully!")

    // Dispatch storage event to notify other components (like header)
    window.dispatchEvent(new Event("storage"))

    // Navigate to login page
    window.location.href = "/login" // In a real app, redirect to login page
  }

  // Update the downloadReportPDF function to generate HTML instead of text
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
      
      <div class="info-section">
        <h3>Summary</h3>
        <p>User: ${userData.name}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Total Investment: ₹${userData.totalInvestment.toLocaleString()}</p>
        <p>Current Value: ₹${userData.currentValue.toLocaleString()}</p>
        <p>Total Profit: ₹${userData.totalProfit.toLocaleString()} (${userData.profitPercentage}%)</p>
      </div>
      
      <h3>Investment Plans</h3>
      <table>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Current Value</th>
            <th>Start Date</th>
            <th>Next Payout</th>
          </tr>
        </thead>
        <tbody>
          ${userData.plans
            .map(
              (plan) => `
          <tr>
            <td>${plan.name}</td>
            <td>₹${plan.amount.toLocaleString()}</td>
            <td>₹${plan.currentValue.toLocaleString()}</td>
            <td>${plan.startDate}</td>
            <td>${plan.nextPayout}</td>
          </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
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

  // Update the downloadDocument function to generate HTML instead of text
  const downloadDocument = (doc) => {
    // Create HTML content for the document
    const documentContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${doc.name} Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #333;
    }
    .document {
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
    .verification-badge {
      display: inline-block;
      background-color: #10b981;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="document">
    <div class="header">
      <div class="subtitle">INFINIUM FINANCE</div>
      <div class="title">${doc.name}</div>
      <div class="subtitle">Document ID: DOC-${Date.now()}</div>
    </div>
    
    <div class="content">
      <div class="info-section">
        <h3>Document Information</h3>
        <p><strong>User:</strong> ${userData.name}</p>
        <p><strong>Document Type:</strong> ${doc.name}</p>
        <p><strong>Verification Status:</strong> <span class="verification-badge">${doc.status}</span></p>
        <p><strong>Uploaded on:</strong> ${doc.date}</p>
      </div>
      
      <p>This document has been verified and is stored securely in our system. It can be used as proof of identity for all financial transactions with Infinium Finance.</p>
      
      <div style="margin: 30px 0; padding: 20px; border: 1px dashed #ccc; text-align: center;">
        <p>Document content would appear here in the actual document.</p>
      </div>
    </div>
    
    <div class="footer">
      <p>This document is electronically generated and does not require a physical signature.</p>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <p>For any discrepancies, please contact our customer support.</p>
    </div>
  </div>
</body>
</html>
  `

    // Create a Blob with the HTML content
    const blob = new Blob([documentContent], { type: "text/html" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = url
    link.download = `${doc.name.replace(/\s+/g, "_")}_${Date.now()}.html`

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Release the URL object
    URL.revokeObjectURL(url)
  }

  // Update the downloadBankStatement function to generate HTML instead of text
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
          <div class="value">${userData.bankDetails.accountNumber}</div>
        </div>
        <div class="info-item">
          <div class="label">Bank Name:</div>
          <div class="value">${userData.bankDetails.bankName}</div>
        </div>
      </div>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Account Type:</div>
          <div class="value">${userData.bankDetails.accountType}</div>
        </div>
        <div class="info-item">
          <div class="label">IFSC Code:</div>
          <div class="value">${userData.bankDetails.ifscCode}</div>
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

  // Update the downloadAnnualStatement function to generate HTML instead of text
  const downloadAnnualStatement = (year) => {
    // Create HTML content for the annual statement
    const statementContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Annual Investment Statement ${year}</title>
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
  <div class="statement">
    <div class="header">
      <div class="subtitle">INFINIUM FINANCE</div>
      <div class="title">ANNUAL INVESTMENT STATEMENT ${year}</div>
      <div class="subtitle">Statement ID: AIS-${year}-${Date.now()}</div>
    </div>
    
    <div class="content">
      <p>This document contains your annual investment statement for the year ${year}.</p>
      
      <div class="info-section">
        <h3>Summary</h3>
        <p><strong>User:</strong> ${userData.name}</p>
        <p><strong>Period:</strong> 01 Jan ${year} - 31 Dec ${year}</p>
        <p><strong>Total Investment:</strong> ₹${userData.totalInvestment.toLocaleString()}</p>
        <p><strong>Current Value:</strong> ₹${userData.currentValue.toLocaleString()}</p>
        <p><strong>Total Profit:</strong> ₹${userData.totalProfit.toLocaleString()} (${userData.profitPercentage}%)</p>
        <p><strong>Active Plans:</strong> ${userData.activePlans}</p>
      </div>
      
      <h3>Investment Plans</h3>
      <table>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Current Value</th>
            <th>Start Date</th>
            <th>Next Payout</th>
          </tr>
        </thead>
        <tbody>
          ${userData.plans
            .map(
              (plan) => `
          <tr>
            <td>${plan.name}</td>
            <td>₹${plan.amount.toLocaleString()}</td>
            <td>₹${plan.currentValue.toLocaleString()}</td>
            <td>${plan.startDate}</td>
            <td>${plan.nextPayout}</td>
          </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      
      <h3>Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${userData.transactions
            .map(
              (tx) => `
          <tr>
            <td>${tx.id}</td>
            <td>${tx.type}</td>
            <td>₹${tx.amount.toLocaleString()}</td>
            <td>${tx.date}</td>
            <td>${tx.status}</td>
          </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <p>This statement is electronically generated and does not require a physical signature.</p>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
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
    link.download = `Annual_Statement_${year}.html`

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Release the URL object
    URL.revokeObjectURL(url)
  }

  const downloadCertificate = (plan) => {
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
      <div class="subtitle">Certificate ID: INF-${plan.id}-${Date.now()}</div>
    </div>
    
    <div class="content">
      <p>This is to certify that the investment detailed below has been registered with Infinium Finance.</p>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Investment Plan:</div>
          <div class="value">${plan.name}</div>
        </div>
        <div class="info-item">
          <div class="label">Investment Amount:</div>
          <div class="value">₹${plan.amount.toLocaleString()}</div>
        </div>
      </div>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Start Date:</div>
          <div class="value">${plan.startDate}</div>
        </div>
        <div class="info-item">
          <div class="label">Expected Returns:</div>
          <div class="value">16.25% per annum</div>
        </div>
      </div>
      
      <div class="info">
        <div class="info-item">
          <div class="label">Current Value:</div>
          <div class="value">₹${plan.currentValue.toLocaleString()}</div>
        </div>
        <div class="info-item">
          <div class="label">Next Payout:</div>
          <div class="value">${plan.nextPayout}</div>
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
    link.download = `${plan.name.replace(/\s+/g, "_")}_Certificate_${Date.now()}.html`

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Release the URL object
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Account</h2>
              </div>
              <nav className="p-2">
                {[
                  { id: "overview", label: "Dashboard", icon: PieChart },
                  { id: "investments", label: "My Investments", icon: TrendingUp },
                  { id: "reports", label: "Reports", icon: BarChart2 },
                  { id: "profile", label: "Profile", icon: User },
                  { id: "bank", label: "Bank Details", icon: CreditCard },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-teal-700" : ""}`} />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Support Section */}
              <div className="p-4 mt-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-100 rounded-full p-2">
                    <HelpCircle className="h-5 w-5 text-teal-700" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Need help?</h3>
                    <p className="text-xs text-gray-500">Contact our support team</p>
                  </div>
                </div>
                <button className="mt-3 w-full flex justify-center items-center px-4 py-2 border border-teal-700 rounded-md shadow-sm text-sm font-medium text-teal-700 bg-white hover:bg-teal-50">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Dashboard Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {userData.name}</h1>
                    <p className="text-gray-600">Manage your investments and track your financial growth</p>
                  </div>
                  <button
                    className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                    onClick={() => setIsInvestmentModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Investment
                  </button>
                </div>

                {/* Investment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total Investment Card */}
                  <div className="bg-teal-800 text-white rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-teal-100">Total Investment</p>
                        <p className="mt-1 text-2xl font-bold">₹{userData.totalInvestment.toLocaleString()}</p>
                      </div>
                      <button
                        className="text-teal-100 hover:text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(`₹${userData.totalInvestment.toLocaleString()}`)
                          alert("Amount copied to clipboard!")
                        }}
                      >
                        <Copy className="h-5 w-5" />
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
                        <Clock className="h-5 w-5 text-teal-700" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {userData.plans.length > 0 ? (
                        userData.plans.map((plan) => (
                          <div key={plan.id} className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">{plan.name}</p>
                            <p className="text-sm font-medium text-gray-900">₹{plan.amount.toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-500">No active plans</p>
                          <p className="text-sm font-medium text-gray-400">₹0</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Payout Card */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Next Payout</p>
                        <p className="mt-1 text-2xl font-bold text-amber-500">
                          ₹{userData.nextPayout.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-amber-100 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-amber-500" />
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

                {/* Investment Portfolio */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Investment Portfolio</h2>
                    <p className="text-sm text-gray-500">Overview of your active investment plans</p>
                  </div>

                  {/* Investment Cards */}
                  <div className="divide-y divide-gray-200">
                    {userData.plans.length > 0 ? (
                      userData.plans.map((plan) => (
                        <div key={plan.id} className="p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                              <div
                                className={`h-10 w-10 rounded-full bg-${plan.type}-100 flex items-center justify-center mr-4`}
                              >
                                <Briefcase className={`h-5 w-5 text-${plan.type}-700`} />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                                <div className="flex items-center mt-1">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${plan.type}-100 text-${plan.type}-800`}
                                  >
                                    {plan.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="text-teal-700 hover:text-teal-800 text-sm font-medium flex items-center">
                              View Details <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Investment Amount</p>
                              <p className="font-medium">₹{plan.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Current Value</p>
                              <p className="font-medium">₹{plan.currentValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Start Date</p>
                              <p className="font-medium">{plan.startDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Next Payout</p>
                              <p className="font-medium">{plan.nextPayout}</p>
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

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between"
                    onClick={() => setActiveTab("reports")}
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
                  </button>

                  <button
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between"
                    onClick={() => setActiveTab("bank")}
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
                  </button>

                  <button className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-teal-200 hover:shadow-md transition-all flex items-center justify-between">
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
                  </button>
                </div>
              </div>
            )}

            {/* Investments Tab */}
            {activeTab === "investments" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Investments</h1>
                    <p className="text-gray-600">Manage and track all your investment plans</p>
                  </div>
                  <button
                    className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                    onClick={() => setIsInvestmentModalOpen(true)}
                  >
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
                      <button
                        className="text-teal-100 hover:text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(`₹${userData.totalInvestment.toLocaleString()}`)
                          alert("Amount copied to clipboard!")
                        }}
                      >
                        <Copy className="h-5 w-5" />
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
                        <Clock className="h-5 w-5 text-teal-700" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {userData.plans.length > 0 ? (
                        userData.plans.map((plan) => (
                          <div key={plan.id} className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">{plan.name}</p>
                            <p className="text-sm font-medium text-gray-900">₹{plan.amount.toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-500">No active plans</p>
                          <p className="text-sm font-medium text-gray-400">₹0</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Payout Card */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Next Payout</p>
                        <p className="mt-1 text-2xl font-bold text-amber-500">
                          ₹{userData.nextPayout.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-amber-100 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-amber-500" />
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

                {/* Investment Portfolio */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Investment Portfolio</h2>
                      <p className="text-sm text-gray-500">Overview of your active investment plans</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        Sort
                      </button>
                    </div>
                  </div>

                  {/* Investment Cards */}
                  <div className="divide-y divide-gray-200">
                    {userData.plans.length > 0 ? (
                      userData.plans.map((plan) => (
                        <div key={plan.id} className="p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                              <div
                                className={`h-10 w-10 rounded-full bg-${plan.type}-100 flex items-center justify-center mr-4`}
                              >
                                <Briefcase className={`h-5 w-5 text-${plan.type}-700`} />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                                <div className="flex items-center mt-1">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${plan.type}-100 text-${plan.type}-800`}
                                  >
                                    {plan.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="text-teal-700 hover:text-teal-800 text-sm font-medium flex items-center">
                              View Details <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Investment Amount</p>
                              <p className="font-medium">₹{plan.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Current Value</p>
                              <p className="font-medium">₹{plan.currentValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Start Date</p>
                              <p className="font-medium">{plan.startDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Next Payout</p>
                              <p className="font-medium">{plan.nextPayout}</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                            <button
                              onClick={() => downloadCertificate(plan)}
                              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Certificate
                            </button>
                            <button
                              className="inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
                              onClick={() => downloadReportPDF(`${plan.name} Statement`)}
                            >
                              View Statement
                            </button>
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
                    <p className="text-sm text-gray-500">Recent investment transactions</p>
                  </div>
                  {userData.transactions.length > 0 ? (
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
                          {userData.transactions.map((transaction) => (
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 
2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions yet</h3>
                      <p className="text-gray-500">
                        Your transaction history will appear here once you make an investment
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="space-y-6">
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Growth Analysis</h2>
                      <p className="text-sm text-gray-500">Performance of your investments over time</p>
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
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Growth chart would be displayed here</p>
                    </div>
                  </div>
                </div>

                {/* Quarterly Returns */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Quarterly Returns</h2>
                      <p className="text-sm text-gray-500">Your investment returns by quarter</p>
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
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Returns chart would be displayed here</p>
                    </div>
                  </div>
                </div>

                {/* Annual Statement */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Annual Statements</h2>
                    <p className="text-sm text-gray-500">Download your annual investment statements</p>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-teal-100 rounded-lg p-3 mr-4">
                            <FileText className="h-6 w-6 text-teal-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Annual Statement 2023</h3>
                            <p className="text-sm text-gray-500">01 Jan 2023 - 31 Dec 2023</p>
                          </div>
                        </div>
                        <button
                          className="inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
                          onClick={() => downloadAnnualStatement("2023")}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-teal-100 rounded-lg p-3 mr-4">
                            <FileText className="h-6 w-6 text-teal-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Annual Statement 2022</h3>
                            <p className="text-sm text-gray-500">01 Jan 2022 - 31 Dec 2022</p>
                          </div>
                        </div>
                        <button
                          className="inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
                          onClick={() => downloadAnnualStatement("2022")}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
                    <p className="text-gray-600">Manage your personal and bank details</p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
                    </div>
                    <button
                      onClick={() => openModal("personal")}
                      className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="mt-1 font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="mt-1 font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="mt-1 font-medium">{userData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">PAN</p>
                        <p className="mt-1 font-medium">{userData.pan}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">Bank Details</h2>
                    </div>
                    <button
                      onClick={() => openModal("bank")}
                      className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Type</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.accountType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">IFSC Code</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bank Name</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.bankName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KYC & Documents */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">KYC & Documents</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">KYC Status</p>
                          <p className="text-sm text-green-600">{userData.kycStatus}</p>
                        </div>
                      </div>
                      <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        View Details
                      </button>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-3">Uploaded Documents</h3>
                    <div className="space-y-3">
                      {userData.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500">Uploaded on {doc.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-3">
                              {doc.status}
                            </span>
                            <button className="text-gray-400 hover:text-gray-500" onClick={() => downloadDocument(doc)}>
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nominee Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">Nominee Details</h2>
                    </div>
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      onClick={() => openModal("nominee")}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="mt-1 font-medium">{userData.nomineeDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Relation</p>
                        <p className="mt-1 font-medium">{userData.nomineeDetails.relation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="mt-1 font-medium">{userData.nomineeDetails.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details Tab */}
            {activeTab === "bank" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bank Details</h1>
                    <p className="text-gray-600">Manage your bank account information</p>
                  </div>
                  <button
                    onClick={() => openModal("bank")}
                    className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Bank Details
                  </button>
                </div>

                {/* Bank Details Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">Primary Bank Account</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Type</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.accountType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">IFSC Code</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bank Name</p>
                        <p className="mt-1 font-medium">{userData.bankDetails.bankName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Verification Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Verification Status</h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bank Account Verified</p>
                        <p className="text-sm text-gray-500">Your bank account has been successfully verified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Statement */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Bank Statement</h2>
                    <p className="text-sm text-gray-500">Download your bank statement for verification</p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-teal-100 rounded-lg p-3 mr-4">
                          <FileText className="h-6 w-6 text-teal-700" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Bank Statement</h3>
                          <p className="text-sm text-gray-500">Last 6 months</p>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center justify-center rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-100"
                        onClick={downloadBankStatement}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800">Important Note</h3>
                      <p className="mt-1 text-sm text-amber-700">
                        All payouts will be processed to the bank account mentioned above. Please ensure that the
                        details are correct and up-to-date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-600">Manage your account preferences and security</p>
                  </div>
                </div>

                {/* Password & Security */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-400 mr-2" />
                      <h2 className="text-lg font-semibold text-gray-900">Password & Security</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <button
                      onClick={() => openModal("password")}
                      className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                    >
                      Change Password
                    </button>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-teal-100 rounded-lg p-3 mr-4">
                            <Shield className="h-6 w-6 text-teal-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            className="sr-only"
                            checked={twoFactorEnabled}
                            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          />
                          <div
                            className={`block w-10 h-6 rounded-full ${twoFactorEnabled ? "bg-teal-600" : "bg-gray-300"}`}
                          ></div>
                          <div
                            className={`dot absolute top-1 w-4 h-4 bg-white rounded-full transition ${twoFactorEnabled ? "left-5" : "left-1"}`}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-teal-100 rounded-lg p-3 mr-4">
                            <Bell className="h-6 w-6 text-teal-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive updates about your investments</p>
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="toggle2"
                            id="toggle2"
                            className="sr-only"
                            checked={emailNotificationsEnabled}
                            onChange={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
                          />
                          <div
                            className={`block w-10 h-6 rounded-full ${emailNotificationsEnabled ? "bg-teal-600" : "bg-gray-300"}`}
                          ></div>
                          <div
                            className={`dot absolute top-1 w-4 h-4 bg-white rounded-full transition ${emailNotificationsEnabled ? "left-5" : "left-1"}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Language</h3>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                        <select
                          className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Gujarati</option>
                          <option>Marathi</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Currency Format</h3>
                          <p className="text-sm text-gray-500">Select your preferred currency format</p>
                        </div>
                        <select
                          className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                          value={currencyFormat}
                          onChange={(e) => setCurrencyFormat(e.target.value)}
                        >
                          <option>₹ (INR)</option>
                          <option>$ (USD)</option>
                          <option>€ (EUR)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      <button
                        className="w-full flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center">
                          <div className="bg-red-100 rounded-lg p-3 mr-4">
                            <LogOut className="h-6 w-6 text-red-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Logout from all devices</h3>
                            <p className="text-sm text-gray-500">Secure your account by logging out from all devices</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-6 pb-0">
              <h2 className="text-xl font-semibold text-center mb-1">
                {modalType === "personal" && "Edit Personal Details"}
                {modalType === "bank" && "Edit Bank Details"}
                {modalType === "password" && "Change Password"}
                {modalType === "nominee" && "Edit Nominee Details"}
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                {modalType === "personal" && "Update your personal information"}
                {modalType === "bank" && "Update your bank account details"}
                {modalType === "password" && "Create a new password for your account"}
                {modalType === "nominee" && "Update your nominee information"}
              </p>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              {modalType === "personal" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === "bank" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={bankFormData.accountNumber}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      id="accountType"
                      name="accountType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={bankFormData.accountType}
                      onChange={handleBankInputChange}
                    >
                      <option>Savings</option>
                      <option>Current</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={bankFormData.ifscCode}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={bankFormData.bankName}
                      onChange={handleBankInputChange}
                    />
                  </div>
                </>
              )}

              {modalType === "nominee" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="nomineeName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      id="nomineeName"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={nomineeFormData.name}
                      onChange={handleNomineeInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                      Relation
                    </label>
                    <input
                      type="text"
                      id="relation"
                      name="relation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={nomineeFormData.relation}
                      onChange={handleNomineeInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nomineePhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="nomineePhone"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={nomineeFormData.phone}
                      onChange={handleNomineeInputChange}
                    />
                  </div>
                </>
              )}

              {modalType === "password" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-400" />
                        ) : (
                          <Eye size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-400" />
                        ) : (
                          <Eye size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-400" />
                        ) : (
                          <Eye size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-md transition-colors mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Investment Form Modal */}
      <InvestmentFormModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        onSubmit={handleInvestmentSubmit}
      />

      {/* Customer Support Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 bg-teal-100 rounded-full p-3 mb-4 md:mb-0 md:mr-6">
              <HelpCircle className="h-8 w-8 text-teal-700" />
            </div>
            <div className="text-center md:text-left md:flex-1">
              <h3 className="text-lg font-semibold text-gray-900">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is available round the clock to assist you with any queries or concerns.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800">
                <Phone className="mr-2 h-4 w-4" />
                Call Support
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
