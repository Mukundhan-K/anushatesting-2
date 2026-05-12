import React, {memo} from 'react';
import FooterComponent from './FooterComponent';
import CallToAction from "./Cta"

import { useLocation } from "react-router-dom";

const Footer = ({setOpenPop}) => {
  
  const location = useLocation();

  return (<>

    {((location.pathname == "/contact")||(location.pathname == "/privacy-policy")) ?
        <div className={`w-full h-20 rounded-b-[100px] relative z-10 bg-bg-brown`}> </div>
      :
        <CallToAction setOpenPop={setOpenPop} />
    }

    <section id='footer' className='h-full w-full pt-32 md:pt-44 pb-16 -mt-20 bg-cover bg-no-repeat 
      bg-[url("https://res.cloudinary.com/djw3rcz4j/image/upload/v1771935873/footer-1_dmn1c9.webp")]
    ' style={{backgroundColor: "#0009", backgroundBlendMode: "multiply"}}>

      <div className='container mx-auto px-4 sm:px-0'>

        <div className='flex flex-col justify-center items-center gap-5'>
          <h2 className='text-5xl sm:text6xl lg:text-8xl  xl:w-1/2 text-white text-center'>Your dream home awaits</h2>
          <p className="lg:max-w-2xl pb-2 text-center text-2xl leading-8 text-white">We don’t just construct spaces 🏠. we create destinations where dreams live 👨‍👩‍👧‍👦.</p>
        </div>

        <div className='text-center overflow-hidden -mb-5 xsl:-mb-12 lg:-mb-28'>
          <h3 className="font-extrabold text-transparent text-7xl xsl:text-9xl sm:text-[150px] lg:text-[300px] bg-clip-text bg-gradient-to-b from-white/85 to-black/85">
            Anusha
          </h3>
        </div>

        <FooterComponent />
      </div>
    </section>
  </>);
};

export default memo(Footer);