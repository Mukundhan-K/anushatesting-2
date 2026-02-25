import React from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import { getImageSvg } from '../../utility/getImage';
import ButtonArrow from '../ui/ButtonArrow';

const cards = [
    {icon: "calender",title: "Construction Management", text: "From planning to delivery, we orchestrate complex developments with precision, excellence, and total confidence"},
    {icon: "our-journey-icon-3",title: "Architecture & Design", text: "We create architectural expressions that elevate performance, enhance lifestyle, and define timeless value."},
    {icon: "brick",title: "Real Estate Development", text: "We engage at the earliest stage, shaping visionary concepts into high-value investments with lasting impact."},
    {icon: "builder_worker",title: "Strategic Design", text: "From concept to master plan, we curate spaces with intelligent layouts that redefine innovation and purpose."},
    {icon: "building",title: "Space Styling", text: "Interiors tailored to reflect identity and aspiration, blending refined elegance with elevated comfort."},
    {icon: "our-journey-icon-2",title: "Business Environments", text: "Premium offices, retail destinations, and commercial spaces crafted to inspire productivity and growth."},
];

const OurServices = ({setOpenPop}) => {
  return (<>
    <section className='h-full w-full py-16'>
      <div className='sm:container mx-auto px-4'>

        <div className='pb-10 flex flex-col justify-center items-center'>
            <Marquee quotes={"our Solutions"} />
            <div className='pt-5 md:pt-8'></div>
            <Heading text={"Find Out What We Offer"} />
            <p className="max-w-2xl md:pb-8 text-center text-lg leading-8 text-gray-600">We develop quality infrastructure & real estate projects</p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16'>
            {cards.map(({icon,title,text}, index)=>(
              <div key={index} className="relative group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Step Number Backdrop */}
                <span className="absolute top-4 right-8 text-7xl font-black text-orange-100">
                  0{index + 1}
                </span>
  
                {/* Icon Container */}
                <div className="relative z-10 size-20 bg-orange-50 rounded-2xl grid place-items-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={getImageSvg(icon)} 
                    className="size-12 object-contain" 
                    loading="lazy" 
                    alt={title} 
                  />
                </div>
  
                {/* Progress Indicator Dots */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1.5 w-12 bg-orange-500 rounded-full"></div>
                  <div className="h-1.5 w-1.5 bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-1.5 bg-gray-200 rounded-full"></div>
                </div>
  
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-tight">
                  {title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm lg:text-base w-full">
                  {text}
                </p>
              </div>
            ))}
        </div>

        <div className='pt-10 lg:pt-16 text-center'>
           <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
        </div>
      </div>
    </section>
  </>);
};

export default OurServices;