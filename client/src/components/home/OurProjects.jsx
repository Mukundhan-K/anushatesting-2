import React, {lazy, Suspense} from 'react';
import { getImageSvg, getImagewebp } from '../../utility/getImage';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';

import { Link } from "react-router-dom";
import ButtonArrow from '../ui/ButtonArrow';
import useMediaQuery from '../../utility/UseMediaQuery';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));

const images = [
  {text:"Modern Interior Design", subtext:"chennai", pintext:"Modern Design 1",
    img: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930227/cvzsmrfapxk6dprakion_keooze.webp"
  },
  {text:"Designing Urban Living", subtext:"chennai", pintext:"Modern Design 2",
    img: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930959/zsj3cf0yb7ekka5udyrz_lduolr.webp"
  },
  {text:"Smart Study Halls", subtext:"chennai", pintext:"Modular Architecture 1", 
    img: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930855/vwsrrfih0hhbzbbajvs9_yhlsui.webp"
  },
  {text:"A Café Construction Journey", subtext:"chennai", pintext:"Modular Architecture 2",
    img: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771933070/18_om0mvt.webp"
  },
];

const Card = ({item:{img, text,subtext, pintext}})=>{  
  return (
    <div key={text} className='md:even:pt-10 pb-5 md:pb-0 group transition duration-500'>
      <div className='p-4 -mb-16 flex justify-end'>
          <div className='bg-a-royalsafforn rounded-full px-3 py-1 font-medium text-white'>{pintext}</div>
      </div>
      <div id='ourProj' className='rounded-3xl h-[300px] bg-cover bg-center' style={{backgroundImage : `url(${img})`}}>
          <Link to={"/projects"} className='h-full w-full pt-10 group-hover:bg-[#0008] rounded-3xl hidden transition duration-500 group-hover:flex flex-col gap-3 justify-center items-center'>
              <div className='size-16 aspect-square bg-a-royalsafforn rounded-full grid place-items-center'>
                  <img src={getImageSvg("arrow-black")} className="size-10 rotate-180" loading='lazy' alt={`arrow icon`} title={`icon of arrow`} />
              </div>
              <div className='text-xl text-white'>View More</div>
          </Link>
      </div>
      <div className='pt-5 flex flex-col md:flex-row md:items-center gap-5'>
          <h3 className='text-3xl'>{text}</h3>
          <span className='capitalize text-gray-500'>- {subtext}</span>
      </div>
    </div>
  );
};

const OurProjects = () => {
  const isMdDwn = useMediaQuery("(max-width: 768px)");

  return (<>
    <section className='h-full w-full py-8 lg:py-16'>
      <div className='sm:container mx-auto px-4'>
        <div className='pb-5 lg:pb-16 flex flex-col justify-center items-center'>
            <Marquee quotes={"our projects"} />
            <div className='pt-5 md:pt-8'></div>
            <Heading text={"Our Journey Through Design"} />
        </div>

        {!isMdDwn ?
          (<div className='grid xsl:grid-cols-2 gap-x-16 gap-y-3'>
            {images.map((item, i)=>(
              <Card key={i} item={item} />
            ))}
          </div>)
        :
         (<Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
            <EmblaSlider
              items={images}
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
              }}
              viewportPadding='p-2'
              gap={20}
            />
          </Suspense>)
        }
        
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