// import React,{useState, useEffect} from "react";
// import CommonForm from "./CommonForm";
// import { Link } from "react-router-dom";
// import { getImageSvg } from "../../utility/getImage";

// const Popup = ({ isOpen, onClose, title, children, otrcss, width }) => {

//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//       if (isOpen) {
//         document.body.style.overflow = "hidden"; // disable scroll
//       } else {
//         document.body.style.overflow = "auto"; // enable scroll again
//       }
//       return () => {
//         document.body.style.overflow = "auto";
//       };
//     }, [isOpen]);
    
//   if (!isOpen) return null;

//   const registeredFormControl = [
//     {
//       name : "name",
//       placeholder : "Enter your Name",
//       componentType : "input",
//       type : "text",
//       icon : "user"
//     },
//     {
//       name : "email",
//       placeholder : "Enter your Email",
//       componentType : "input",
//       type : "email",
//       icon : "email"
//     },
//     {
//       name : "phone",
//       placeholder : "Enter your Number",
//       componentType : "input",
//       type : "tel",
//       icon : "call"
//     },
//     {
//       name : "location",
//       placeholder : "Enter your Plot location",
//       componentType : "input",
//       type : "text",
//       icon : "location-house"
//     }
//   ];


//   return (
//     <div
//       className="fixed inset-0 z-[5555] bg-black/50 backdrop-blur-sm overflow-y-auto p-4"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//         className={`relative bg-white rounded-2xl shadow-lg w-full ${width ? width : 'max-w-[600px]'} mx-auto my-10 p-6  ${otrcss ? otrcss : 'lg:py-8 lg:px-12'}`}
//        >
//         {/* Close Icon */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-7 text-gray-500 text-3xl hover:text-gray-700"
//         >
//           ✕
//         </button>

//         {children ? <>
//           {/* Content */}
//           {children}
//         </> : <>

//             <div className="py-4 mb-8 border-b border-gray-300 text-center">
//               <h2 className="font-semibold text-3xl pb-2 font-outfit">Book Free Appointment</h2>
//               <p>Expert Construction Solutions by Anusha at the Right Price.</p>
//             </div>

//             <CommonForm
//                 formControls={registeredFormControl}
//                 formData={formData}
//                 setFormData={setFormData}
//                 defaultOnSubmit={true}
//                 btnclass={"pt-8 justify-center"}
//                 formClass={`grid grid-cols-1 gap-5`}
//                 buttonText={"Start your Construction"}
//                 btntype='submit'
//             />

//             <p className="py-3 text-xs text-gray-500">
//                 * By submitting this form, I confirm that I have read and agreed to accept Anusha's 
//                 <Link to={"/privacy-policy"} className="text-a-royalsafforn">&nbsp; &nbsp; Privacy Policy</Link>
//             </p>

//             <div className="pt-8 grid grid-cols-3 gap-5 justify-between">
//                 <div className="text-center">
//                   <img src={getImageSvg("builder_3")}  className='size-20 justify-self-center' 
//                        loading='lazy' alt={`building icon`} title={`icon of building`}
//                        onContextMenu={(e) => e.preventDefault()}
//                        draggable={false}
//                   />
//                   <div className="">
//                     <span className="font-semibold">100+</span>
//                     <span> Built</span>
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <img src={getImageSvg("certified")}  className='size-20 justify-self-center' loading='lazy' alt={`certified icon`} title={`icon of certified`} />
//                   <div className="">
//                     <span className="font-semibold">Gov</span>
//                     <span> Certified</span>
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <img src={getImageSvg("rupee-2")}  className='size-20 justify-self-center' loading='lazy' alt={`rupee icon`} title={`icon of rupee`} />
//                   <div className="">
//                     <span className="font-semibold">₹</span>
//                     <span>  Safety</span>
//                   </div>
//                 </div>
//             </div>
//         </>
//         }

//       </div>
//     </div>
//   );
// };

// export default Popup;


import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import CommonForm from "./CommonForm";
import { getImageSvg } from "../../utility/getImage";

// Move static data outside to prevent unnecessary re-renders
const REGISTERED_FORM_CONTROL = [
  { name: "name", placeholder: "Enter your Name", componentType: "input", type: "text", icon: "user" },
  { name: "email", placeholder: "Enter your Email", componentType: "input", type: "email", icon: "email" },
  { name: "phone", placeholder: "Enter your Number", componentType: "input", type: "tel", icon: "call" },
  { name: "location", placeholder: "Enter your Plot location", componentType: "input", type: "text", icon: "location-house" }
];

const Popup = ({ isOpen, onClose, title, children, otrcss, width }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      
      // Cleanup function ensures scroll is restored even if component unmounts unexpectedly
      return () => {
        document.body.style.overflow = originalStyle || "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[5555] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl w-full 
          ${width ? width : 'max-w-[600px]'} 
          my-auto min-h-fit 
          transition-all duration-300 transform
          ${otrcss ? otrcss : 'p-6 lg:py-10 lg:px-12'}`}
      >
        {/* Close Icon - Improved hit area for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <span className="text-2xl leading-none">✕</span>
        </button>

        {children ? (
          <div className="w-full">{children}</div>
        ) : (
          <>
            <div className="pt-4 pb-6 mb-6 border-b border-gray-100 text-center">
              <h2 className="font-semibold text-2xl md:text-3xl pb-2 font-outfit text-gray-800">
                {title || "Book Free Appointment"}
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Expert Construction Solutions at the Right Price.
              </p>
            </div>

            <CommonForm
              formControls={REGISTERED_FORM_CONTROL}
              formData={formData}
              setFormData={setFormData}
              defaultOnSubmit={true}
              btnclass="pt-6 justify-center"
              formClass="grid grid-cols-1 gap-4 md:gap-5"
              buttonText="Start your Construction"
              btntype="submit"
            />

            <p className="mt-4 text-[10px] md:text-xs text-gray-400 text-center md:text-left">
              * By submitting this form, I confirm that I have read and agreed to accept 
              <Link to="/privacy-policy" className="text-a-royalsafforn font-medium hover:underline">
                &nbsp;Privacy Policy
              </Link>
            </p>

            {/* Trust Badges - Improved responsiveness */}
            <div className="mt-8 pt-8 border-t border-gray-50 flex flex-wrap justify-around gap-4 md:grid md:grid-cols-3">
              <Badge icon="builder_3" count="100+" label="Built" />
              <Badge icon="certified" count="Gov" label="Certified" />
              <Badge icon="rupee-2" count="₹" label="Safety" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Sub-component for cleaner code
const Badge = ({ icon, count, label }) => (
  <div className="flex flex-col items-center text-center min-w-[80px]">
    <img 
      src={getImageSvg(icon)} 
      className="w-12 h-12 md:w-16 md:h-16 mb-2 object-contain" 
      loading="lazy" 
      alt={label} 
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
    <div className="text-sm md:text-base">
      <span className="font-bold text-gray-800">{count}</span>
      <span className="text-gray-600 text-sm"> {label}</span>
    </div>
  </div>
);

export default Popup;