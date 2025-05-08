import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 md:p-10 w-full max-w-[95%] mx-auto text-center">

      <h2 className="text-[22px] md:text-[26px] font-bold text-[hsl(182,75%,14%)] mb-3">
        Ready to Start Your Investment Journey?
      </h2>
      <p className="text-[17px] mb-6 text-[#4B5563]" >
        Join thousands of satisfied investors who are growing their wealth with MSV Infotech.
      </p>
      <div className="flex justify-center flex-wrap gap-4">
      <a
          href="#" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-gray-800 font-medium px-6 py-2 rounded hover:bg-yellow-600 transform transition duration-300 hover:scale-105"
        >
          Invest Now
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2 rounded border border-[hsl(182,75%,14%)] text-[hsl(182,75%,14%)] font-medium hover:bg-[hsl(182,75%,14%)] hover:text-white transition duration-300"
        >
          Try Our Calculator <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
