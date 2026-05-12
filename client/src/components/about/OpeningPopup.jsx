import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../common/CommonForm';

const OpeningPopup = () => {

  const [formData, setFormData] = useState({});


 const registeredFormControl = [
    {
      name : "name",
      placeholder : "Enter your Name",
      componentType : "input",
      type : "text",
      icon : "user"
    },
    {
      name : "email",
      placeholder : "Enter your Email",
      componentType : "input",
      type : "email",
      icon : "email"
    },
    {
      name : "phone",
      placeholder : "Enter your Number",
      componentType : "input",
      type : "tel",
      icon : "call"
    },
    {
      name : "location",
      placeholder : "Enter your Plot location",
      componentType : "input",
      type : "text",
      icon : "location-house"
    }
  ];

  return (
    // <div className='h-full w-full flex flex-col md:flex-row gap-5'>
    //   <div className='min-h-full! w-full rounded-2xl bg-center bg-cover bg-no-repeat' style={{backgroundImage : `url(https://res.cloudinary.com/djw3rcz4j/image/upload/v1771931040/nlffeuijqshfiwel1tj9_dzarbk.webp)`}}>
    //     <div className='min-h-[200px]'></div>
    //   </div>

    //   <div className='h-full w-full'>
    //     <div className="py-4 mb-8 border-b border-gray-300 text-center">
    //         <h2 className="font-semibold text-xl font-outfit text-left">Expert Construction Solutions at the Right Price.</h2>
    //     </div>

    //     <CommonForm
    //         formControls={registeredFormControl}
    //         formData={formData}
    //         setFormData={setFormData}
    //         defaultOnSubmit={true}
    //         btnclass={"pt-5 justify-center"}
    //         formClass={`grid grid-cols-1 gap-3`}
    //         buttonText={"Book Free Consultation"}
    //         btntype='submit'
    //     />

    //     <p className="py-3 text-xs text-gray-500">
    //         * By submitting this form, I confirm that I have read and agreed to accept Anusha's 
    //         <Link to={"/privacy-policy"} className="text-a-royalsafforn">&nbsp; &nbsp; Privacy Policy</Link>
    //     </p>
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row w-full bg-white relative min-h-fit">
      
      {/* --- Left/Top Image Section --- */}
      <div 
        className="w-full md:w-7/12 h-[260px] md:h-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://res.cloudinary.com/djw3rcz4j/image/upload/v1771931040/nlffeuijqshfiwel1tj9_dzarbk.webp)` }}
      >
        {/* Empty div to maintain height on mobile */}
        <div className="md:hidden h-full w-full"></div>
      </div>

      {/* --- Right/Bottom Form Section --- */}
      {/* Design Secret: 
          -mt-16 (mobile) and md:-ml-16 (desktop) pulls this div over the image.
          rounded-tl creates the sweeping curve effect from the screenshot.
      */}
      <div className="w-full md:w-7/12 bg-white relative z-10 
                      rounded-tl-[3.5rem] md:rounded-tl-[5rem] 
                      -mt-16 md:mt-0 md:-ml-20 
                      p-8 md:p-12 lg:p-14 
                      flex flex-col justify-center shadow-[-20px_0_30px_-15px_rgba(0,0,0,0.1)] md:shadow-none">
        
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight pr-4">
            Request Your Free Quote Today
          </h2>
        </div>

        {/* Your Existing Functionality preserved */}
        <CommonForm
          formControls={registeredFormControl}
          formData={formData}
          setFormData={setFormData}
          defaultOnSubmit={true}
          btnclass={"pt-4 justify-center"}
          formClass={`grid grid-cols-1 gap-4`} 
          buttonText={"Book FREE Consultation"}
          btntype='submit'
        />

        <p className="mt-3 py-3 text-xs text-gray-500">
          * By submitting this form, I confirm that I have read and agreed to accept Anusha's 
          <Link to={"/privacy-policy"} className="text-a-royalsafforn">&nbsp; &nbsp; Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
};

export default OpeningPopup;