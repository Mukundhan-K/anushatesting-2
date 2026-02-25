import React from 'react';

import Marquee from '../ui/marquee';
import ButtonArrow from '../ui/ButtonArrow';
import ContactForm from '../common/ContactForm';

const ContactUs = ({setOpenPop}) => {

  return (<>
    <section className='h-full w-full bg-bg-brown'>
      <div className='sm:container mx-auto py-8 lg:py-16 px-4'>
        <div className='pt-5 flex flex-col flex-col lg:flex-row justify-center gap-5'>

          <div className='w-full lg:w-1/2 rounded-3xl px-5 lg:py-10 '>
            <Marquee quotes={"Enuire us"} />
            <h3 className="py-5 text-4xl" >We're Ready to Help You Anytime</h3>
            <p className="max-w-2xl pb-8 text-lg leading-8 text-gray-600">Our team is always ready to support you at every stage of your project. We’re here to make your entire journey smooth, simple, and stress-free.</p>
            <img src={"https://res.cloudinary.com/djw3rcz4j/image/upload/v1771937862/Contact-us-img_hg0fq5.webp"} loading='lazy' alt={`anusha structures building`} 
              title={`building of anusha structures`}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>

          <div className='homeContact w-full lg:w-1/2 h-fit p-8 lg:p-16 flex flex-col justify-center gap-10 bg-white shadow-sm rounded-3xl relative '>
            <div className='flex flex-col gap-5 relative'>
                <Marquee quotes={"Contact from"} />
                <h3 className="text-4xl" >Ask Us Anything!</h3>
            </div>
            <ContactForm />
          </div>

        </div>

        <div className='text-center pt-5 xl:mt-0'>
          <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
        </div>

      </div>
    </section>
  </>);
};

export default ContactUs;