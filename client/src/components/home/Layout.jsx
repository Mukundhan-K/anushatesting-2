import React, {lazy, Suspense} from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';

import { Link } from "react-router-dom";
import ButtonArrow from '../ui/ButtonArrow';
import { getColdwebp } from '../../utility/getImage';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const steps = [
  {
    step: "STEP 1",
    title: "Consultation & Planning",
    desc: "We study your plot, budget & design goals before anything begins.",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    step: "STEP 2",
    title: "3D Design & Architecture",
    desc: "Realistic 3D layouts and structural drawings approved before work starts.",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    )
  },
  {
    step: "STEP 3",
    title: "Materials & Clear BOQ",
    desc: "Transparent bill of quantities — approved specs, zero hidden costs.",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];


const FloorPlanCard = ({i, title, imageUrl}) => {
  // console.log();
  
  // const  = cont;
  return(<div className="rounded-2xl flex flex-col flex-1">

    <div className="rounded-lg border border-gray-200">
      <img src={getColdwebp(imageUrl)} alt={title} className="max-w-full h-auto" />
    </div>

    <div className="p-3 md:p-4 flex flex-row justify-between items-start md:items-center gap-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <span className="text-xs font-semibold text-orange-600 px-3 py-1 bg-orange-100 rounded-full">
        Stage-{i+1}
      </span>
    </div>
  </div>)
};

const ResponsiveFloorPlans = ({setOpenPop, data}) => (

  <section className='py-10 md:py-16 bg-bg-brown' id='pricing'>

    <div className="sm:container  mx-auto p-4 font-sans">

      <div className='flex flex-col justify-center items-center'>
        <Marquee quotes={"our Solutions"} color='' />
        <div className='pt-4 md:pt-8'></div>
        <Heading text={"Integrated Construction Solutions"} classes={""} />
        <p className="max-w-2xl text-center text-gray-500 mb-12 text-lg">
          Our expert interior designers in Chennai work closely with you to create spaces that blend style, comfort, and functionality.
        </p>
      </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Column: Image and Floating Badges */}
        <div className="relative w-full lg:w-1/2">
          <div className="h-full relative rounded-2xl shadow-2xl">

            <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
              <EmblaSlider
                items={data}
                renderSlide={(item, i) =><FloorPlanCard key={item?.title} i={i} {...item} />}
                autoplay
                autoplayDelay={3000}
                loop = {true}
                arrows={true}
                arrowPosition="bottom-right"
                dots={true}
                dotsPosition='bottom-left'
                slidesPerView={{  
                    base: 1,
                    sm: 1,
                }}
                viewportPadding='p-2'
                gap={20}
              />
            </Suspense>
          </div>
        </div>

        {/* Right Column: Text and Timeline */}
        <div className="pt-10 lg:pt-0 w-full lg:w-1/2">

          <div className="relative space-y-6">
            {/* Vertical Line */}
            <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-orange-200" />

            {steps.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-8 group">
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-a-royalsafforn rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center border-4 border-white">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="flex-grow bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-black text-a-royalsafforn bg-orange-50 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      

        <div className='pt-10 lg:pt-20 text-center'>
          <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
        </div>
    </div>
  </section>
);

export default ResponsiveFloorPlans;