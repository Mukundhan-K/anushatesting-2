import React,  {memo, lazy, Suspense} from 'react';

import Marquee from "../ui/marquee";
import ButtonArrow from "../ui/ButtonArrow";
import ExpandableGallery from "../ui/ExpandableGallery";
// import Heading from "../common/Heading";

import { getImageSvg } from "../../utility/getImage";
import { Link } from 'react-router-dom';

const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));
import useMediaQuery from '../../utility/UseMediaQuery';

const RESPONSIBILITY_DATA = [
  {
    id: 1,
    icon: "quality", // Replace with specific icon names if available
    title: "Corporate Responsibility",
    description: "We are committed and responsible to build community-focused development."
  },
  {
    id: 2,
    icon: "quality", 
    title: "Security & Compliance",
    description: "We follow industry leading safety protocols and legal standards to deliver complete peace of mind."
  },
  {
    id: 3,
    icon: "quality",
    title: "Experts with Team Spirit",
    description: "Our skilled professionals create innovative, future-ready project solutions."
  },
  {
    id: 4,
    icon: "quality",
    title: "Diversity & Equity",
    description: "We ensure this with honest practices and complete professional integrity."
  }
];


const Card = memo(({ icon, title, description})=>(
  
  <div className='h-full border border-gray-400 rounded-3xl p-6 md:p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300 bg-white'>
    <div className='border-b-2 border-gray-100 pb-5'>
      <div className='size-20 md:size-24 aspect-square bg-gray-100 rounded-full flex items-center justify-center'>
        <img 
          src={getImageSvg(icon)} 
          className='size-12 md:size-16' 
          loading='lazy' 
          alt={`${title} icon`} 
        />
      </div>
    </div>
    <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>{title}</h2>
    <p className='leading-relaxed text-lg md:text-xl text-gray-600'>{description}</p>
  </div>
));


const About = () => {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  
  return (<>
    <section className='h-full w-full pb-8 lg:py-16'>
        <div className='sm:container mx-auto px-4'>

            <div className='grid grid-cols-11 gap-8 lg:gap-16'>

              <div className='col-span-11 xl:col-span-4'>

                <div id='serAbt' className='bg-[url("https://res.cloudinary.com/djw3rcz4j/image/upload/v1771931040/nlffeuijqshfiwel1tj9_dzarbk.webp")]
                h-[350px] lg:h-[450px] w-auto flex items-end rounded-3xl bg-cover bg-no-repeat bg-center xsl:bg-center' >
                  <div className='flex relative'>
                    <div className='curve size-10 -top-[29px] bg-white'></div>
                    <div className='h-16 w-56 rounded-tr-3xl bg-white'></div>
                    <div className='curve size-10 -bottom-[11px] -right-[40px] bg-white'></div>
                  </div>
                </div>

                <div className='pb-5 '>
                    <Marquee quotes={"our commitment"} />
                    <div className='pt-5 md:pt-8'></div>
                    <h1 className='text-4xl md:text-5xl'>Comprehensive Construction & Design Services Tailored to You</h1>
                </div>
               
                <Link to={"/about"} className='w-fit'>
                 <ButtonArrow text='Learn More' />
                </Link>
              </div>

              <div className='col-span-11 xl:col-span-7 xl:px-10  grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16'>
                {isMdUp?
                  (RESPONSIBILITY_DATA?.map(({icon, title, description}) => (
                      <Card key={title} title={title} icon={icon} description={description} />
                  )))
                : 
                  (<div className="py-5 pb-10 block md:hidden">
                    <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
                      <EmblaSlider
                        items={RESPONSIBILITY_DATA}
                        renderSlide={(item) =><Card key={item.title} icon={item.icon} title={item.title} description={item.description} />}
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
              </div>
            </div>

        </div>
    </section>
  </>);
};

export default About;