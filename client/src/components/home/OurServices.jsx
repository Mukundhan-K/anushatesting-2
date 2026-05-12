import React, {lazy, Suspense, memo} from 'react';
import { getColdwebp } from '../../utility/getImage';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const ICON_MAP = {
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  building: (
    <>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </>
  ),
  key: (
    <>
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4.1a1 1 0 0 0-1.4 0l-2.1 2.1a1 1 0 0 0 0 1.4Z" />
      <path d="m11.1 11.9 4.4-4.4" />
      <path d="m10.7 12.3-6.1 6.1a1 1 0 0 0 0 1.4l2.1 2.1a1 1 0 0 0 1.4 0l6.1-6.1" />
      <path d="M13.9 9.1l2.3 2.3" />
    </>
  ),
  interior_design: (
    <>
      <path d="M20 7h-9L7 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
      <path d="M8 10v4" />
      <path d="M12 10v4" />
      <path d="M16 10v4" />
    </>
  ),
  renovation: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  ),
  smart_home: (
    <>
      <path d="M12 20v-5" />
      <path d="M9 20v-3" />
      <path d="M15 20v-7" />
      <path d="M18 20v-10" />
      <path d="M21 20V8" />
      <path d="M6 20v-1" />
      <path d="M3 20v-2" />
    </>
  ),
  real_estate: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  classical_home: (
    <>
      <path d="M3 21h18" />
      <path d="M3 7v14" />
      <path d="M21 7v14" />
      <path d="M2 3h20" />
      <path d="M5 7v14" />
      <path d="M9 7v14" />
      <path d="M15 7v14" />
      <path d="M19 7v14" />
    </>
  ),
  themed_home: (
    <>
      <path d="m19 11-8-8-8 8V19a2 2 0 0 0 2 2h5" />
      <path d="M12 13a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z" />
      <path d="m14.5 15.5 4.5 4.5" />
    </>
  ),
};

const Card = memo(({icon, title,img, index})=>(
  <div key={index} className="h-full relative group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300">
    {/* Step Number Backdrop */}
    <span className="absolute top-4 right-8 text-7xl font-black text-orange-100">
      0{index + 1}
    </span>

    {/* 1. Background Image with Zoom Effect */}
    <div className="absolute inset-0 z-0">
      <img 
        src={getColdwebp(img)} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-70"
      />
      {/* 2. Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
    </div>

    <div className="relative z-10 h-full flex flex-col">
      {/* Icon Container */}
      <div className="relative z-10 size-16 bg-a-royalsafforn/80 rounded-2xl grid place-items-center mb-8 group-hover:scale-110 transition-transform duration-300">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="size-8"
        >
          {ICON_MAP[icon] || ICON_MAP.home}
        </svg>
      </div>

      {/* Progress Indicator Dots */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1.5 w-12 bg-a-royalsafforn rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-gray-200 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-gray-200 rounded-full"></div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white uppercase tracking-tight whitespace-pre-line">
        {title}
      </h3>
    </div>
  </div>
));

const Services = ({tit,data}) => {  

  return (<>
      <section className="h-full w-full py-10">
        <div className='sm:container mx-auto px-4'>

          <div className='pb-12 md:pb-16 flex flex-col justify-center items-center'>
            <Marquee quotes={"truested patners"} />
            <div className='pt-5 md:pt-10'></div>
            <Heading text={`Our ${tit} Construction Services`} />
          </div>

          <div>
              <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
                <EmblaSlider
                  items={data}
                  renderSlide={({icon,title,text, img}, index) =><Card key={title} img={img} title={title} icon={icon} text={text} index={index} />}
                  autoplay
                  autoplayDelay={3000}
                  loop = {true}
                  arrows={true}
                  arrowPosition="bottom-right"
                  showCounter={true}
                  counterPosition='top-right'
                  slidesPerView={{
                    base: 1,
                    sm: 2,
                    lg:3,
                    xl:4
                  }}
                  viewportPadding='p-2'
                  gap={20}
                />
              </Suspense>
            </div>
        </div>
      </section>
    </> );
};

export default Services;