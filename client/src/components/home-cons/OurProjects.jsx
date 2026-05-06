import React, {lazy, Suspense} from 'react';
import { getColdwebp, getImageSvg, getImagewebp } from '../../utility/getImage';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';

import { Link } from "react-router-dom";
import ButtonArrow from '../ui/ButtonArrow';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const Card = ({item:{img, text,subtext, pintext, area}})=>{  
  return (

    <div key={text} className="h-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden font-sans">
      {/* Image Section */}
      <div className="relative p-3 pb-0">
        <div className="relative overflow-hidden">
        <Link to="/projects" >
          <img 
            src={getColdwebp(img)}
            alt={text}
            className="w-full h-full object-cover aspect-square! rounded-3xl border border-a-royalsafforn"
            loading='lazy'  title={`${text}of anusha structures`}
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4 bg-a-green/90 px-4 py-1 rounded-full text-xs font-black text-white tracking-wide uppercase">
              {pintext}
          </div>
        </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 pt-4 ">
        <div className='flex justify-between'>
          <Link to="/projects" >
            <h2 className="text-2xl font-black text-gray-900 mb-2">{text}</h2>
          </Link>
          {/* Location */}
          <div className="flex items-center gap-1.5 mb-6">
            <svg className="w-4 h-4 text-a-royalsafforn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-a-royalsafforn text-sm font-semibold">
              {subtext}
            </span>
          </div>
        </div>

        <hr className="border-gray-300 mb-2" />

        {/* Stats List */}
        <div className="space-y-2">
          {/* Built Up Area */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-a-royalsafforn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <span className="text-gray-900 font-bold">Project Area</span>
            </div>
            <span className="text-gray-600 font-medium">{area} sq ft</span>
          </div>

        </div>
      </div>
    </div>
  );
};

const OurProjects = ({data}) => {

  return (<>
    <section className='h-full w-full py-8 lg:py-16'>
      <div className='sm:container mx-auto px-4'>
        <div className='pb-5 lg:pb-16 flex flex-col justify-center items-center'>
            <Marquee quotes={"our projects"} />
            <div className='pt-5 md:pt-8'></div>
            <Heading text={"Our Journey Through Construction"} />
        </div>

        <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
          <EmblaSlider
            items={data}
            renderSlide={(item) =><Card key={item.name} item={item} />}
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
                md: 2,
                lg: 3,
                xl: 4
            }}
            viewportPadding='p-2'
            gap={20}
          />
        </Suspense>

        <div className='flex justify-center pt-16'>
          <Link to={"/projects"} className='w-fit'>
            <ButtonArrow text='View All' />
          </Link>
        </div>
      </div>
    </section>
  </>);
};

export default OurProjects;