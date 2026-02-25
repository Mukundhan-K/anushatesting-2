import React from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import { getImagewebp } from '../../utility/getImage';

const image = [
    {img:"sbi"},
    {img:"indian"},
    {img:"iob"},
    {img:"hdfc"},
    {img:"icic"},
    {img:"bajaj"},
];


const BankingPatners = ({patner}) => {
  // const Data = (Patner == "Bank") ? image : ;

  return (<>
    <section className='h-full w-full py-5 pb-10 md:py-10'>
      <div className='sm:container mx-auto px-4'>
        <div className='md:pb-10 flex flex-col justify-center items-center'>
            <Marquee quotes={"home loans"} />
            <div className='pt-10'></div>
            <Heading text={"Our Banking Partners"} />
            <p className="max-w-2xl pb-8 text-center text-lg leading-8 text-gray-600">Helping customers get easy access of home construction loans</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5'>
            {image.map(({img}, i)=>(
                <div key={i} className='border border-gray-400 rounded-3xl overflow-hidden'>
                    <img src={getImagewebp(`banks/${img}`)} className='block w-full h-full' loading='lazy'
                      alt={`${img} icon`} title={`icon of ${img}`}
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                </div>
              )
            )}
        </div>

        {/* <div className="mt-5 lg:mt-20 grid grid-cols-3 lg:grid-cols-5 border-t border-l border-gray-200 rounded-3xl overflow-hidden">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 border-b border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <img 
                src={getImagewebp(`ourprocess/${index + 1}`)} 
                className='w-24 lg:w-32 grayscale-0 hover:grayscale transition-all duration-300' 
                loading='lazy' 
                alt={`Process step ${index + 1}`} 
              />
            </div>
          ))}
        </div> */}

      </div>
    </section>
  </>);
};

export default BankingPatners;