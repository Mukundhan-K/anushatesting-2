import React from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import { getColdwebp, getImageSvg } from '../../utility/getImage';
import ButtonArrow from '../ui/ButtonArrow';
import WhyChooseUs from './WhyChooseUs';
import { Link } from 'react-router-dom';

  const icons = [
    {icon: "our-journey-icon-4", text:"enterprise"},
    {icon: "our-journey-icon-2", text:"office"},
    {icon: "our-journey-icon-1", text:"business"},
    {icon: "our-journey-icon-3", text:"Interior"},
  ];

const OurJourney = ({tit, img}) => {

  return (<>
    <section id='ourJourney' className=' h-full w-full'>
      <div className='sm:container mx-auto pb-0 md:pb-10 py-10 px-4 lg:py-20 flex flex-col xl:flex-row gap-6 md:gap-14 xl:gap-20'>

        <div className='xl:w-1/3 flex flex-col gap-5 xl:gap-20'>
          <Marquee quotes={"About Us"} color="black" />

          <div id='ourJour' style={{backgroundImage: `url(${getColdwebp(img[0])})`}}
          className={`h-[500px] p-8 shadow-sm rounded-3xl flex bg-cover bg-center bg-no-repeat`}>
            <div className='h-fit flex justify-end items-end'>
              <div className='h-fit w-fit bg-a-green p-5 text-center rounded-3xl'>
                <div className='text-5xl font-josefin text-a-royalsafforn'>15+</div>
                <div className='capitalize text-sm text-white'>active projects</div>
              </div>
            </div>
          </div>

        </div>

        <div className='h-full xl:w-2/3 flex flex-col gap-5 justify-between'>
          <Heading align='left' text={`Anusha Structures your Trusted ${tit} Construction Builder`} />

          <div className='flex flex-col md:flex-row gap-5 lg:gap-10 2xl:pt-10'>

           <img src={getColdwebp(img[1])} loading='lazy' alt="anusha constructions interior" title='interior design of anusha structures'
             className='object-cover! hidden md:block w-full! md:w-1/3! h-[200px] md:h-auto self-end rounded-3xl' />
            
            <div className='2xl:pl-8 md:pt-10 h-full flex flex-col justify-between gap-8'>
              <p className='text-base lg:text-xl text-gray-600 font-normal font-outfit'>We are turnkey construction experts with a skilled team of architects, engineers, designers, and craftsmen dedicated to creating durable structures and elegant spaces. With a focus on detail and innovation, we seamlessly combine functionality and aesthetics in every project.</p>
             
              <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-5 xl:gap-8'>
                {icons.map(({icon, text})=>(
                    <div key={text} className='flex gap-3 items-center'>
                      <img src={getImageSvg(icon)} alt={`icon ${text}`} className='size-10' loading='lazy' title={`icon ${text}`}  />
                      <span className='text-2xl font-josefin font-semibold capitalize'>{text}</span>
                    </div>
                  )
                )}
              </div>

              <Link to={"/projects"} className='w-fit'>
                <ButtonArrow text='Explore All' />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>    
  </>);
};

export default OurJourney;