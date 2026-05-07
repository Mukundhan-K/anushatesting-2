import React, {useState} from 'react';
import Marquee from '../ui/marquee';
import { getImagewebp } from '../../utility/getImage';
import CommonForm from '../common/CommonForm';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../utility/UseMediaQuery';

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

const AppointmentForm = ({ formData, setFormData, isMobile = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg w-full p-6 mx-auto ${isMobile ? 'max-w-[500px]' : 'max-w-[400px]'}`}>
    <div className="py-4 mb-3 border-b border-gray-300 text-center">
      <h2 className="font-semibold text-xl pb-2 font-outfit">Book Free Appointment</h2>
      <p className='text-sm text-gray-600'>Expert Construction Solutions by Anusha at the Right Price.</p>
    </div>

    <CommonForm
      formControls={registeredFormControl}
      formData={formData}
      setFormData={setFormData}
      defaultOnSubmit={true}
      btnclass="pt-4 justify-center"
      formClass="grid grid-cols-1 gap-3"
      buttonText="Start your Construction"
      btntype='submit'
    />

    <p className="py-3 text-xs text-gray-500">
      * By submitting, I agree to Anusha's 
      <Link to="/privacy-policy" className="text-orange-400 font-medium"> Privacy Policy</Link>
    </p>
  </div>
);

const Hero = () => {
  const [formData, setFormData] = useState({});
  const isMdUp = useMediaQuery("(min-width: 768px)");

  return (<>
    <section id='hero' className=''>
      <div className='container mx-auto px-4'>

        <div className='h-full w-full py-10 xl:py-16 flex gap-16 justify-between items-center 2xl:items-start'>
      
          <div className='h-full w-full flex flex-col justify-between gap-10'>

              <div className='text-center h-full flex-1 2xl:pb-20 flex flex-col justify-end gap-5'>
                <Marquee quotes={"Inspiring Lives"} color='white' />
                <h1 className='lg:w-2/3 text-5xl xs:text-6xl pt-10 pb-10 md:pb-0 2xl:py-10 sm:py-0 text-white font-extrabold [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)] text-left'>Construct Your Dream Space With Us</h1>
              </div>

              <div className='flex flex-col justify-center items-center gap-3'>
                  <hr className='w-full border-gray-300 pb-5 md:pb-10' />

                  <div className='w-full flex justify-between items-center gap-5'>
                      <div className='flex items-center gap-4'>
                          <div className='flex items-center'>
                              <div className='size-20 bg-a-royalsafforn rounded-full'></div>
                              {/* <div className=' text-6xl font-bold'>1</div> */}
                              <div className=' -ml-12 text-6xl font-bold text-white'>7</div>
                          </div>
                          <div className='w-2/3 border-l ml-4! pl-4 text-white font-medium border-l-gray-200 text-2xl'>
                              Years of Expertise
                          </div>

                      </div>

                      <div className='h-full flex items-center gap-5'>
                        {["hero-pill-1", "hero-pill-2", "hero-pill-3"].map((id, index) => (
                          <div key={id} className={`img-pill border border-white ${index == 1 ? 'hidden sm:inline-block md:hidden lg:inline-block' : (index > 0) ? "hidden lg:inline-block" : ""}`}>
                            <img 
                              src={getImagewebp(id)} 
                              alt="Anusha Structures pvt ltd" 
                              loading='lazy' 
                              onContextMenu={(e) => e.preventDefault()}
                              draggable={false}
                              className='h-20 w-full object-contain'
                            />
                          </div>
                        ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* Desktop Form (Hidden on Mobile) */}
           {isMdUp && <div className='hidden md:block w-full max-w-[400px]'>
              <AppointmentForm formData={formData} setFormData={setFormData} />
            </div>}

        </div>
      </div>

    </section>

    {!isMdUp && <section className='h-full w-full block md:hidden'>
        <div className='container mx-auto px-4'>
          <AppointmentForm formData={formData} setFormData={setFormData} isMobile={true} />
        </div>
    </section>}
  </>);
};

export default Hero;