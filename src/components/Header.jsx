// import React, { useState, useEffect } from 'react';
// import { Menu, Phone, Mail, Clock, MapPin } from 'lucide-react';
// import AuthModal from './AuthModal';

// // NavLink component (simplified without react-router-dom for demo)
// const NavLink = ({ to, label, children, className }) => (
//   <a 
//     href={to} 
//     className={className || "relative group text-gray-900 hover:text-teal-700 font-medium"}
//     onClick={(e) => {
//       e.preventDefault();
//       window.scrollTo(0, 0);
//     }}>
//     {label || children}
//     {!className && (
//       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
//     )}
//   </a>
// );

// // Mobile NavLink component
// const MobileNavLink = ({ to, label }) => (
//   <NavLink
//     to={to}
//     label={label}
//     className="text-gray-900 hover:text-teal-700 font-medium"
//   />
// );

// export default function Header() {
//   const [hideTopBar, setHideTopBar] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHideTopBar(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleAuthButtonClick = () => {
//     setShowAuthModal(true);
//     setMobileMenuOpen(false); // Close mobile menu if open
//   };

//   return (
//     <header className="w-full">
//       {/* Top Info Bar */}
//       <div
//         className={`bg-teal-900 text-white py-2 fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
//           hideTopBar ? '-translate-y-full' : 'translate-y-0'
//         }`}>
//         <div className="container mx-auto flex flex-wrap justify-between text-base font-medium px-4">
//           <div className="flex flex-wrap items-center space-x-6">
//             <a href="tel:‪+911234567890‬" className="flex items-center space-x-1 transition-colors">
//               <Phone size={14} />
//               <span>‪+91 1234567890‬</span>
//             </a>
//             <a
//               href="mailto:info@infiniumfinance.com"
//               className="flex items-center space-x-1 transition-colors">
//               <Mail size={14} />
//               <span>info@infiniumfinance.com</span>
//             </a>
//           </div>
//           <div className="flex flex-wrap items-center space-x-6">
//             <div className="flex items-center space-x-1">
//               <Clock size={14} />
//               <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MapPin size={14} />
//               <span>Ahmedabad, Maharashtra</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav
//         className={`w-full bg-white md:block transition-all duration-500 ease-in-out ${
//           hideTopBar ? 'shadow-md py-2 mt-0 fixed top-0 left-0 right-0 z-40' : 'py-2 mt-[30px]'
//         }`}>
//         <div className="container mx-auto flex justify-between items-center px-4">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img
//               src="https://68199ce7b80a86dab6bac1b0--rococo-mousse-fc58f1.netlify.app/logo.png"
//               alt="Infinium Finance Logo"
//               className="h-[130px] w-[130px] object-contain transition-transform hover:rotate-12"
//             />
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden lg:flex items-center space-x-8 text-md font-semibold leading-6 text-gray-900">
//             {[
//               { to: '/', label: 'Home' },
//               { to: '/about', label: 'About Us' },
//               { to: '/plans', label: 'Investment Plans' },
//               { to: '/how-it-works', label: 'How It Works' },
//               { to: '/calculator', label: 'Calculator' },
//               { to: '/faqs', label: 'FAQs' },
//               { to: '/contact', label: 'Contact' },
//             ].map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 label={link.label}
//               />
//             ))}
//           </div>

//           {/* Desktop Auth Button */}
//           <div className="hidden lg:block">
//             <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu">
//             <Menu size={24} />
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden overflow-hidden transition-all duration-300 ${
//             mobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0'
//           }`}>
//           <div className="flex flex-col space-y-3 pb-3 px-4">
//             <MobileNavLink to="/" label="Home" />
//             <MobileNavLink to="/about" label="About Us" />
//             <MobileNavLink to="/plans" label="Investment Plans" />
//             <MobileNavLink to="/how-it-works" label="How It Works" />
//             <MobileNavLink to="/calculator" label="Calculator" />
//             <MobileNavLink to="/faqs" label="FAQs" />
//             <MobileNavLink to="/contact" label="Contact" />
            
//             {/* Mobile Auth Button */}
//             <div className="pt-2">
//               <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client"

import { Link, NavLink, useNavigate } from "react-router-dom"
import { Menu, Phone, Mail, Clock, MapPin, User, ChevronDown, Bell } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import AuthModal from "./AuthModal"

const MobileNavLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 text-gray-900 hover:text-teal-700 font-medium ${isActive ? "text-teal-700" : ""}`
    }
    onClick={onClick}
  >
    {label}
  </NavLink>
)

export default function Header() {
  const [hideTopBar, setHideTopBar] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Default to not logged in
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }

    // Check on initial load
    checkLoginStatus()

    // Listen for storage events (in case login state changes in another tab)
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHideTopBar(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const userName = "Preview User"

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    // Clear login state in localStorage
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
    setUserMenuOpen(false)
    closeMobileMenu()
    navigate("/")
  }

  // Add a new function to handle successful login
  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  return (
    <header className="w-full">
      {/* Top Info Bar */}
      <div
        className={`bg-teal-900 text-white py-2 fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          hideTopBar ? "-translate-y-full" : "translate-y-0"
        }`}>
        <div className="container mx-auto flex flex-wrap justify-between text-sm font-medium px-4">
          <div className="flex flex-wrap items-center space-x-6">
            <a href="tel:‪+911234567890‬" className="flex items-center space-x-1 transition-colors">
              <Phone size={14} />
              <span>‪+91 1234567890‬</span>
            </a>
            <a href="mailto:info@infiniumfinance.com" className="flex items-center space-x-1 transition-colors">
              <Mail size={14} />
              <span>info@infiniumfinance.com</span>
            </a>
          </div>
          <div className="hidden md:flex flex-wrap items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>Ahmedabad, Maharashtra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full bg-white transition-all duration-500 ease-in-out ${
          hideTopBar ? "shadow-md py-2 mt-0 fixed top-0 left-0 right-0 z-40" : "py-2 mt-[38px]"
        }`}>
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://68199ce7b80a86dab6bac1b0--rococo-mousse-fc58f1.netlify.app/logo.png"
                alt="Infinium Finance Logo"
                className="h-[120px] w-[120px] object-contain transition-transform hover:rotate-12 cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8 text-md font-bold leading-6 text-gray-900">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/plans", label: "Investment Plans" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/calculator", label: "Calculator" },
              { to: "/faqs", label: "FAQs" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative group text-gray-900 hover:text-teal-700 font-medium ${isActive ? "text-teal-700" : ""}`
                }>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-700 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* User Menu or Auth Button */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center space-x-2 text-gray-900 hover:text-teal-700 font-medium"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <div className="relative">
                    <Bell size={20} className="mr-2" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </div>
                  <User size={20} />
                  <span className="hidden md:inline">{userName}</span>
                  <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link
                      to="/my-investments"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}>
                      My Investments
                    </Link>
                    <Link
                      to="/bank-details"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}>
                      Bank Details
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <AuthModal onLoginSuccess={handleLoginSuccess} />
            )}

            {/* Mobile Menu Button */}
            <button
              className="ml-4 lg:hidden p-2 text-gray-500 hover:text-teal-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 mt-2">
            <div className="flex flex-col space-y-1 py-3 px-4">
              <MobileNavLink to="/" label="Home" onClick={closeMobileMenu} />
              <MobileNavLink to="/about" label="About Us" onClick={closeMobileMenu} />
              <MobileNavLink to="/plans" label="Investment Plans" onClick={closeMobileMenu} />
              <MobileNavLink to="/how-it-works" label="How It Works" onClick={closeMobileMenu} />
              <MobileNavLink to="/calculator" label="Calculator" onClick={closeMobileMenu} />
              <MobileNavLink to="/faqs" label="FAQs" onClick={closeMobileMenu} />
              <MobileNavLink to="/contact" label="Contact" onClick={closeMobileMenu} />

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">Account</p>
                    <MobileNavLink to="/dashboard" label="Dashboard" onClick={closeMobileMenu} />
                    <MobileNavLink to="/profile" label="Profile" onClick={closeMobileMenu} />
                    <MobileNavLink to="/my-investments" label="My Investments" onClick={closeMobileMenu} />
                    <MobileNavLink to="/bank-details" label="Bank Details" onClick={closeMobileMenu} />
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-900 hover:text-teal-700 font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-gray-200 my-2">
                  <AuthModal onLoginSuccess={handleLoginSuccess} />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
