"use client"

import { useState } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, Clock, MapPin, ArrowUp, ArrowRight } from "lucide-react"

// FooterLink component
const FooterLink = ({ href, label }) => (
    <a href={href} className="text-white-100 hover:text-yellow-400 transition-colors flex items-center">
        {label}
    </a>
)

const Footer = () => {
    const [email, setEmail] = useState("")

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    const handleSubscribe = (e) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log("Subscribing email:", email)
        // Reset the input field
        setEmail("")
        // You would typically send this to your backend or newsletter service
    }

    return (
        <>
            {/* CTA Section */}
            <section className="bg-teal-900 bg-[#014043] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Financial Future?</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-lg">
                        Start your investment journey with MSV Infotech today and experience the power of our quarterly compounding
                        model.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#"
                            className="bg-yellow-500 w-48 hover:bg-yellow-600 text-teal-900 font-semibold py-3 px-8 rounded transform transition duration-300 hover:scale-105"
                        >
                            Invest Now
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-white border-white w-48 justify-center gap-2 px-6 py-3 rounded border border-[hsl(182,75%,14%)] text-[hsl(182,75%,14%)] font-semibold hover:bg-[hsl(182,75%,14%)] hover:text-white transition duration-300"
                        >
                            Contact Us
                        </a>

                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-teal-900 border-t bg-[#014043] border-teal-800 py-10">
                <div className="container mx-auto px-4">
                    <div className="bg-teal-800/50 rounded-lg p-8 max-w-7xl w-full mx-auto transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0 md:mr-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
                                <p className="text-white/80">
                                    Stay updated with our latest investment opportunities and financial insights.
                                </p>
                            </div>
                            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex gap-x-2 ">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full sm:w-[450px] bg-[#2d5e59] text-white placeholder-white/60 px-4 py-3 rounded outline-none border border-[#3a726c] focus:ring-2 focus:ring-yellow-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-teal-900 font-semibold px-6 py-3 rounded flex items-center transition-all duration-300"
                                >
                                    Subscribe
                                    <ArrowRight size={18} className="ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Footer */}
            <footer className="bg-teal-900 bg-[#014043] text-white pt-16 pb-6 relative">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <div className="bg-yellow-500 text-white p-1 rounded mr-2 transform rotate-12">
                                    <span className="text-sm font-bold my-2">IFS</span>
                                </div>
                                Infinium Finance <br /> Solutions
                            </h3>
                            <p className="mb-4">
                                A forward-thinking investment solutions company dedicated to offering secure, structured, and profitable
                                financial growth plans.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="p-3 rounded-full bg-white/10 hover:text-yellow-400 transition-colors">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h3>
                            <ul className="space-y-3 text-lg">
                                {[
                                    { label: "Home", href: "#" },
                                    { label: "About Us", href: "#" },
                                    { label: "Investment Plans", href: "#" },
                                    { label: "How It Works", href: "#" },
                                    { label: "Investment Calculator", href: "#" },
                                ].map((link, index) => (
                                    <li key={index} className="flex items-center transform transition-transform hover:translate-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-4 w-4 text-yellow-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Legal</h3>
                            <ul className="space-y-3 text-lg">
                                {[
                                    { label: "Terms & Conditions", href: "#" },
                                    { label: "Privacy Policy", href: "#" },
                                    { label: "Refund Policy", href: "#" },
                                    { label: "Risk Disclosure", href: "#" },
                                ].map((link, index) => (
                                    <li key={index} className="flex items-center transform transition-transform hover:translate-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-4 w-4 text-yellow-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Contact Us</h3>
                            <ul className="space-y-4 text-lg">
                                <li className="flex items-start">
                                    <MapPin size={16} className="mr-2 mt-1 text-yellow-400" />
                                    Infinium Finance Solutions
                                    <br />
                                    123 Financial District
                                    <br />
                                    Ahmedabad, Gujarat
                                    <br />
                                    India
                                </li>
                                <li className="flex items-center">
                                    <Phone size={16} className="mr-2 text-yellow-400" />
                                    +91 1234567890
                                </li>
                                <li className="flex items-center">
                                    <Mail size={16} className="mr-2 text-yellow-400" />
                                    info@infiniumsolutions.com
                                </li>
                                <li className="flex items-center">
                                    <Clock size={16} className="mr-2 text-yellow-400" />
                                    Mon-Fri: 9:00 AM - 6:00 PM
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-teal-800 pt-8 py-6 text-center text-white-900 text-lg">
                        <p className="flex justify-center items-center">
                            © 2025 Infinium Finance Solutions Ltd. All rights reserved.
                        </p>
                        <p className="flex justify-center items-center text-white/60 mt-2">
                            Designed and developed with ❤ for secure financial growth
                        </p>
                    </div>
                </div>

                {/* Back to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute right-8 bottom-10 bg-yellow-500 hover:bg-yellow-600 text-teal-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} />
                </button>
            </footer>
        </>
    )
}

export default Footer