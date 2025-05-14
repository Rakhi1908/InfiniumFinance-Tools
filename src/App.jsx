// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import InvestmentProcess from "./components/InvestmentProcess"
// import TreeFamilySystem from "./components/TreeFamilySystem"
// import CallToAction from "./components/CallToAction"
// import Calculator from "./Calculater/Calculator"
// import Header from "./components/Header"
// import Footer from "./components/Footer"
// import Profile from "./pages/profile"
// import AuthModal from "./components/AuthModal"

// function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto px-4 py-12">
//         <h1 className="text-4xl font-bold text-center text-[#004D40] mb-4">How It Works</h1>
//         <p className="text-center text-[#4B5563] text-[17px] font-semibold mb-12 max-w-2xl mx-auto">
//           Understanding MSV Infotech's investment process is simple. Follow these steps to start your journey towards
//           financial growth.
//         </p>
//         <InvestmentProcess />
//         <TreeFamilySystem />
//         <CallToAction />
//       </div>
//     </div>
//   )
// }

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/how-it-works" element={<HomePage />} />
//         <Route path="/calculator" element={<Calculator />} />
//         <Route path="/auth" element={<AuthModal />} />
//         <Route path="/profile" element={<Profile />} />

//       </Routes>
//       <Footer />
//     </Router>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Calculator from "./Calculater/Calculator"
import InvestmentProcess from "./components/InvestmentProcess"
import TreeFamilySystem from "./components/TreeFamilySystem"
import CallToAction from "./components/CallToAction"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AuthModal from "./components/AuthModal"
import MyInvestments from "./pages/MyInvestments"
import Reports from "./pages/Reports"
import BankDetails from "./pages/BankDetails"
import Profile from "./pages/profile"
import Dashboard from "./Pages/Dashboard"

// Protected route component
const ProtectedRoute = ({ children }) => {
  // In a real app, you would check if the user is authenticated
  const isAuthenticated = true // For demo purposes

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}


function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-[#004D40] mb-4">How It Works</h1>
        <p className="text-center text-[#4B5563] text-[17px] font-semibold mb-12 max-w-2xl mx-auto">
          Understanding MSV Infotech's investment process is simple. Follow these steps to start your journey towards
          financial growth.
        </p>
        <InvestmentProcess />
        <TreeFamilySystem />
        <CallToAction />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div className="h-32 text-3xl">Home Page</div>} />
        <Route path="/how-it-works" element={<HomePage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/auth" element={<AuthModal />} />
       
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-investments"
          element={
            <ProtectedRoute>
              <MyInvestments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bank-details"
          element={
            <ProtectedRoute>
              <BankDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
