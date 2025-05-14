// "use client"

// import { useState, useEffect } from "react"
// import { X, Mail, Lock, User, ArrowRight } from "lucide-react"

// export default function AuthModal() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("login")
//   const [loginMethod, setLoginMethod] = useState("password")

//   // Form states
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [otp, setOtp] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [acceptTerms, setAcceptTerms] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)

//   // Error states
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Open modal when Login/Register button is clicked
//   const openModal = () => {
//     setIsOpen(true)
//     document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
//   }

//   // Close modal
//   const closeModal = () => {
//     setIsOpen(false)
//     document.body.style.overflow = "auto" // Re-enable scrolling
//     // Reset form states
//     setErrors({})
//     setIsSubmitting(false)
//   }

//   // Handle tab change
//   const handleTabChange = (tab) => {
//     setActiveTab(tab)
//     setErrors({})
//   }

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {}

//     if (activeTab === "register") {
//       if (!fullName.trim()) {
//         newErrors.fullName = "Full name is required"
//       }

//       if (password !== confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match"
//       }

//       if (!acceptTerms) {
//         newErrors.terms = "You must accept the terms and conditions"
//       }
//     }

//     if (!email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (activeTab === "login" && loginMethod === "otp") {
//       if (!otp.trim()) {
//         newErrors.otp = "OTP is required"
//       } else if (otp.length !== 6) {
//         newErrors.otp = "OTP must be 6 digits"
//       }
//     } else {
//       if (!password.trim()) {
//         newErrors.password = "Password is required"
//       } else if (password.length < 6) {
//         newErrors.password = "Password must be at least 6 characters"
//       }
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   // Handle login
//   const handleLogin = (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     if (validateForm()) {
//       // Simulate API call
//       setTimeout(() => {
//         console.log("Login successful", { email, password, loginMethod, rememberMe })
//         closeModal()
//         setIsSubmitting(false)
//       }, 1500)
//     } else {
//       setIsSubmitting(false)
//     }
//   }

//   // Handle register
//   const handleRegister = (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     if (validateForm()) {
//       // Simulate API call
//       setTimeout(() => {
//         console.log("Registration successful", { fullName, email, password, acceptTerms })
//         closeModal()
//         setIsSubmitting(false)
//       }, 1500)
//     } else {
//       setIsSubmitting(false)
//     }
//   }

//   // Handle click outside to close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isOpen && e.target.classList.contains("modal-overlay")) {
//         closeModal()
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isOpen])

//   return (
//     <>
//       {/* Login/Register Button */}
//       <button
//         onClick={openModal}
//         className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-medium py-2 px-6 rounded"
//       >
//         Login / Register
//       </button>

//       {/* Modal Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//               aria-label="Close"
//             >
//               <X size={20} />
//             </button>

//             {/* Modal Header */}
//             <div className="p-6 pb-0">
//               <h2 className="text-xl font-semibold text-center mb-1">Welcome to Infinium Finance Solution</h2>
//               <p className="text-gray-600 text-center text-sm mb-4">
//                 {activeTab === "login"
//                   ? "Login to access your investment dashboard"
//                   : "Create an account to start your investment journey"}
//               </p>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b mb-6">
//               <button
//                 className={`flex-1 py-3 font-medium text-center ${
//                   activeTab === "login" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500"
//                 }`}
//                 onClick={() => handleTabChange("login")}
//               >
//                 Login
//               </button>
//               <button
//                 className={`flex-1 py-3 font-medium text-center ${
//                   activeTab === "register" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500"
//                 }`}
//                 onClick={() => handleTabChange("register")}
//               >
//                 Register
//               </button>
//             </div>

//             {/* Login Form */}
//             {activeTab === "login" && (
//               <form onSubmit={handleLogin} className="px-6 pb-6">
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       id="email"
//                       className={`w-full pl-10 pr-3 py-2 border ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>

//                 {/* Login Method Selector */}
//                 <div className="mb-4">
//                   <div className="flex items-center text-sm mb-2">
//                     <span className="mr-2">Login with:</span>
//                     <div className="flex border rounded-md overflow-hidden">
//                       <button
//                         type="button"
//                         className={`px-4 py-1 text-sm ${
//                           loginMethod === "password" ? "bg-teal-700 text-white" : "bg-white text-gray-700"
//                         }`}
//                         onClick={() => setLoginMethod("password")}
//                       >
//                         Password
//                       </button>
//                       <button
//                         type="button"
//                         className={`px-4 py-1 text-sm ${
//                           loginMethod === "otp" ? "bg-teal-700 text-white" : "bg-white text-gray-700"
//                         }`}
//                         onClick={() => setLoginMethod("otp")}
//                       >
//                         OTP
//                       </button>
//                     </div>
//                   </div>

//                   {loginMethod === "password" ? (
//                     <div>
//                       <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Lock size={18} className="text-gray-400" />
//                         </div>
//                         <input
//                           type="password"
//                           id="password"
//                           className={`w-full pl-10 pr-3 py-2 border ${
//                             errors.password ? "border-red-500" : "border-gray-300"
//                           } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                           placeholder="••••••••"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                       </div>
//                       {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                     </div>
//                   ) : (
//                     <div>
//                       <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
//                         OTP
//                       </label>
//                       <input
//                         type="text"
//                         id="otp"
//                         className={`w-full px-3 py-2 border ${
//                           errors.otp ? "border-red-500" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                         placeholder="Enter 6-digit OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
//                       />
//                       {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <input
//                       id="remember-me"
//                       name="remember-me"
//                       type="checkbox"
//                       className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                     />
//                     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                       Remember me
//                     </label>
//                   </div>
//                   <div className="text-sm">
//                     <a href="#" className="text-teal-700 hover:underline">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
//                 >
//                   {isSubmitting ? (
//                     "Processing..."
//                   ) : (
//                     <>
//                       Login <ArrowRight size={18} className="ml-1" />
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-4 text-center text-sm">
//                   <p>
//                     <a href="#" className="text-teal-700 hover:underline">
//                       Terms & Conditions
//                     </a>{" "}
//                     and{" "}
//                     <a href="#" className="text-teal-700 hover:underline">
//                       Privacy Policy
//                     </a>
//                   </p>
//                 </div>
//               </form>
//             )}

//             {/* Register Form */}
//             {activeTab === "register" && (
//               <form onSubmit={handleRegister} className="px-6 pb-6">
//                 <div className="mb-4">
//                   <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       id="fullName"
//                       className={`w-full pl-10 pr-3 py-2 border ${
//                         errors.fullName ? "border-red-500" : "border-gray-300"
//                       } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                       placeholder="John Doe"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                     />
//                   </div>
//                   {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       id="registerEmail"
//                       className={`w-full pl-10 pr-3 py-2 border ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="registerPassword"
//                       className={`w-full pl-10 pr-3 py-2 border ${
//                         errors.password ? "border-red-500" : "border-gray-300"
//                       } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       className={`w-full pl-10 pr-3 py-2 border ${
//                         errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                       } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
//                       placeholder="••••••••"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                   </div>
//                   {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex items-center">
//                     <input
//                       id="accept-terms"
//                       name="accept-terms"
//                       type="checkbox"
//                       className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
//                       checked={acceptTerms}
//                       onChange={(e) => setAcceptTerms(e.target.checked)}
//                     />
//                     <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
//                       I accept the{" "}
//                       <a href="#" className="text-teal-700 hover:underline">
//                         Terms & Conditions
//                       </a>{" "}
//                       and{" "}
//                       <a href="#" className="text-teal-700 hover:underline">
//                         Privacy Policy
//                       </a>
//                     </label>
//                   </div>
//                   {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
//                 >
//                   {isSubmitting ? (
//                     "Processing..."
//                   ) : (
//                     <>
//                       Register <ArrowRight size={18} className="ml-1" />
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-4 text-center text-sm"></div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { X, Mail, Lock, User, ArrowRight } from "lucide-react"

// Update the component definition to accept onLoginSuccess prop
export default function AuthModal({ onLoginSuccess }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [loginMethod, setLoginMethod] = useState("password")
  const navigate = useNavigate()

  // Form states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Error states
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Open modal when Login/Register button is clicked
  const openModal = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  // Close modal
  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
    // Reset form states
    setErrors({})
    setIsSubmitting(false)
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setErrors({})
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (activeTab === "register") {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }

      if (!acceptTerms) {
        newErrors.terms = "You must accept the terms and conditions"
      }
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (activeTab === "login" && loginMethod === "otp") {
      if (!otp.trim()) {
        newErrors.otp = "OTP is required"
      } else if (otp.length !== 6) {
        newErrors.otp = "OTP must be 6 digits"
      }
    } else {
      if (!password.trim()) {
        newErrors.password = "Password is required"
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update the handleLogin function to call onLoginSuccess
  const handleLogin = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        console.log("Login successful", { email, password, loginMethod, rememberMe })
        closeModal()
        setIsSubmitting(false)
        // Call the onLoginSuccess callback to update the header
        if (onLoginSuccess) onLoginSuccess()
        // Redirect to dashboard after successful login
        navigate("/dashboard")
      }, 1500)
    } else {
      setIsSubmitting(false)
    }
  }

  // Update the handleRegister function to call onLoginSuccess
  const handleRegister = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        console.log("Registration successful", { fullName, email, password, acceptTerms })
        closeModal()
        setIsSubmitting(false)
        // Call the onLoginSuccess callback to update the header
        if (onLoginSuccess) onLoginSuccess()
        // Redirect to dashboard after successful registration
        navigate("/dashboard")
      }, 1500)
    } else {
      setIsSubmitting(false)
    }
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains("modal-overlay")) {
        closeModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Login/Register Button */}
      <button
        onClick={openModal}
        className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-medium py-2 px-6 rounded">
        Login / Register
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close">
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-6 pb-0">
              <h2 className="text-xl font-semibold text-center mb-1">Welcome to Infinium Finance Solution</h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                {activeTab === "login"
                  ? "Login to access your investment dashboard"
                  : "Create an account to start your investment journey"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-3 font-medium text-center ${
                  activeTab === "login" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500"
                }`}
                onClick={() => handleTabChange("login")}>
                Login
              </button>
              <button
                className={`flex-1 py-3 font-medium text-center ${
                  activeTab === "register" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500"
                }`}
                onClick={() => handleTabChange("register")}>
                Register
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="px-6 pb-6">
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
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Login Method Selector */}
                <div className="mb-4">
                  <div className="flex items-center text-sm mb-2">
                    <span className="mr-2">Login with:</span>
                    <div className="flex border rounded-md overflow-hidden">
                      <button
                        type="button"
                        className={`px-4 py-1 text-sm ${
                          loginMethod === "password" ? "bg-teal-700 text-white" : "bg-white text-gray-700"
                        }`}
                        onClick={() => setLoginMethod("password")}>
                        Password
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-1 text-sm ${
                          loginMethod === "otp" ? "bg-teal-700 text-white" : "bg-white text-gray-700"
                        }`}
                        onClick={() => setLoginMethod("otp")}>
                        OTP
                      </button>
                    </div>
                  </div>

                  {loginMethod === "password" ? (
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          className={`w-full pl-10 pr-3 py-2 border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        OTP
                      </label>
                      <input
                        type="text"
                        id="otp"
                        className={`w-full px-3 py-2 border ${
                          errors.otp ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      />
                      {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-teal-700 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Login <ArrowRight size={18} className="ml-1" />
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-sm">
                  <p>
                    <a href="#" className="text-teal-700 hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-teal-700 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="px-6 pb-6">
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
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="registerEmail"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="registerPassword"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500`}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      id="accept-terms"
                      name="accept-terms"
                      type="checkbox"
                      className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                      I accept the{" "}
                      <a href="#" className="text-teal-700 hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-teal-700 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Register <ArrowRight size={18} className="ml-1" />
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-sm"></div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}