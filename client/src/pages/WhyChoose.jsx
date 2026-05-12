import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getColdwebp } from '../utility/getImage';

const TABS = [
  { 
    id: 'cost',
    label: 'NO COST OVERRUNS',
    emoji: '₹', 
    title: 'Transparent Cost Breakup',
    content: 'Detailed pricing from package costs to architecture fees with zero hidden surprises.',
    bgImage: getColdwebp("2_ohvvmt"),
    dark: true 
  },
  { 
    id: 'safety', 
    label: 'MONEY SAFETY', 
    emoji: '🔒', 
    title: 'Secure Payment',
    content: 'Your money is safe. We only release payments to contractors after quality milestones are met.',
    bgImage: getColdwebp("4_eqmtxo"),
    dark: true 
  },
  { 
    id: 'delay', 
    label: 'NO DELAY POLICY',
    emoji: '📅', 
    title: 'On-Time Delivery',
    content: 'We track every milestone on the calendar. If we delay, we pay.',
    bgImage: getColdwebp("3_thbiiu"),
    dark: true
  },
  {
    id: 'team', 
    label: 'SOLID TEAM', 
    emoji: '🧑‍💼', 
    title: 'Expert Professionals',
    content: 'Our team includes top-tier architects, project managers, and verified site engineers.',
    bgImage: getColdwebp("1_xsnzty"),
    dark: true
  },
  { 
    id: 'warranty', 
    label: '10 YEAR WARRANTY',
    emoji: '🛡️', 
    title: 'Built to Last',
    content: 'Every project is quality checked and protected by a structural 10-year warranty.',
    bgImage: getColdwebp("5_wcvcfr"),
    dark: true
  },
  { 
    id: 'repair', 
    label: '1 YR FREE REPAIR',
    emoji: '🛠️', 
    title: 'Maintenance Covered',
    content: 'Enjoy peace of mind with 1 year of free repairs and services after handover.',
    bgImage: getColdwebp("6_gpum1p"),
    dark: true
  },
];

const AUTO_PLAY_DURATION = 5000; // 5 Seconds per tab

const PremiumTabs = () => {
  const [activeIdx, setActiveIdx] = useState(4); // Default to 10 Year Warranty
  const [isPaused, setIsPaused] = useState(false);

  // Memoized function to advance to next tab
  const nextTab = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TABS.length);
  }, []);

  // Auto-play Logic
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        nextTab();
      }, AUTO_PLAY_DURATION);
    }
    return () => clearInterval(timer);
  }, [isPaused, nextTab]);

  // const activeTab = TABS[activeIdx];

  return (
    <div className='w-full py-10 px-4 '>
      <div 
        className="h-[600px] w-full sm:container lg:w-full lg:max-w-none lg:px-0 mx-auto flex flex-row md:flex-col bg-white shadow-2xl overflow-hidden font-sans rounded-3xl"
      >
        
        {/* Sidebar Navigation */}
        <nav className="w-24 sm:w-32 md:w-full bg-white flex flex-col md:flex-row border-b md:border-b-0 md:border-r border-gray-100 overflow-x-auto no-scrollbar z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveIdx(index)}
              className={`flex flex-col items-center justify-center min-w-[100px] md:min-w-0 h-32 md:h-20 md:w-full transition-all duration-300 relative group
                ${activeIdx === index ? 'bg-a-royalsafforn/10' : 'hover:bg-gray-50'}`}
            >
              {/* Active Indicator & Timer Progress */}
              {activeIdx === index && (
                <>
                  {/* Desktop Vertical Progress */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 md:hidden">
                    <div className="w-full bg-orange-500 animate-progress-v" />
                  </div>
                  {/* Mobile Horizontal Progress */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 hidden md:block">
                    <div className="h-full bg-orange-500 animate-progress-h" />
                  </div>
                </>
              )}
              
              <span className={`text-xl md:text-2xl mb-2 transition-transform duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 
                ${activeIdx === index ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                {tab.emoji}
              </span>
              <span className={`text-xs font-black text-center px-2 leading-tight uppercase tracking-tighter
                ${activeIdx === index ? 'text-orange-600' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 relative bg-gray-100 overflow-hidden">
          {TABS.map((tab, index) => (
            activeIdx === index && (
              <div key={tab.id} className="absolute inset-0 animate-in fade-in duration-700">
                
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear scale-110"
                  style={{ backgroundImage: `url(${tab.bgImage})` }}
                >
                  <div className={`absolute inset-0 ${tab.dark ? 'bg-black/30' : 'bg-white/20'}`} />
                </div>

                {/* Text Content - Positioned at Top */}
                <div className={`relative z-10 p-8 md:p-16 max-w-2xl pt-12 md:pt-20 
                  ${tab.dark ? 'text-white' : 'text-slate-900'}`}>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
                    {tab.title}
                  </h2>
                  <p className="text-base md:text-lg font-medium opacity-100 max-w-lg leading-relaxed mb-6">
                    {tab.content}
                  </p>
                  <Link to={"contact"}
                    className="px-8 py-3 bg-a-royalsafforn text-white font-bold rounded-full hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-lg"
                  >
                    Contact us
                  </Link>
                </div>

                {/* Status Indicator (Bottom Left) */}
                <div className="absolute bottom-6 left-8 z-20 block">
                    <p className={`text-xs uppercase tracking-[0.2em] font-bold bg-white py-1 px-2 rounded-full `}>
                        {isPaused ? '⏸ Paused' : '▶ Auto-Playing'}
                    </p>
                </div>

                {/* Manual Next Arrow */}
                <div className="absolute bottom-8 right-8 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextTab(); }}
                    className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all text-white hover:scale-110 active:scale-95"
                  >
                    <span className="text-2xl">→</span>
                  </button>
                </div>
              </div>
            )
          ))}
        </main>

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes progressV {
            from { height: 0%; }
            to { height: 100%; }
          }

          @keyframes progressH {
            from { width: 0%; }
            to { width: 100%; }
          }

          .animate-in {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .animate-progress-v {
            animation: progressV ${AUTO_PLAY_DURATION}ms linear forwards;
          }

          .animate-progress-h {
            animation: progressH ${AUTO_PLAY_DURATION}ms linear forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PremiumTabs;