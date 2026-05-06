import React from 'react';
import { Link } from "react-router-dom";

import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import Button from '../ui/Button'; // Assuming this is your Sketching Button
import CostEstimator from "../estimators/CostEstimator";
import { getImageSvg, getImagewebp } from '../../utility/getImage';

const registeredFormControl = [
  { name: "name", label: "Name", placeholder: "Ex - Arunya", componentType: "input", type: "text", icon: "user" },
  { name: "email", label: "Email", placeholder: "Enter your Email", componentType: "input", type: "email", icon: "email" },
  { name: "phone", label: "Phone", placeholder: "Ex - +91 76959 50724", componentType: "input", type: "tel", icon: "call" },
  { name: "location", label: "Location of Plot", placeholder: "Ex - Perumal (St), velacherry", componentType: "input", type: "text", icon: "location-house" },
];

const CostEstimation = ({ setOpenPop }) => {
  return (
    <section className='relative w-full pb-5 overflow-hidden'>

      <div className='relative z-10 sm:container mx-auto pb-5 lg:pb-10 px-4'>
        
        {/* Header Section */}
        <div className='max-w-4xl mx-auto mb-10 flex flex-col items-center text-center'>
          <div className="mb-6">
            <Marquee quotes={"Free Estimate"} />
          </div>
          <Heading text={"Estimate your Construction Cost"} />
          <p className="mt-2 md:mt-6 text-xl text-gray-500 font-light leading-relaxed">
            From the first brick to the final coat of paint. calculate your investment with our <span className="text-[#026f41] font-medium italic">Architectural Cost Engine</span>.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-stretch gap-y-20 gap-12'>
          
          {/* Left Side: The "Project Board" */}
          <div id='costEst'className='bg-[url("https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930227/cvzsmrfapxk6dprakion_keooze.webp")]
              min-h-[80%] w-full lg:w-6/12 relative rounded-4xl flex shadow-2xl group bgc'>
            {/* Gradient and Content Overlay */}
            <div className='w-full rounded-4xl bg-gradient-to-t from-a-green via-[#026f41]/40 to-transparent flex flex-col justify-end p-10'>
              <div className="mb-4 inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-[0.2em]">
                Real-time Progress
              </div>
              <h3 className='text-4xl font-bold text-white mb-6 leading-tight'>
                Where Vison <br /> Meets Misson.
              </h3>
              
              <div className='flex items-center gap-5 py-6 border-t border-white/20'>
                <div className='w-[230px] flex -space-x-3'>
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={getImagewebp(`review/${i}`)} className='size-12 rounded-full border-2 border-white' alt="Client" />
                  ))}
                </div>
                <p className='w-full text-white/90 text-sm text-wrap'>Join <strong>1,200+</strong> people who planned with us this year.</p>
              </div>
            </div>
            
            <div className='relative'>
              {/* Floating Highlight Card */}
              <div className="absolute -bottom-16 -right-6 lg:-right-5 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[#026f41]/10 flex items-center justify-center text-[#026f41]">
                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Accuracy</p>
                    <p className="text-lg font-bold text-gray-800">100% Guaranteed</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: The Estimator Console */}
          <div className='w-full lg:w-6/12 flex flex-col'>
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
              
              {/* Console Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-8 py-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-4 bg-a-royalsafforn rounded-xl shadow-sm border border-gray-200">
                    <img src={getImageSvg("calculator")} className='size-8' alt="calc" />
                  </div>
                  <div>
                    <Link 
                      to="/estimator" 
                      className="px-5 py-2 rounded-full bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:border-a-green hover:text-a-green/80 transition-all shadow-sm"
                    >
                      Advanced Mode →
                    </Link>
                    <p className="pt-2 pl-2 text-gray-600">Fill details to generate instant quote</p>
                  </div>
                </div>
                
              </div>

              {/* Form Body with Blueprint Grid */}
              <div className="relative p-5 lg:p-10 flex-1">
                <div className='absolute inset-0 opacity-[0.04] pointer-events-none' 
                     style={{ backgroundImage: 'radial-gradient(#026f41 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                </div>
                
                <div className="relative">
                  <CostEstimator registeredFormControl={registeredFormControl} clsStyle={"sm:grid-cols-2 gap-5!"} halign={"center"} />
                </div>

                <div className="mt-8 p-4 bg-[#026f41]/5 rounded-2xl border border-[#026f41]/10 flex items-start gap-3">
                  <span className="text-[#026f41] text-lg">ⓘ</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Our estimation engine uses current market rates for Grade A materials and labor in your specific location. Prices are subject to site-specific conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default CostEstimation;