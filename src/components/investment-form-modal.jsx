"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

const InvestmentFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    plan: "",
    amount: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available investment plans
  const investmentPlans = [
    {
      id: "quarterly",
      name: "Quarterly Compounding Plan",
      description: "Earn returns compounded quarterly at 16.25% per annum",
      minAmount: 10000,
      color: "teal",
    },
    {
      id: "tree",
      name: "Tree Family Plan",
      description: "Invest in sustainable tree farming with 16.25% annual returns",
      minAmount: 5000,
      color: "amber",
    },
    {
      id: "fixed",
      name: "Fixed Income Plan",
      description: "Stable returns at 12% per annum with monthly payouts",
      minAmount: 25000,
      color: "blue",
    },
  ]

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.plan) {
      newErrors.plan = "Please select an investment plan"
    }

    if (!formData.amount) {
      newErrors.amount = "Please enter an investment amount"
    } else if (isNaN(formData.amount) || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else {
      const selectedPlan = investmentPlans.find((plan) => plan.id === formData.plan)
      if (selectedPlan && Number.parseFloat(formData.amount) < selectedPlan.minAmount) {
        newErrors.amount = `Minimum investment for this plan is ₹${selectedPlan.minAmount.toLocaleString()}`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Format the data for submission
      const submissionData = {
        plan: investmentPlans.find((plan) => plan.id === formData.plan),
        amount: Number.parseFloat(formData.amount),
        date: new Date().toISOString(),
      }

      // Call the onSubmit callback with the form data
      onSubmit(submissionData)

      // Reset form
      setFormData({ plan: "", amount: "" })
      onClose()
    } catch (error) {
      console.error("Error submitting investment:", error)
      setErrors({ submit: "Failed to process your investment. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">New Investment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Plan Selection */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Investment Plan</label>
            <div className="space-y-3">
              {investmentPlans.map((plan) => (
                <label
                  key={plan.id}
                  className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.plan === plan.id
                      ? `border-${plan.color}-500 bg-${plan.color}-50`
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={formData.plan === plan.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                      formData.plan === plan.id ? `bg-${plan.color}-500 border-${plan.color}-500` : "border-gray-300"
                    } flex items-center justify-center mr-3 mt-0.5`}
                  >
                    {formData.plan === plan.id && <Check size={12} className="text-white" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{plan.name}</div>
                    <div className="text-sm text-gray-500">{plan.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Minimum investment: ₹{plan.minAmount.toLocaleString()}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.plan && <p className="mt-1 text-sm text-red-600">{errors.plan}</p>}
          </div>

          {/* Amount Input */}
          <div className="mb-5">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className={`block w-full pl-8 pr-12 py-2 border ${
                  errors.amount ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">INR</span>
              </div>
            </div>
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{errors.submit}</div>}

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Invest Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvestmentFormModal
