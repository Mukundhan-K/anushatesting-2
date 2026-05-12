import React, { useCallback, memo } from 'react'
import { getImagewebp } from '../../utility/getImage'
import { NavLink } from 'react-router-dom'
import IconBox from './IconBox'

const FooterComponent = () => {

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (<>
    <div className='px-8 py-12 bg-white rounded-4xl'>
      <div className='grid grid-cols-12'>

        <div className='col-span-12 xl:col-span-3 w-full xl:pr-4 pb-4 mb-4 md:pb-8 md:mb-8 xl:pb-0 xl:mb-0 border-b border-b-gray-300 xl:border-b-0 xl:border-r xl:border-r-gray-300  flex flex-col justify-between gap-5'>
          <div className='w-50 xl:w-4/5'>
            <img src={getImagewebp("logo")} className='' loading='lazy' alt={`anusha structures logo`}
              title={`logo of anusha structures`}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>

          <p className='text-xl text-gray-500 leading-8'>Every brick we lay is a promise of trust, quality, and a future built to last. Because Your vision is our blueprint. Your trust is our foundation</p>
          {/* <ButtonArrow text='Be our next Client' /> */}

        </div>

        <div className='col-span-12 lg:col-span-7 xl:col-span-5 lg:pr-5 xl:px-8 lg:border-r lg:border-r-gray-300 flex flex-col sm:flex-row gap-5 justify-between'>
          <div className='flex flex-col justify-between gap-5'>
            <h4 className='text-2xl'>Links</h4>
            <NavLink to={"/"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>Home</NavLink>
            <NavLink to={"/about"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>About Us</NavLink>
            <NavLink to={"/projects"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>Projects</NavLink>
            <NavLink to={"/services"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>Services</NavLink>
            <NavLink to={"/contact"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>Contact</NavLink>
            <NavLink to={"/blogs"} onClick={() => scrollToTop()} className={"text-xl font font-outfit"}>Blogs</NavLink>
          </div>

          <div className=''>
            <h5 className='text-2xl'>Business Hours</h5>
            <div className='flex gap-3 font-medium text-xl pt-5'>
              <div>Mon to Fri :</div> <div>09 Am - 06 Pm</div>
            </div>
            <div className='flex gap-3 font-medium text-xl pt-2'>
              <div>Saturday :</div> <div>09 Am - 06 Pm</div>
            </div>
            <div className='flex gap-3 font-medium text-xl pt-2'>
              <div>Sunday :</div> <div> By Appointment</div>
            </div>
          </div>
        </div>

        <div className='col-span-12 lg:col-span-5 xl:col-span-4 pt-3 md:pt-8 mt-3 md:mt-8 lg:pt-0 lg:mt-0 border-t border-t-gray-300 lg:border-0 flex flex-col justify-between items-center lg:items-start gap-5 lg:pl-8'>
          <div className='w-full flex flex-col items-center lg:block'>
            <h3 className='w-full md:w-fit text-2xl md:text-4xl border-b border-gray-400 pb-1'>+91 76959 50724</h3>
            <h3 className='w-full md:w-fit text-xl md:text-2xl border-b border-gray-400 pt-4 pb-1 flex flex-row flex-wrap'><span>anushastructures02</span><span>@gmail.com</span></h3>
          </div>

          <div className='w-[70%]'>
            <IconBox />
          </div>

        </div>
      </div>

      <div className='pt-5 lg:pt-12 mt-5 lg:mt-14 border-t border-gray-300 text-xl font-semibold text-center'>
        © 2025 <span className='font-medium text-2xl text-a-green'>Anusha Structures</span> . All Rights Reserved
      </div>
    </div>
  </>)
}

export default memo(FooterComponent);