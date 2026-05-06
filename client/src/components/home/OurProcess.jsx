import React, { useState, useEffect, lazy,Suspense, memo } from "react";
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import { getImageSvg, getImagewebp } from '../../utility/getImage';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const card = [
  {
    icon: "user",
    title: "Initial Consultation",
    phase: "one",
    text: "Understanding your vision, goals, budget, and timeline requirements."
  },
  {
    icon: "building_civil_engineering",
    title: "Project Planning",
    phase: "two",
    text: "Creating strategic concepts aligned with design and functionality."
  },
  {
    icon: "calculator",
    title: "Budget & Material Selection",
    phase: "three",
    text: "Selecting cost-effective materials ensuring durability and style."
  },
  {
    icon: "blueprint",
    title: "Design & Approvals",
    phase: "four",
    text: "Preparing detailed drawings and securing required permits."
  },
  {
    icon: "brick",
    title: "Construction Phase",
    phase: "five",
    text: "Executing the build with quality craftsmanship and precision."
  },
  {
    icon: "our-journey-icon-1",
    title: "Project Updates",
    phase: "six",
    text: "Providing transparent progress reports throughout construction."
  },
  {
    icon: "quality",
    title: "Project Completion",
    phase: "seven",
    text: "Delivering a finished space ready for occupancy and use."
  }
]


const CardDsn = memo(({icon, title, text, phase, i})=>( 
    <div className="h-full group relative p-8 bg-white rounded-3xl shadow-[0px_3px_8px_rgba(0,0,0,0.24)] transition-all duration-500 overflow-hidden flex flex-col">
      {/* 2. Header: Icon & Step Number */}
      <div className="flex justify-between items-start relative z-10 mb-10">
        <div className="relative size-20">
          {/* Decorative Glow */}
          <div className="absolute inset-0 rotate-6 rounded-3xl bg-orange-100 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          
          {/* Main Icon Container */}
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-white/50 bg-a-royalsafforn/80 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 text-white! group-hover:text-black!">
            <img 
              src={getImageSvg(icon)} 
              className="size-10 transition-all duration-500 group-hover:invert" 
              loading="lazy" 
              alt={title} 
              title={title}
            />
          </div>
        </div>
        <span className="text-6xl font-black text-a-royalsafforn/20 group-hover:text-a-royalsafforn transition-colors duration-500">
          0{i + 1}
        </span>
      </div>
      {/* 3. The Content Layer - Added flex-grow to push footer down */}
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-[2px] w-8 bg-a-royalsafforn rounded-full" />
          <span className="text-sm font-bold tracking-widest uppercase text-a-royalsafforn">Step {phase}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
          {title}
        </h3>
        
        {/* Setting a min-height or just letting flex-grow handle it */}
        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
          {text}
        </p>
      </div>
      {/* 4. Footer: Interactive Element - Always pinned to bottom */}
      <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
        <span className="text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
          Learn more
        </span>
        <div className="size-10 rounded-full bg-slate-50 group-hover:bg-a-royalsafforn flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
          <svg 
            className="size-5 text-slate-400 group-hover:text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
      {/* 5. Hover Border Trace */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-a-royalsafforn/10 rounded-3xl transition-all duration-500 pointer-events-none" />
    </div>
));

const OurProcess = () => {
  
  return (<>
    <section className='h-full w-full pb-0 md:pb-5 py-5 overflow-hidden' id='ourProcess'>
      {/* <hr className='border-black  -mb-36' /> */}
      <div className='sm:container mx-auto py-8 px-4'>

        <div>
          <Marquee quotes={"our process"} />
          <div className='pt-5 md:pt-8'></div>
          <div>
            <Heading text={"How We Bring Projects to Life:"} align='left' />
            <h3 className="text-xl md:text-3xl text-a-royalsafforn pt-3">Consult. Construct. Complete</h3>
          </div>
        </div>
        
        <div className="cardGrp mt-16">
          <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
            <EmblaSlider
              items={card}
              renderSlide={({icon, title, text, phase}, i) =>(
                <CardDsn key={title} icon={icon} title={title} text={text} phase={phase} i={i} />
              )}
              autoplay
              autoplayDelay={3000}
              loop = {true}
              arrows={true}
              arrowPosition="top-right"
              scrollbar={true}
              scrollWid={true}
              showCounter={true}
              slidesPerView={{
                  base: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 4
              }}
              viewportPadding='p-2'
              gap={50}
            />
          </Suspense>
        </div>

        {/* <div className='border grid grid-cols-5 place-items-center gap-0 p-0 m-0 rounded-3xl'>
            {[...new Array(10)].map((n,i)=>(
                <div key={i} className='w-full h-full border-r border-b -mb-0.5 -mr-0.5'>
                    <img src={getImagePng(`ourprocess/${i+1}`)} alt="" className='size' />
                </div>
             )
            )}
        </div> */}

      </div>
    </section>
  </>);
};

export default OurProcess;