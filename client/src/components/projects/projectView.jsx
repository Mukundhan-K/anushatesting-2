import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import Banner from "../common/Banner";
import { getImageSvg, getImagewebp } from '../../utility/getImage';
import Heading from "../common/Heading";
import CommonSEO from '../../utility/commonSeo';
import { viewProject } from '../../redux/shopSlice';
import { toast } from 'sonner';
import ImageLightbox from "../ui/ImageLightbox"

const KeyFeat = React.memo(({ label, value, icon = "/cup", suffix = "" }) => {
  if (!value) return null;

  return (
    <div className="py-2 md:py-8 flex flex-col xsl:flex-row items-center gap-5">
      <div className="size-14 rounded-full aspect-square grid place-items-center border border-gray-400 shrink-0">
        <img
          src={getImageSvg(icon)}
          className="size-9"
          loading="lazy"
          alt={label}
        />
      </div>

      <div className="flex flex-col text-center xsl:text-left break-all">
        <span className="text-xl text-gray-600 font-medium">{label}</span>
        <span className="text-xl font-medium">{value} {suffix}</span>
      </div>
    </div>
  );
});

const ProjectView = () => {

  const { projId } = useParams();
  const dispatch = useDispatch();
  const {projectDetail:projData, loading} = useSelector((state)=>state.shopProductReducer);

  const [prodImg, setProdImg] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchedRef = useRef(false);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const getProject = useCallback(async() => {
    try {
    const data = await dispatch(viewProject(projId)).unwrap();
    if (data?.success  && data?.project?.images?.length) {
      setProdImg(data.project.images?.[0] || ""); // first image
      console.log("proj cr : ",data);
      return { success: true };
    };

    toast.error("Failed", {
      description: data?.message || "Something went wrong",
    });
    return { success: false };
    } catch (error) {
        console.error(error);
        toast.error("Failed", {
          description: error?.message || "Network error",
        });
        return { success: false };
    };
  }
  ,[projId])

  useEffect(() => {
    if (!projId || fetchedRef.current) return;
     fetchedRef.current = true;

     console.log("called", projId);
     getProject();
     
  }, [projId, dispatch]);
  
  const infoItems = [
    { label: "Location", value: projData?.location },
    { 
      label: "Commencement Date", 
      value: projData?.commencementDate 
        ? new Date(projData.commencementDate).toLocaleDateString() 
        : null 
    },
    { 
      label: "Total Built-Up Area", 
      value: projData?.projectArea ? `${projData.projectArea} Sq.Ft` : null 
    },
    { label: "Number of Floors", value: projData?.numberOfFloors },
    { label: "Special Features", value: projData?.specialFeatures },
    { label: "Amenities", value: projData?.amenities },
  ];

  if (loading || !projData?._id) {
    return <div className="min-h-[60vh] grid place-items-center">Loading...</div>;
  };

  return (<>

    <CommonSEO
      title={`${projData?.title} project | Construction in Chennai | Builders,interior design,renovation chennai`}  
    />

    <section className='h-full w-full'>

      <Banner hgt='mini' title={projData?.title} link1={"/projects"} text1={"Projects"} text2={projData?.title} />
      
      <div className='sm:container mx-auto px-4'>

        <div className=''>
          <div className='flex gap-2 items-end  pb-6 '>
            <div className={`size-9 rounded-full aspect-square bg-a-royalsafforn grid place-items-center`}>
                <img src={getImageSvg("location")} alt="location icon" title="location icon" className='size-7' loading="lazy" />
            </div>
            <span className='text-black text-xl'>{projData?.location}</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-6xl text-black`}>{projData?.title}</h1>
        </div>

        <hr className='border-gray-300 my-5' />

      {/* product key feat --------------------------- */}
        <div className='py-4 grid grid-cols-2  xl:grid-cols-4 items-center gap-x-8'>

          <KeyFeat label="Status" value={projData?.status} />
          {(projData?.projectType) && 
             <KeyFeat
              label="Project Type"
              value={projData?.projectType}
            />
          }  
          {(projData?.projectArea) && 
            <KeyFeat
              label="Total Area"
              value={projData?.projectArea}
              suffix="Sq.Ft"
            />
          }
          {(projData?.numberOfFloors) && 
           <KeyFeat
              label="Floors"
              value={projData?.numberOfFloors}
            />
          }
        </div>

      {/* product image --------------------------- */}

        <div className='py-8 max-h-[700px] flex flex-col-reverse md:flex-row gap-3'>
          <div className='grid grid-cols-4 md:flex md:flex-col md:w-1/6 overflow-y-auto no-scrollBar gap-4'>
            {projData?.images?.map((img, i) => (
              <img 
                key={i}
                onClick={() => setProdImg(projData?.images[i])} 
                src={img} 
                className={`w-full aspect-square md:aspect-auto object-cover rounded-2xl cursor-pointer transition-all duration-300 ${prodImg === img ? 'border-2 border-a-royalsafforn' : 'opacity-70 hover:opacity-100'}`} 
                alt={`Thumbnail ${i}`} 
              />
            ))}
          </div>

          <div onClick={() => handleOpen(currentIndex)}
            className='h-[330px] md:h-[630px] w-full overflow-hidden relative rounded-3xl'>
            <img src={prodImg} className="h-full w-full object-cover transition-opacity duration-500 cursor-zoom-in" alt="Main View" />
            <span className='size-14 text-5xl cursor-pointer
                grid place-items-center rounded-full bg-white absolute right-5 md:right-10 bottom-5'>+</span>
          </div>
        </div>

      {/* Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={projData?.images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}

      {/* product description --------------------------- */}
        <div className='w-full py-8 flex flex-col lg:flex-row justify-between gap-12'>
          <div className=''>
            <Heading align='left' text={"Project Description"} />
            <p className="pt-4 text-lg leading-8 text-gray-600">{projData?.description}</p>
          </div>

          <div className='min-w-[350px] xl:min-w-[450px]'>
            <h3 className='text-2xl pb-3'>Key Details</h3>

            <div className='text-lg flex flex-col gap-4'>
              {infoItems.map((item, index) => (
                // 2. Only render if the value actually exists
                item.value && (
                  <div key={index} className='flex gap-3'>
                    {/* The Bullet Point */}
                    <div className='size-2 shrink-0 mt-2 aspect-square bg-a-royalsafforn rounded-full' />
                    
                    <p>
                      <span className='font-medium! whitespace-nowrap pr-3'>
                        {item.label} :
                      </span>
                      <span className='text-gray-600'>
                        {item.value}
                      </span>
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <hr className='border-gray-300 my-5' />

      {/* product Features --------------------------- */}
        <div className='pt-5 pb-16'>
          <Heading align='left' text={"Features & amenities"} />

          <div className='pt-16 grid xsl:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 lg:gap-y-28'>
            {projData?.features?.map((item, i)=>(
              <div key={i} className='rounded-3xl px-5 text-center flex flex-col items-center gap-4' style={{backgroundColor: 'transparent',backgroundImage: `linear-gradient(180deg, #F6F3EC 0%, #F6F3EC00 100%)`}}>
                <div>
                  <svg className='w-44'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 104" fill="none" >
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H320C290.545 0 267.772 24.6753 253.628 49.8666C235.516 82.1247 200.378 104 160 104C119.622 104 84.4835 82.1247 66.3718 49.8666C52.228 24.6753 29.4552 0 0 0Z" fill="white" />
                  </svg>
                </div>
                <div className='-mt-20 size-16 aspect-square grid place-items-center bg-gray-300 rounded-full'>
                    <img src={getImageSvg("cup")} className='size-10!' loading='lazy' alt={`${item.label} icon`} title={`${item.label} icon`}  />
                </div>
                <div className='font-josefin text-2xl font-semibold'>{item.label}</div>
                <p className=' text-gray-500'>{item.value}</p>


              </div>
            ))}
          </div>
        </div>

      {/* location --------------------------- */}

        <hr className='border-gray-300 my-5' />

        <div className='pt-5 pb-16'>
          <Heading align='left' text={"Location"} />

          <div className='py-8 grid lg:grid-cols-2 items-center gap-8'>
            <div className='p-10 md:px-16 border border-gray-500 rounded-3xl'>
              <div className=''>
                <div>Address</div>
                <div className='pt-4'>
                  <h3 className='text-3xl'>{projData?.address}</h3>
                </div>
              </div>

              <hr className='border-gray-300 my-5' />

              <div>
                <h3 className='text-2xl pb-5'>Key transport</h3>
                <div className='grid grid-cols-2 gap-5'>
                  {projData?.keyTransport.map((item, i)=>(
                    <div key={i} className='font-bold'>
                      <div className='text-gray-500 pb-2'>{item.label}</div>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className='rounded-3xl overflow-hidden'>
              <iframe src={projData.mapLink} className='w-full h-[500px]' allowFullScreen="" loading="lazy" title="Google Map showing Anusha Structures office location" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

      {/* product image --------------------------- */}


      </div>
    </section>
  </>);
};

export default ProjectView;