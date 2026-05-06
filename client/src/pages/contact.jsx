import React from 'react';
import Banner from '../components/common/Banner';
import Marquee from '../components/ui/marquee';
import ContactUs from '../components/home/ContactUs';
import { getImageSvg } from '../utility/getImage';
import CommonSEO from '../utility/commonSeo';
import ButtonArrow from '../components/ui/ButtonArrow';

const cards = [
  {img: "email", title: "Support email", text: "anushastructures02@gmail.com"},
  {img: "call", title: "Phone number", text: "+91 76959 50724"},
  {img: "location", title: "Location", text: "Chennai, Tamil Nadu"},
];

const contact = ({setOpenPop}) => {

  return (<>

    <CommonSEO
      title={`Contact Us | Construction in Chennai | Builders,interior design,renovation chennai`}  
    />

    <Banner title={"Contact Us"} link1={"/home"} text1={"home"} text2={"Contact Us"} />

    <section className='h-full w-full md:pt-16'>
      <div className='sm:container mx-auto px-4'>
    
        <div className='pb-10 flex flex-col items-center'>
          <Marquee quotes={"our Details"} />
          <div className='pt-10'></div>
          <h1 className='siteHeading text-3xl md:text-4xl lg:text-5xl font-semibold lg:w-2/3 text-center'>Contact Us for Residential and Commercial Construction Services in Chennai</h1>
        </div>
     
        <section className={`pb-10 xl:p-10 rounded-3xl`}>
          <div className='sm:container mx-auto px-4 sm:px-0'>
              <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 items-center`}>
                {cards.map(({img, title,text}, index)=>(
                  <div className="group relative h-[380px] rounded-sm p-1 shadow-2xl overflow-hidden">

                    <div className="relative h-full w-full p-10 flex flex-col justify-between border border-white/5">
                      
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="p-4 rounded-xl bg-a-royalsafforn/80 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                          <img src={getImageSvg(img)} className="size-8" alt={title} />
                        </div>
                        <span className="font-josefin text-sm font-bold tracking-widest text-orange-500/40 group-hover:text-orange-500">
                          EST. 2019
                        </span>
                      </div>

                      {/* Bottom Section */}
                      <div className="space-y-4">
                        <div className="overflow-hidden">
                          <h3 className="font-josefin text-2xl font-bold text-white uppercase tracking-tighter translate-y-0 group-hover:-translate-y-full transition-transform duration-500 py-1">
                            {title}
                          </h3>
                          <h3 className="font-josefin text-2xl font-bold text-orange-500 uppercase tracking-tighter translate-y-0 group-hover:-translate-y-full transition-transform duration-500 py-1">
                            {title}
                          </h3>
                        </div>
                        
                        <p className="w-full font-outfit text-xl leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-orange-500 transition-colors">
                          {(img == "email") ? <div className='w-fit flex flex-wrap'>
                            <span>anushastructures02</span>
                            <span>@gmail.com</span></div>
                            : text
                          }
                        </p>
                        
                        <div className="pt-4 flex items-center gap-4 text-[10px] font-black tracking-[0.4em]">
                          <div className="h-px text-black flex-1 bg-orange-500/50" />
                            Contact us
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

          <div className='pt-10 lg:pt-16 text-center'>
              <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
          </div>

          </div>
        </section>

      </div>
    </section>

    <ContactUs setOpenPop={setOpenPop} />

    <div className=''>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2901379309933!2d80.24521797359102!3d13.080789512478022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d9390dd78d%3A0x54e520bcc9b78b0b!2sAnusha%20structures%20private%20limited!5e0!3m2!1sen!2sin!4v1777988293338!5m2!1sen!2sin" className='w-full h-[600px]' allowfullscreen="" loading="lazy" title="Google Map showing Anusha Structures office location" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>


  </>);
};

export default contact;