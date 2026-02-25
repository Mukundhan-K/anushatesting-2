import React, { memo, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { getImageSvg, getImagewebp } from "../../utility/getImage";
import IconBox from "./IconBox";

const Sidebar = ({ openNavDrawer, setOpenNavDrawer, navLinkContent }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenNavDrawer(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpenNavDrawer]);

  return (
    <>
      <div
        className={`w-full fixed inset-0 z-[15] bg-black/50 backdrop-blur-sm overflow-y-auto p-0!
            ${openNavDrawer ? "block" : "hidden"}
    `}
      >
        <div
          id="sidebar"
          ref={ref}
          className={`fixed top-0 left-0 h-full min-w-[260px] sm:w-1/2 md:w-2/5 lg:w-1/4 bg-white shadow-lg transform
                  transition-transform duration-300 flex flex-col z-50 ${openNavDrawer ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex justify-between px-4 py-2 shadow">
            <img
              src={getImagewebp("logo")}
              id="logo"
              className="w-36 h-auto"
              loading="lazy"
              alt={`anusha structures logo`}
              title={`logo of anusha structures`}
            />
            <button 
              onClick={() => setOpenNavDrawer(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={getImageSvg("cancel")} className='size-6 opacity-70' alt="close" />
            </button>
          </div>
          {/* Content Area */}
          <div className="p-4 h-full flex-1 flex flex-col overflow-y-auto">
            <nav className="h-fit flex flex-col py-5 pt-0 pb-1">
              {navLinkContent.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.link}
                  onClick={() => setOpenNavDrawer(false)}
                  className={({ isActive }) =>
                    `group relative px-5 py-3 rounded-r-xl font-medium text-base transition-all duration-300
                    ${
                      isActive
                        ? "text-gray-700 bg-gray-200 pl-7"
                        : "text-gray-700 hover:bg-gray-200 hover:pl-7"
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute left-0 top-0 h-full w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform origin-top rounded-l-full"></span>
                </NavLink>
              ))}

            <NavLink
              to="/contact"
              onClick={() => setOpenNavDrawer(false)}
              className=" mt-2 px-4 py-3 rounded-xl text-lg font-semibold transition-all bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg"
            >
              Contact Us
            </NavLink>
            </nav>

            <div className="h-fit w-full flex flex-col justify-between lg:items-start gap-5 py-5">
              {/* Contact Card */}
                <div className='space-y-4'>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg className="w-4 h-4 text-a-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                    <span className='text-sm font-medium text-gray-700'>+91 76959 50724</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg className="w-4 h-4 text-a-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span className='text-xs font-medium text-gray-700 break-all'>anushastructures02@gmail.com</span>
                  </div>
                </div>

                  <IconBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
