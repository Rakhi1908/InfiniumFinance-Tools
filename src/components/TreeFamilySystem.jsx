import React from 'react';
import { CheckCircle } from 'lucide-react';

const TreeFamilySystem = () => {
  return (
    <div className="max-w-5xl mx-auto md:px-6 py-10"> 
    <h2 className="text-[28px] md:text-[36px] font-bold text-[#004D40] mb-2">
      Tree Family Distribution System
    </h2>
    <p className="text-[17px] text-[#4B5563]  mb-8 max-w-4xl">
      Our unique Tree Family model promotes both individual and collective financial growth by distributing profits among family members:
    </p>
  
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">


      {/* Left Column */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-[#004D40]">How It Works</h3>
        <ul className="space-y-4">
          {[
            "70% of profits go to the main investor (Mukhiya)",
            "30% is reserved for family members or dependents",
            "You can designate up to 5 family members",
            "Each family member receives an equal share"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-[#020817] w-5 h-5 mt-1 mr-3" />
              <span className="text-[15px] text-[#020817]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Right Column */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-[#004D40]">Benefits</h3>
        <ul className="space-y-4">
          {[
            "Creates generational wealth",
            "Ensures financial security for loved ones",
            "Promotes financial literacy among family",
            "Builds a culture of saving and investment"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-[#020817] w-5 h-5 mt-1 mr-3" />
              <span className="text-[15px] text-[#020817]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  
  );
};

export default TreeFamilySystem;
