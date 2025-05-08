import React from 'react';
import { UserCircle, BarChart3, Wallet, TrendingUp, DollarSign } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Register',
    description: 'Create your account with MSV Infotech by providing your basic details. Our team will verify your information and set up your investor profile.',
    icon: UserCircle,
  },
  {
    number: 2,
    title: 'Choose a Plan',
    description: 'Select from our range of investment plans - Quarterly Compounding, Tree Family Plan, or Systematic Investment Plan - based on your financial goals.',
    icon: BarChart3,
  },
  {
    number: 3,
    title: 'Invest',
    description: 'Make your investment through our secure payment channels. The minimum investment amount is ₹50,000 with no upper limit.',
    icon: Wallet,
  },
  {
    number: 4,
    title: 'Track Returns',
    description: 'Monitor your investment growth through quarterly reports. Watch as your money compounds with each 5% quarterly return.',
    icon: TrendingUp,
  },
  {
    number: 5,
    title: 'Withdraw Profits',
    description: 'Choose to withdraw your profits quarterly or reinvest them for even greater returns. Withdrawals are processed within 3-5 business days.',
    icon: DollarSign,
  },
];

const InvestmentProcess = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4"> 
      <div className="relative">
        {/* Vertical Timeline Line */}
          {/* <div className="absolute left-[2.25rem] top-0 h-full border-l-2 border-dashed border-gray-200" style={{ transform: 'translateX(-50%)' }}></div> */}
          <div className="absolute left-9 top-0 h-full border-l-2 border-dashed border-gray-300 transform -translate-x-1/2"></div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start group">
              {/* Circle Number */}
              <div className="absolute left-0 w-[4.5rem] h-[4.5rem] bg-[#004D40] rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 mt-10">
                {step.number}
              </div>

              {/* Content Card */}
              <div className="ml-24 flex-1 p-6 bg-white rounded-lg border border-gray-800 group-hover:shadow-xl transition-shadow duration-300">

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[#004D40]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className=" text-[#4B5563] leading-relaxed font-medium ">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentProcess;