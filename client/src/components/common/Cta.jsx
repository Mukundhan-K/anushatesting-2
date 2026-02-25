import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({setOpenPop}) => {
  const stats = [
    { label: '500+ Quality Checks', sub: 'Quality Certified', icon: '📋' },
    { label: '10 Year warranty', sub: '1 year Free repair', icon: '🏗️' },
    { label: 'Govt Approved', sub: 'Fully Licensed', icon: '🏛️' },
  ];

  return (<>
    <section className="relative rounded-b-[100px] z-10 py-24 px-6 w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image with Dark Overlay */}
      <div id='cta'
        className="bg-[url('https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930228/po6xhjurueoy0goiyfvg_tbyiug.webp')]
          absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Hire The <span className="text-a-royalsafforn">Best</span> <br />
          <span className="inline-block mt-2">Construction Service</span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          From blueprint to reality, we build structures that stand the test of time with certified excellence and zero compromises.
        </p>

        {/* Glassmorphism Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 transition-all hover:bg-white/15 hover:scale-105"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="text-white text-xl font-bold">{item.label}</h3>
              <p className="text-a-royalsafforn text-xs font-bold uppercase tracking-widest mt-1">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={()=>setOpenPop(true)}
            className="w-full sm:w-auto px-10 py-4 bg-a-royalsafforn hover:bg-[#e68a00] text-white font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(255,159,28,0.3)]">
            Get a Free Quote
          </button>

          <Link to={"/projects"} className='w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold rounded-full transition-all backdrop-blur-sm'>
            View Our Work
          </Link>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#FF9F1C] to-transparent" />
      </div>
    </section>
  </>);
};

export default CallToAction;