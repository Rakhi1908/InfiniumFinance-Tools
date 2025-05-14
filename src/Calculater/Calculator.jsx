"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle, Upload } from "lucide-react"

const AnimatedChart = ({ className = "" }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300
      canvas.height = canvas.parentElement?.clientHeight || 200
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const investmentColor = "#3b82f6"
    const profitColor = "#34d399"
    const chartData = [
      { investment: 20, profit: 2 },
      { investment: 35, profit: 5 },
      { investment: 50, profit: 7 },
      { investment: 65, profit: 10 },
      { investment: 80, profit: 15 },
      { investment: 95, profit: 20 },
      { investment: 110, profit: 30 },
      { investment: 130, profit: 40 },
      { investment: 150, profit: 50 },
      { investment: 175, profit: 65 },
      { investment: 200, profit: 80 },
      { investment: 230, profit: 100 },
    ]

    let currentPoint = 0
    let animationProgress = 0

    const animate = () => {
      updateCanvasSize()
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const padding = 30

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      ctx.strokeStyle = "rgba(10, 61, 63, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        const y = padding + (canvasHeight - 2 * padding) * (i / 4)
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvasWidth - padding, y)
        ctx.stroke()
      }

      for (let i = 0; i < chartData.length; i++) {
        const x = padding + (canvasWidth - 2 * padding) * (i / (chartData.length - 1))
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, canvasHeight - padding)
        ctx.stroke()
      }

      ctx.strokeStyle = investmentColor
      ctx.lineWidth = 3
      ctx.beginPath()

      const pointsToDraw = Math.min(chartData.length, currentPoint + 1)

      for (let i = 0; i < pointsToDraw; i++) {
        const x = padding + (canvasWidth - 2 * padding) * (i / (chartData.length - 1))
        const y = canvasHeight - padding - (chartData[i].investment / 250) * (canvasHeight - 2 * padding)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        ctx.fillStyle = investmentColor
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.stroke()

      ctx.strokeStyle = profitColor
      ctx.lineWidth = 3
      ctx.beginPath()

      for (let i = 0; i < pointsToDraw; i++) {
        const x = padding + (canvasWidth - 2 * padding) * (i / (chartData.length - 1))
        const y = canvasHeight - padding - (chartData[i].profit / 100) * (canvasHeight - 2 * padding)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        ctx.fillStyle = profitColor
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.stroke()

      if (currentPoint < chartData.length) {
        const x = padding + (canvasWidth - 2 * padding) * (currentPoint / (chartData.length - 1))
        const investmentY =
          canvasHeight - padding - (chartData[currentPoint].investment / 250) * (canvasHeight - 2 * padding)
        const profitY = canvasHeight - padding - (chartData[currentPoint].profit / 100) * (canvasHeight - 2 * padding)

        ctx.fillStyle = investmentColor
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`$${chartData[currentPoint].investment}k`, x, investmentY - 15)

        ctx.fillStyle = profitColor
        ctx.fillText(`${chartData[currentPoint].profit}%`, x, profitY - 15)
      }

      animationProgress += 0.02
      if (animationProgress >= 1) {
        animationProgress = 0
        currentPoint = (currentPoint + 1) % chartData.length
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`${className} w-full h-[300px]`} />
}

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("calculate")
  const [investmentAmount, setInvestmentAmount] = useState(10000)
  const [sliderValue, setSliderValue] = useState(10000)
  const [activeDetailTab, setActiveDetailTab] = useState("summary")
  const [showSection, setShowSection] = useState("investment") // "investment" or "duration"
  const [investmentDuration, setInvestmentDuration] = useState(4) // 4 quarters = 1 year
  const [durationSliderValue, setDurationSliderValue] = useState(4)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [investmentStep, setInvestmentStep] = useState(1) // 1: Personal Details, 2: Investment Preferences, 3: Bank & KYC Details, 4: Success
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    dateOfBirth: "",
    panNumber: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",

    // Investment Preferences
    investmentPlan: "quarterly",
    investmentAmount: 10000,
    investmentTenure: "1 Year (4 Quarters)",
    nomineeName: "",
    relationship: "",

    // Bank & KYC Details
    bankAccountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountType: "savings",
    idProof: null,
    addressProof: null,
  })

  // Calculate returns based on 6% quarterly compounding
  const calculateReturns = (amount, quarters = 4) => {
    const quarterlyRate = 0.06
    let currentAmount = amount
    const quarterlyResults = []

    for (let i = 1; i <= quarters; i++) {
      const quarterlyInterest = currentAmount * quarterlyRate
      currentAmount += quarterlyInterest
      quarterlyResults.push({
        quarter: i,
        interest: Math.round(quarterlyInterest),
        balance: Math.round(currentAmount),
      })
    }

    const finalAmount = currentAmount
    const profit = finalAmount - amount
    const returnPercentage = (profit / amount) * 100

    // Tree family distribution
    const mukhyaShare = profit * 0.7
    const familyShare = profit * 0.3
    const perMember = profit * 0.06

    return {
      initialAmount: amount,
      finalAmount: Math.round(finalAmount),
      profit: Math.round(profit),
      returnPercentage: returnPercentage.toFixed(2),
      quarterlyResults,
      mukhyaShare: Math.round(mukhyaShare),
      familyShare: Math.round(familyShare),
      perMember: Math.round(perMember),
    }
  }

  const results = calculateReturns(investmentAmount, investmentDuration)

  const handleAmountSliderChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setInvestmentAmount(value)
    setSliderValue(value)
  }

  const handleDurationSliderChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setInvestmentDuration(value)
    setDurationSliderValue(value)
  }

  const handleAmountButtonClick = (amount) => {
    setInvestmentAmount(amount)
    setSliderValue(amount)
  }

  const handleDurationButtonClick = (quarters) => {
    setInvestmentDuration(quarters)
    setDurationSliderValue(quarters)
  }

  const getDurationText = (quarters) => {
    if (quarters === 1) return "1 Quarter"
    if (quarters === 4) return "4 Quarters (1 Year)"
    if (quarters === 8) return "8 Quarters (2 Years)"
    if (quarters === 12) return "12 Quarters (3 Years)"
    if (quarters === 20) return "20 Quarters (5 Years)"
    return `${quarters} Quarters`
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setInvestmentStep(1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        [fieldName]: file,
      })
    }
  }

  const handleNextStep = () => {
    setInvestmentStep(investmentStep + 1)
  }

  const handlePreviousStep = () => {
    setInvestmentStep(investmentStep - 1)
  }

  const handleSubmitInvestment = () => {
    setInvestmentStep(4)
  }

  const handleViewInvestments = () => {
    // Reset to calculator view
    setActiveTab("calculate")
    setIsAuthenticated(false)
    setInvestmentStep(1)
  }

  const handleReturnHome = () => {
    // Reset to calculator view
    setActiveTab("calculate")
    setIsAuthenticated(false)
    setInvestmentStep(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-[#004d40] mb-2">Investment Calculator</h1>
      <p className="text-center text-gray-600 mb-8">
        Calculate your potential returns with MSV Infotech's quarterly compounding investment model.
      </p>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-0 mb-8 bg-gray-50 rounded-lg overflow-hidden">
        <button
          className={`py-3 px-4 text-center ${activeTab === "calculate" ? "bg-white text-[#004d40] font-semibold" : "bg-gray-50 text-gray-600"
            }`}
          onClick={() => setActiveTab("calculate")}
        >
          Calculate Returns
        </button>
        <button
          className={`py-3 px-4 text-center ${activeTab === "start" ? "bg-white text-[#004d40] font-semibold" : "bg-gray-50 text-gray-600"
            }`}
          onClick={() => setActiveTab("start")}
        >
          Start Investing
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "calculate" ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Calculator */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-[#004d40] mb-1">Calculate Your Returns</h2>
            <p className="text-sm text-gray-600 mb-6">
              See how your investment grows with our 6% quarterly compounding model
            </p>

            <div className="grid grid-cols-2 gap-0 mb-8 bg-[#fafafa] rounded-lg overflow-hidden border border-gray-100">
              <button
                className={`py-3 px-4 text-center font-semibold w-full ${showSection === "investment" ? "bg-[#fafafa] text-black" : "bg-white text-gray-500"
                  }`}
                onClick={() => setShowSection("investment")}
              >
                Investment Amount
              </button>
              <button
                className={`py-3 px-4 text-center font-semibold w-full ${showSection === "duration" ? "bg-[#fafafa] text-black" : "bg-white text-gray-500"
                  }`}
                onClick={() => setShowSection("duration")}
              >
                Duration
              </button>
            </div>

            {showSection === "investment" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment Amount</label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number.parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentAmount === 10000 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleAmountButtonClick(10000)}
                  >
                    ₹10,000
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentAmount === 50000 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleAmountButtonClick(50000)}>
                    ₹50,000
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentAmount === 100000 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleAmountButtonClick(100000)}>
                    ₹1 Lakh
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentAmount === 1000000 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleAmountButtonClick(1000000)}>
                    ₹10 Lakhs
                  </button> 
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="1000"
                    value={sliderValue}
                    onChange={handleAmountSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#004d40]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹10,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>
              </div>
            )}

            {showSection === "duration" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Duration</label>
                <div className="text-center font-medium mb-2">{getDurationText(investmentDuration)}</div>

                <div className="relative mb-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={durationSliderValue}
                    onChange={handleDurationSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#004d40]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 Quarter</span>
                    <span>5 Years</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentDuration === 4 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleDurationButtonClick(4)}
                  >
                    1 Year
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentDuration === 8 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleDurationButtonClick(8)}
                  >
                    2 Years
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentDuration === 12 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleDurationButtonClick(12)}
                  >
                    3 Years
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${investmentDuration === 20 ? "bg-[#d4af37] text-white" : "border border-gray-300"
                      }`}
                    onClick={() => handleDurationButtonClick(20)}
                  >
                    5 Years
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-4 bg-[#004d40] mr-2"></div>
                <h3 className="text-lg font-medium text-[#004d40]">Your Investment Growth</h3>
              </div>

              <div className="flex space-x-4 mb-4 border-b border-gray-200">
                <button
                  className={`pb-2 text-sm font-medium hover:text-[#d4af37] transition-colors ${activeDetailTab === "summary"
                      ? "text-[#004d40] border-b-2 border-[#004d40] hover:border-[#d4af37]"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveDetailTab("summary")}
                >
                  Summary
                </button>
                <button
                  className={`pb-2 text-sm font-medium hover:text-[#d4af37] transition-colors ${activeDetailTab === "details"
                      ? "text-[#004d40] border-b-2 border-[#004d40] hover:border-[#d4af37]"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveDetailTab("details")}
                >
                  Details
                </button>
                <button
                  className={`pb-2 text-sm font-medium hover:text-[#d4af37] transition-colors ${activeDetailTab === "chart"
                      ? "text-[#004d40] border-b-2 border-[#004d40] hover:border-[#d4af37]"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveDetailTab("chart")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </button>
              </div>

              {activeDetailTab === "summary" && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Initial Investment</div>
                      <div className="text-lg font-bold text-[#004d40]">₹{results.initialAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Final Amount</div>
                      <div className="text-lg font-bold text-[#004d40]">₹{results.finalAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total Profit</div>
                      <div className="text-lg font-bold text-green-600">₹{results.profit.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Return Percentage</div>
                      <div className="text-lg font-bold text-green-600">{results.returnPercentage}%</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <h4 className="text-sm font-medium">Tree Family Distribution:</h4>
                      <div className="ml-1 text-gray-500 text-sm">ⓘ</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-xs text-gray-500">Mukhya Share (70%)</div>
                        <div className="text-sm font-semibold text-[#d4af37]">
                          ₹{results.mukhyaShare.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Family Share (30%)</div>
                        <div className="text-sm font-semibold text-[#d4af37]">
                          ₹{results.familyShare.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Per Member (5)</div>
                        <div className="text-sm font-semibold text-[#d4af37]">
                          ₹{results.perMember.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeDetailTab === "details" && (
                <div className="mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-600">Quarter</th>
                        <th className="text-right py-2 font-medium text-gray-600">Profit</th>
                        <th className="text-right py-2 font-medium text-gray-600">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.quarterlyResults.map((quarter) => (
                        <tr key={quarter.quarter} className="border-b border-gray-100">
                          <td className="py-2">Quarter {quarter.quarter}</td>
                          <td className="text-right py-2">₹{quarter.interest.toLocaleString()}</td>
                          <td className="text-right py-2">₹{quarter.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="font-medium">
                        <td className="py-2">Total</td>
                        <td className="text-right py-2 text-green-600">₹{results.profit.toLocaleString()}</td>
                        <td className="text-right py-2">₹{results.finalAmount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeDetailTab === "chart" && results.quarterlyResults?.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs text-gray-500 mb-2">Quarterly Profit Growth</div>
                  <div className="text-sm font-medium mb-4">
                    ₹{results.quarterlyResults[results.quarterlyResults.length - 1]?.interest || 0}
                  </div>

                  <div className="flex items-end h-40 gap-2 border-t border-gray-200 pt-2">
                    {results.quarterlyResults.map((quarter, index) => {
                      const maxInterest = Math.max(...results.quarterlyResults.map((q) => q.interest))
                      const height = results.profit > 0 ? (quarter.interest / maxInterest) * 100 : 10

                      return (
                        <div key={index} className="w-[22%] flex flex-col items-center">
                          <div
                            className="w-full rounded-t-md bg-[#004d40] hover:bg-[#d4af37] transition-all duration-300"
                            style={{ height: `${height}px` }}
                          ></div>
                          <div className="text-xs mt-1 text-gray-600">{quarter.quarter}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <button
                className="w-full bg-[#d4af37] text-white font-semibold py-3 px-4 rounded mt-6 flex items-center justify-center transform transition duration-300 hover:scale-105"
                onClick={() => setActiveTab("start")}
              >
                Start Investing Now
              </button>

              <p className="text-center text-xs text-gray-600 mt-2">
                Secure, transparent, and profitable investment solutions
              </p>
            </div>
          </div>

          {/* Right Column - How Returns Work */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-[#004d40] mb-6">How Our Returns Work</h2>

            <div className="mb-6">
              <p className="mb-4">MSV Infotech offers a powerful investment model based on quarterly compounding:</p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#004d40] text-white text-xs mr-2 mt-0.5">
                    •
                  </span>
                  <span>Each quarter, your investment earns a 6% return</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#004d40] text-white text-xs mr-2 mt-0.5">
                    •
                  </span>
                  <span>Returns are automatically compounded, increasing your base for the next quarter</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#004d40] text-white text-xs mr-2 mt-0.5">
                    •
                  </span>
                  <span>This creates an accelerating growth curve</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#004d40] text-white text-xs mr-2 mt-0.5">
                    •
                  </span>
                  <span>A full year (4 quarters) can yield up to 26.25% total return</span>
                </li>
              </ul>
            </div>

            {/* Animated Chart */}
            <div className="h-64  bg-gray-50 rounded-lg mb-6  relative overflow-hidden">
              <AnimatedChart className="absolute inset-0 -mt-4" />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#004d40] mb-4">Example: ₹10,000 Investment</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Initial Investment:</span>
                  <span className="font-semibold">₹10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">First Quarter (6%):</span>
                  <span className="font-semibold">+₹600 = ₹10,600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Second Quarter (6%):</span>
                  <span className="font-semibold">+₹636 = ₹11,236</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Third Quarter (6%):</span>
                  <span className="font-semibold">+₹674 = ₹11,910</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fourth Quarter (6%):</span>
                  <span className="font-semibold">+₹715 = ₹12,625</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="text-gray-600 font-medium">Total Profit:</span>
                  <span className="font-semibold text-green-600">₹2,625 (26.25%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Start Investing Tab Content
        <div>
          {!isAuthenticated ? (
            // Authentication Required Section
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg border border-gray-200 text-center">
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-8">
                You need to be logged in to start investing. Please login or register to continue.
              </p>
              <button className="bg-[#d4af37] text-white font-semibold py-3 px-6 rounded" onClick={handleLogin}>
                Login / Register to Continue
              </button>
            </div>
          ) : (
            // Investment Process
            <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200">
              {/* Header with title */}
              <div className="p-6 pb-0">
                <h2 className="text-2xl font-bold text-[#004d40] mb-2">Investment Calculator</h2>
                <p className="text-gray-600 mb-4">
                  Calculate your potential returns with MSV Infotech's quarterly compounding investment model.
                </p>
              </div>

              {/* Tabs for the multi-step form */}
              <div className="px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 mb-6 bg-gray-50 rounded-lg overflow-hidden">
                  <button
                    className={`py-3 px-4 text-center text-sm ${investmentStep === 1 ? "bg-[#f0f9f7] text-[#004d40] font-semibold" : "bg-gray-50 text-gray-500"}`}
                    disabled={investmentStep !== 1}
                  >
                    Personal Details
                  </button>
                  <button
                    className={`py-3 px-4 text-center text-sm ${investmentStep === 2 ? "bg-[#f0f9f7] text-[#004d40] font-semibold" : "bg-gray-50 text-gray-500"}`}
                    disabled={investmentStep !== 2}
                  >
                    Investment Preferences
                  </button>
                  <button
                    className={`py-3 px-4 text-center text-sm ${investmentStep === 3 ? "bg-[#f0f9f7] text-[#004d40] font-semibold" : "bg-gray-50 text-gray-500"}`}
                    disabled={investmentStep !== 3}
                  >
                    Bank & KYC Details
                  </button>
                </div>
              </div>

              {/* Form content based on current step */}
              {investmentStep === 1 && (
                <div className="p-6 pt-0">
                  <h3 className="text-xl font-bold mb-6">Personal Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (as per PAN)</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="ABCDE1234F"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-[#004d40] text-white px-4 py-2 rounded-md flex items-center"
                      onClick={handleNextStep}
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {investmentStep === 2 && (
                <div className="p-6 pt-0">
                  <h3 className="text-xl font-bold mb-6">Investment Preferences</h3>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Plan</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="quarterly"
                          name="investmentPlan"
                          value="quarterly"
                          checked={formData.investmentPlan === "quarterly"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="quarterly" className="text-sm">
                          Quarterly Compounding
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="tree"
                          name="investmentPlan"
                          value="tree"
                          checked={formData.investmentPlan === "tree"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="tree" className="text-sm">
                          Tree Family Plan
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="systematic"
                          name="investmentPlan"
                          value="systematic"
                          checked={formData.investmentPlan === "systematic"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="systematic" className="text-sm">
                          Systematic Investment
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount (₹)</label>
                    <input
                      type="number"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum investment: ₹10,000</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Tenure</label>
                    <select
                      name="investmentTenure"
                      value={formData.investmentTenure}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="1 Year (4 Quarters)">1 Year (4 Quarters)</option>
                      <option value="2 Years (8 Quarters)">2 Years (8 Quarters)</option>
                      <option value="3 Years (12 Quarters)">3 Years (12 Quarters)</option>
                      <option value="5 Years (20 Quarters)">5 Years (20 Quarters)</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship with Nominee</label>
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
                      onClick={handlePreviousStep}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Previous
                    </button>
                    <button
                      className="bg-[#004d40] text-white px-4 py-2 rounded-md flex items-center"
                      onClick={handleNextStep}
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {investmentStep === 3 && (
                <div className="p-6 pt-0">
                  <h3 className="text-xl font-bold mb-6">Bank & KYC Details</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Account Number</label>
                    <input
                      type="text"
                      name="confirmAccountNumber"
                      value={formData.confirmAccountNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="SBIN0000123"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="savings"
                          name="accountType"
                          value="savings"
                          checked={formData.accountType === "savings"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="savings" className="text-sm">
                          Savings Account
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="current"
                          name="accountType"
                          value="current"
                          checked={formData.accountType === "current"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="current" className="text-sm">
                          Current Account
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof (PAN/Aadhaar)</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-center text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-center text-gray-500 mt-1">PDF, JPG or PNG (Max. 2MB)</p>
                      <input
                        type="file"
                        className="hidden"
                        id="idProof"
                        onChange={(e) => handleFileUpload(e, "idProof")}
                      />
                      <label htmlFor="idProof" className="w-full cursor-pointer h-full absolute inset-0 opacity-0">
                        Upload ID Proof
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Proof (Utility Bill/Passport)
                    </label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-center text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-center text-gray-500 mt-1">PDF, JPG or PNG (Max. 2MB)</p>
                      <input
                        type="file"
                        className="hidden"
                        id="addressProof"
                        onChange={(e) => handleFileUpload(e, "addressProof")}
                      />
                      <label htmlFor="addressProof" className="w-full cursor-pointer h-full absolute inset-0 opacity-0">
                        Upload Address Proof
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
                      onClick={handlePreviousStep}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Previous
                    </button>
                    <button
                      className="bg-[#004d40] text-white px-4 py-2 rounded-md flex items-center"
                      onClick={handleSubmitInvestment}
                    >
                      Submit Investment
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {investmentStep === 4 && (
                <div className="p-6 pt-0 text-center">
                  <div className="flex justify-center my-8">
                    <div className="bg-green-100 rounded-full p-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Investment Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-8">
                    Your investment request has been received. Our team will review your application and contact you
                    shortly.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="bg-[#004d40] text-white px-4 py-2 rounded-md" onClick={handleViewInvestments}>
                      View My Investments
                    </button>
                    <button
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
                      onClick={handleReturnHome}
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #004d40;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #004d40;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default Calculator
