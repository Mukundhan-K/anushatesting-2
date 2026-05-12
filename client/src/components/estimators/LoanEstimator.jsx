import React, { useState, useMemo } from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';


const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // Predefined Quick-Select Values
  const quickAmounts = [1000000, 2500000, 5000000, 7500000, 10000000];
  const quickTenures = [5, 10, 15, 20, 25, 30];

  const results = useMemo(() => {
    const P = principal;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    const interestPercentage = (totalInterest / totalPayment) * 100;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      interestPercentage: Math.round(interestPercentage),
      principalPercentage: Math.round(100 - interestPercentage)
    };
  }, [principal, interestRate, tenure]);

  return (

    <section className="h-full w-full bg-[#F3F4F6] ">
      <div className="sm:container mx-auto py-10 px-4">
        
        <div className='pb-10'>
          <Marquee quotes={"Free Estimate"} />
          <div className='pt-10'></div>
          <Heading text={"Estimate your Loan EMI"} align={"left"} />
          <p className="lg:pb-8 text-lg leading-8 text-gray-600">Calculate your home loan EMI, total interest, and repayment schedule with precision to make smart financial decisions and secure your future.</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: INPUTS --- */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 underline decoration-[#FF8C00] decoration-4 underline-offset-8">
                Loan Parameters
              </h3>

              {/* Principal Amount */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[11px] font-black uppercase text-black  tracking-wider">Loan Amount (₹)</label>
                  <span className="text-xl font-black text-[#026f41]">₹ {principal.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" min="100000" max="20000000" step="100000" 
                  value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#FF8C00]"
                />
                <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
                  {quickAmounts.map(amt => (
                    <button 
                      key={amt} onClick={() => setPrincipal(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all ${principal === amt ? 'bg-[#FF8C00] text-white' : 'bg-slate-100 text-black hover:bg-slate-200'}`}
                    >
                      {amt >= 10000000 ? `${amt / 10000000} Cr` : `${amt / 100000} Lakh`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[11px] font-black uppercase text-black tracking-wider">Interest Rate (% p.a)</label>
                  <span className="text-xl font-black text-[#026f41]">{interestRate}%</span>
                </div>
                <input 
                  type="range" min="7" max="15" step="0.1" 
                  value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#FF8C00]"
                />
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[11px] font-black uppercase text-black tracking-wider">Tenure (Years)</label>
                  <span className="text-xl font-black text-[#026f41]">{tenure} Years</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#FF8C00]"
                />
                <div className="flex gap-2 mt-4">
                  {quickTenures.map(yr => (
                    <button 
                      key={yr} onClick={() => setTenure(yr)}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${tenure === yr ? 'bg-[#026f41] text-white' : 'bg-slate-100 text-black'}`}
                    >
                      {yr} Y
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT: RESULTS & SUMMARY --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* EMI Result Card */}
            <div className="bg-[#111827] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" /></svg>
               </div>
               
               <div className="relative z-10">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00]">Monthly Installment</span>
                 <div className="text-5xl font-black mt-4 italic">₹ {results.emi.toLocaleString('en-IN')}</div>
                 
                 <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Principal Amount</span>
                      <span className="font-bold">₹ {principal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Total Interest</span>
                      <span className="font-bold text-[#FF8C00]">₹ {results.totalInterest.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                      <span className="text-slate-400 font-medium">Total Amount Payable</span>
                      <span className="font-black text-xl text-white">₹ {results.totalPayment.toLocaleString('en-IN')}</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
               <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-6 italic">Payment Breakdown</h4>
               
               <div className="space-y-6">
                  <div className="flex h-4 w-full rounded-full overflow-hidden bg-slate-100">
                    <div 
                      className="bg-[#026f41] h-full transition-all duration-1000" 
                      style={{ width: `${results.principalPercentage}%` }}
                    />
                    <div 
                      className="bg-[#FF8C00] h-full transition-all duration-1000" 
                      style={{ width: `${results.interestPercentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#026f41]" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Principal ({results.principalPercentage}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#FF8C00]" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Interest ({results.interestPercentage}%)</span>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanEMICalculator;