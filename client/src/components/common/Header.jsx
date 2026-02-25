import React, {useState, memo} from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";

// utils
import { getImageSvg, getImagewebp } from "../../utility/getImage";
import Sidebar from './Sidebar';
import useMediaQuery from "../../utility/UseMediaQuery";

const Header = () => {

  const isSm = useMediaQuery("(min-width: 640px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  const navigate = useNavigate();

  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinkContent = [
    {name : "Home", link:"home"},
    {name : "About", link:"about"},
    {name : "Services", link:"services"},
    {name : "Projects", link:"projects"},
    // {name : "Floor Plans", link:"floorplans"},
    {name : "Cost Calculator", link:"estimator"},
  ];

  return (<>

   <div className="w-full bg-a-green text-white text-sm">
      <div className="container mx-auto flex items-center justify-between py-1 px-4">

        {/* LEFT SIDE — Phone & Email */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.21a1 1 0 011.01-.24 11.72 11.72 0 003.67.59 1 1 0 011 1v3.5a1 1 0 01-.92 1A18 18 0 013 5.92 1 1 0 014 5h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.67 1 1 0 01-.24 1.01l-2.23 2.11z"/>
            </svg>
            <a href="tel:+917695950724" className="hover:underline">+91 76959 50724</a>
          </div>

          {isSm && <div className="hidden sm:flex items-center gap-2">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 00-2 2v1l10 6 10-6V6a2 2 0 00-2-2zm0 5.33l-8.5 5.1a1 1 0 01-1 0L4 9.33V18a2 2 0 002 2h12a2 2 0 002-2V9.33z"/>
            </svg>
            <a href="mailto:anushastructures02@gmail.com" className="hover:underline">
              anushastructures02@gmail.com
            </a>
          </div>}
        </div>

        {/* RIGHT SIDE — Social Icons + Logo */}
        <div className="flex items-center gap-2">
          {/* Social Icons */}
          <a href="https://www.facebook.com/profile.php?id=61586192982422" target='_blank' className="group" aria-label="facebook">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className='group-hover:fill-a-royalsafforn'>
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/>
            </svg>
            <span className='hidden'>facebook</span>
          </a>

          <a href="https://www.instagram.com/anushastructures/" target='_blank' className="group" aria-label="instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"  className='group-hover:fill-a-royalsafforn' fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className='hidden'>facebook</span>
          </a>

        </div>
      </div>
    </div>

    <section id='navbar' className='bg-white'>
      <div id="navbarContainer" className='sm:container mx-auto px-4 relative z-10'>
        <div className='py-2 rounded-full flex items-center justify-between gap-5'>

          <div className='f-c-5 w-fit'>
            <div id='logoContainer'>
              <Link to={"/"}>
                <img src={getImagewebp("logo")} loading='eager' alt="logo"  
                  title="logo of anusha structures" id="logo" className='w-36 h-auto' 
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </Link>
            </div>

            {/* <nav className='hidden xl:flex space-x-4 2xl:space-x-8'>
              {navLinkContent.map((link)=>(
                <NavLink key={link.name} to={link.link} className={`capitalize navlinks font-normal! style-underline inline-block text-xl xl:text-base 2xl:text-xl px-3! py-3! 2xl:px-5!`}>
                  {link.name}
                </NavLink>
              ))}
            </nav> */}
          </div>

          <div className='f-c-5'>
                      
            {isMd && <div className='hidden md:flex justify-center items-center gap-1 font-bold font-outfit'>
              <span>Call Us : </span>
              <a href="tel:+917695950724" className='text-gray-600'> +91 76959 50724</a>
            </div>}

            {!isMd && 
              <button
                onClick={() =>window.open(
                      "https://api.whatsapp.com/send?phone=7695950724&text=Hi!%20Can%20I%20get%20more%20information%20on%20Construction?%20%23JYNQ0X",
                      "_blank",
                      "noopener,noreferrer",
                    )
                } 
                className={`bg-[#25D366] w-12 h-12 rounded-xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
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
            }

            {isSm && <button type='button' onClick={()=>navigate("/contact")} className='btn-pill bg-a-royalsafforn text-white hidden sm:inline-block'>Get in Touch</button>}
            {/* menubar */}
            <div className='p-3 md:p-4 cursor-pointer grid  place-items-center border rounded-2xl' onClick={()=>setOpenNavDrawer(()=>true)}>
              <button className='cursor-pointer'>
                <img src={getImageSvg("menubar")} className="size-6 object-contain rotate-z-90" 
                  loading='lazy' alt={`menubar icon`} 
                  title={`menubar icon for side bar`}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <Sidebar navLinkContent={navLinkContent} openNavDrawer={openNavDrawer} setOpenNavDrawer={setOpenNavDrawer} />

  </>);
};

export default memo(Header);