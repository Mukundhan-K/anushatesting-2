import React, { useState } from 'react'
import Marquee from './marquee';
import Heading from "../common/Heading";
import { getImageSvg, getImagewebp } from '../../utility/getImage';
import ButtonArrow from './ButtonArrow';
import { Link } from 'react-router-dom';

const panels = [
  { title: "Srm Hospital", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930228/n7ky9xds6ac9skdlzlwl_qakitu.webp" },                    
  { title: "Quest Cafe", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771933070/18_om0mvt.webp" },                    
  { title: "Om vinayaka Hostel", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930853/mfbxqixvpeydanarf5sw_ef7ktl.webp" },                    
  { title: "Library", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930956/um78aqawgkkbyqakxks2_bnfxy5.webp" },                    
  { title: "Office Interior", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771931760/vh3lhvc8twe2r1g8simf_tnqgio.webp" },                    
  { title: "Office Interior 2", loc : "Chennai", image: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771931755/ebvjfod0qj5nygkibldm_xl9gpu.webp" },                    
];

function ExpandableGallery() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleClick = (index) => {
    setExpandedIndex(index);
  };

  return (<>
    <section className='h-full w-full py-8 lg:py-16 bg-bg-brown'>
      <div className='sm:container mx-auto px-4'>

        <div className='pb-5 md:pb-12'>
          <Marquee quotes={"our projects"} />
          <div className='pt-5 md:pt-8'></div>
          <div className="xl:w-[800px]">
            <Heading text={"Elevate your lifestyle with affordable luxury homes."} align='left' />
          </div>
        </div>

       <div className="h-full w-full overflow-hidden flex items-center justify-center relative" >
         <div className="flex w-full flex-col sm:flex-row sm:h-[80vh] gap-2 items-center justify-center z-10">
            {panels.map(({image, loc, title}, index) => (
            <div
                key={index}
                onMouseOver={() => handleClick(index)}
                className={`
                 rounded-3xl bg-white cursor-pointer
                transition-all duration-500 overflow-hidden
                ${expandedIndex === index ? 'h-[300px] sm:h-full w-full sm:w-[60%]' : 'h-[75px] sm:h-full w-full sm:w-[16.6%]'}
                min-w-[40px] block bg-cover bg-bottom-right
                `}
                style={{backgroundImage : `url(${image})`,backgroundColor: "#0009", backgroundBlendMode: "multiply"}}
            >                
                <div className={`h-full p-5 md:p-12 flex flex-col justify-end gap-4`}>
                    { (expandedIndex == index) && <>
                        <div className='flex flex-col md:flex-row gap-2 md:items-end border-b-2 pb-4 border-gray-400'>
                            <div className='size-9 rounded-full bg-a-royalsafforn aspect-square grid place-items-center'>
                                <img src={getImageSvg("location")} className='size-7' loading='lazy' alt={`location icon`} title={`icon of location`}  />
                            </div>
                            <span className='text-white text-xl'>{loc}</span>
                        </div>

                        <h3 className={`text-2xl lg:text-4xl text-white`}>{title}</h3>
                    </>}
          
                    {(expandedIndex != index) &&<h3 className="text-2xl lg:text-4xl -mb-3 md:mb-0 text-white inline-block text-nowrap sm:text-orientation-mixed sm:writing-mode sm:rotate-270">{title}</h3>}
                </div>

            </div>
            ))}
         </div>
       </div>

        <div className='pt-10 lg:pt-16 text-center'>
          <Link to={"/projects"} className='w-fit'>
            <ButtonArrow text='View All' />
          </Link>
        </div>


      </div>
    </section>
  </>  )
}

export default ExpandableGallery;