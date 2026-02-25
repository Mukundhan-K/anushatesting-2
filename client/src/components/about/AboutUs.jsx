import React, {memo, lazy, Suspense} from 'react';

import ButtonArrow from "../ui/ButtonArrow";
import Marquee from "../ui/marquee";
import Heading from "../common/Heading";
import { getImageSvg } from '../../utility/getImage';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../utility/UseMediaQuery';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const features = [
  {
    id: 'quality',
    title: 'High quality',
    desc: 'We are committed to zero incidents, with a lost time frequency rate that leads the industry.',
    icon: 'quality'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    desc: 'We uphold this standard through complete transparency & professional conduct in every action we take',
    icon: 'quality' // Changed from "quality" to match context
  },
  {
    id: 'consultation',
    title: 'Free Consultation',
    desc: 'We collaborate with investors and developers to build landmark projects that leave a lasting impact',
    icon: 'quality'
  },
  {
    id: 'timeline',
    title: 'Timeline',
    desc: 'Our versatile team provides timely, innovative solutions driven by future-focused expertise',
    icon: 'quality'
  }
];

const Card = memo(({feature})=>(
  <div className="p-1 bg-gradient-to-b from-orange-400 to-transparent rounded-4xl">
    <div className="bg-white rounded-4xl p-10 h-full flex flex-col items-start">
      {/* Icon with Ring */}
      <div className="relative mb-8">
        <div className="size-20 bg-gray-900 rounded-full grid place-items-center text-white shadow-2xl">
          {feature?.icon &&
            <img src={getImageSvg(feature?.icon)} className="size-10 brightness-0 invert"  loading="lazy"
            alt={`${feature?.title} icon`}
            title={`Icon of ${feature?.title}`}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            />
          }
        </div>
        {/* Small Step Badge */}
        <div className="absolute -bottom-2 -right-2 size-8 bg-orange-500 border-4 border-white rounded-full flex items-center justify-center text-white text-xs font-bold">
          1
        </div>
      </div>

      <h3 className="text-2xl font-extrabold text-slate-800 mb-4">{feature.title}</h3>
      <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
      
      {/* Decorative Line */}
      <div className="mt-auto pt-8 w-full">
        <div className="h-px w-full bg-gradient-to-r from-orange-500 to-transparent opacity-20"></div>
      </div>
    </div>
  </div>
));

const AboutUs = ({setOpenPop}) => {
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const isMdUp = useMediaQuery("(min-width: 768px)");

  return (<>
    <section className='h-full w-full lg:py-16 '>
      <div className='sm:container mx-auto px-4'>

        <div className='grid lg:grid-cols-2 items-center md:gap-5 lg:gap-16'>

          <div className='lg:pb-10'>
            <Marquee quotes={"About us"} />
            <div className='pt-5 md:pt-10'></div>
            <div className='xl:w-[700px] pb-5'>
              <Heading text={""} align='text-left' />
              <h1 className='siteHeading text-3xl md:text-4xl lg:text-5xl font-semibold'>Crafting the Future of Architecture and Design</h1>
            </div>
            {isLgUp && <div className='hidden lg:block'>
              <Link to={"/services"} className='w-fit'>
                <ButtonArrow text='Explore All' />
              </Link>

            </div>}
          </div>

          <div className='flex flex-col'>
            <h2 className='text-2xl order-1 md:order-none mt-5 md:mt-0'>We turn your dream spaces into reality, brick by brick and detail by detail.</h2>
            <p className="md:pt-5 text-lg leading-8 text-gray-600"> Whether you need full-scale building construction or high-end interior design, we deliver unmatched precision, quality craftsmanship, and innovative solutions to create inspiring living and working environments across India.</p>
            {!isLgUp && <div className='block lg:hidden pt-5 pb-10 md:pb-0 md:pt-10'>
              <Link to={"/services"} className='w-fit'>
                <ButtonArrow text='Explore All' />
              </Link>
            </div>}

          </div>

        </div>

        <div id='aboutCnt' className='bg-[url("https://res.cloudinary.com/djw3rcz4j/image/upload/v1771936264/team_u0sbcb.webp")]
        h-[400px] lg:h-[600px] mt-5 md:mt-10 bg-cover bg-center bg-no-repeat rounded-3xl p-8' >
          <div className='w-fit py-3 px-5 mt-[300px] md:mt-0 bg-a-royalsafforn rounded-3xl text-xl text-white'>Mr.Vidhya Sagar, CEO</div>
        </div>

        {isMdUp ?
          (<div className='py-8 lg:pt-20 hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature) => (
              <Card key={feature.name} feature={feature} />
            ))}
          </div>)
        : 
          (<div className="py-5 pb-10 block md:hidden">
            <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
              <EmblaSlider
                items={features}
                renderSlide={(item) =><Card key={item.name} feature={item} />}
                autoplay
                autoplayDelay={3000}  
                loop = {true}
                dots = {true}
                slidesPerView={{
                    base: 1,
                    sm : 2,
                }}
                viewportPadding='p-2'
                gap={20}
              />
            </Suspense>
          </div>)
        }

        <div className='lg:pt-5 pb-8 lg:pb-0 text-center'>
           <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
        </div>
      </div>
    </section>
  </>);
};

export default memo(AboutUs);