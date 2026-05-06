import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Popup from '../common/Popup';
import { getImageSvg } from '../../utility/getImage';
import useMediaQuery from '../../utility/UseMediaQuery';

const BackToTopButton = ({openPop, setOpenPop}) => {

  const navigate = useNavigate();
  const isSmDwn = useMediaQuery("(max-width: 640px)");
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Adjust scroll threshold as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

   // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleButtonClick = useCallback(() => {
    window.open( // Redirect to an external URL
      'https://api.whatsapp.com/send?phone=7695950724&text=Hi!%20Can%20I%20get%20more%20information%20on%20Construction', 
      '_blank', 
      'noopener,noreferrer'
    )
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
    <button id="whatsBtn" className={`fixed! ${(window.scrollY > 300) ? 'bottom-54 md:bottom-38' : 'bottom-40 md:bottom-20'} right-5`}
              onClick={handleButtonClick}
    >
        <div className="sign">
            <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
            <path
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
            ></path>
            </svg>
        </div>

        <div className="text">Whatsapp</div>
    </button>

    {isVisible && (
      <button
        onClick={scrollToTop}
        id='backtotop'
        className={`fixed! ${(window.scrollY > 300) ? 'bottom-40 md:bottom-20' : 'bottom-10'} right-5 text-xl`}
        aria-label='back to top button'
      >
          <svg className="svgIcon" viewBox="0 0 384 512">
              <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
              ></path>
          </svg>

          <div className="hidden">Whatsapp</div>
      </button>
    )}

    {/* fixed mobile footer */}
      {(isVisible && isSmDwn) && (
        // <div className='w-full bg-a-royalsafforn fixed! bottom-0 left-0 right-0 z-50' onClick={() => setOpenPop(true)}>
        //   <Link className='w-full px-10 py-2! inline-block text-white font-outfit! text-2xl text-center font-medium'>
        //     Start Construction
        //   </Link>
        // </div>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white text-gray-800 border-t flex justify-around items-center py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[14]">
          <NavItem icon="loan" label="Home" link="/" />
          <NavItem icon="our-journey-icon-3" label="Projects" link="/projects" />
          <div className="relative   border-4 border-a-royalsafforn">
            <button
              onClick={() => handleButtonClick(
                "https://api.whatsapp.com/send?phone=7695950724&text=Hi!%20Can%20I%20get%20more%20information%20on%20Construction?%20%23JYNQ0X",
              )
              }
              className={`absolute -top-12 -left-8 bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Use your existing SVGs here */}
              <div className="text-white scale-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  className="h-10 w-10 text-white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.4145 14.3822C17.1173 14.2334 15.6564 13.5147 15.384 13.4153C15.1117 13.3162 14.9136 13.2667 14.7154 13.5641C14.5173 13.8615 13.9478 14.5309 13.7745 14.7293C13.6012 14.9275 13.4278 14.9524 13.1307 14.8036C12.8335 14.6549 11.876 14.3411 10.7411 13.3287C9.85769 12.5407 9.26129 11.5677 9.08799 11.2702C8.91461 10.9727 9.06943 10.8119 9.21822 10.6637C9.35195 10.5306 9.51546 10.3166 9.66399 10.1431C9.81257 9.96961 9.86209 9.84558 9.96114 9.6474C10.0602 9.44899 10.0107 9.27553 9.93634 9.12682C9.86209 8.97808 9.26779 7.51537 9.02016 6.92034C8.77895 6.34096 8.53397 6.41944 8.35157 6.41024C8.17844 6.40165 7.98013 6.39981 7.78207 6.39981C7.58397 6.39981 7.26201 6.47418 6.98958 6.77159C6.71727 7.06908 5.94959 7.78806 5.94959 9.25059C5.94959 10.7133 7.01434 12.1263 7.16296 12.3246C7.31158 12.523 9.25829 15.5244 12.2393 16.8116C12.9482 17.1178 13.5017 17.3006 13.9333 17.4375C14.6451 17.6637 15.2929 17.6318 15.805 17.5552C16.3759 17.47 17.5631 16.8364 17.8107 16.1424C18.0583 15.4481 18.0583 14.8532 17.984 14.7293C17.9097 14.6053 17.7116 14.5309 17.4145 14.3822ZM11.9925 21.7853H11.9886C10.2148 21.7846 8.47517 21.3081 6.9575 20.4075L6.59654 20.1932L2.85541 21.1746L3.85395 17.527L3.61899 17.153C2.62951 15.5792 2.10688 13.7603 2.10765 11.8925C2.10983 6.44257 6.54415 2.0086 11.9965 2.0086C14.6367 2.00954 17.1185 3.03905 18.9849 4.9075C20.8511 6.77582 21.8782 9.25932 21.8772 11.9005C21.875 17.3509 17.4408 21.7853 11.9925 21.7853ZM20.4052 3.48773C18.1599 1.2398 15.1739 0.00128304 11.9925 0C5.43736 0 0.102301 5.33471 0.0996495 11.8918C0.0987941 13.9879 0.646396 16.0337 1.68711 17.8373L0 24L6.30443 22.3462C8.04154 23.2937 9.99728 23.7931 11.9877 23.7937H11.9926C18.547 23.7937 23.8825 18.4585 23.8852 11.9013C23.8864 8.72361 22.6505 5.73566 20.4052 3.48777"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </button>
          </div>
          <NavItem icon="call" label="Contact" link="/contact" />
          <NavItem icon="user" label="About"link="/about" />
        </div>
      )}

    </>
  );
};

export default BackToTopButton;

const NavItem = ({ icon, label, link }) => (
  <Link
    key={label}
    to={link}
    className="flex flex-col items-center gap-1 cursor-pointer"
    onClick={() => scrollToTop()}
  >
    <img src={getImageSvg(icon)} className="size-6" />
    <span className="text-xs sm:text-base font-medium">{label}</span>
  </Link>
);