import React from 'react';
import InvestmentProcess from './components/InvestmentProcess';
import TreeFamilySystem from './components/TreeFamilySystem';
import CallToAction from './components/CallToAction';
import Calculator from './Calculater/Calculator';

function App() {
  return (
    // <div className="min-h-screen bg-gray-50">
    //   <div className="max-w-5xl mx-auto px-4 py-12">
    //     <h1 className="text-4xl font-bold text-center text-[#004D40] mb-4">How It Works</h1>
    //     <p className="text-center text-[#4B5563] text-[17px] font-semibold mb-12 max-w-2xl mx-auto">
    //       Understanding MSV Infotech's investment process is simple. Follow these steps to start your journey towards financial growth.
    //     </p>
    //     <InvestmentProcess />
    //     <TreeFamilySystem />
    //     <CallToAction />
    //   </div>
    // </div>


    <>
    <Calculator/>
    </>
    
  );
}

export default App;