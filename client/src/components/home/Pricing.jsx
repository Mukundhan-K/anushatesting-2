import React, {memo, lazy, Suspense} from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
// import ToggleBtn from '../ui/ToggleBtn';
import { Link } from 'react-router-dom';
import ButtonArrow from '../ui/ButtonArrow';
const EmblaSlider = lazy(() => import("../ui/EmblaSlider"));
import useMediaQuery from '../../utility/UseMediaQuery';

const premiumContent = [
  {
    name: "Basic",
    price: "₹ 2000",
    discription: "A budget package with no compromise on quality that includes all construction essentials",
    points: [
      "Quality branded steel & cement",
      "Vitrified tiles up to ₹50/sqft",
      "Standard flush doors with basic fittings",
      "Interior walls with Tractor Emulsion paint",
      "Basic CP fittings & sanitary ware"
    ]
  },
  {
    name: "Premium",
    price: "₹ 3500",
    discription: "Enhanced package with upgraded materials and stylish finishes for modern homes",
    points: [
      "Premium branded steel & cement",
      "Premium vitrified tiles up to ₹80/sqft",
      "Laminated flush doors with designer hardware",
      "Premium emulsion paint for interiors",
      "Branded CP fittings & designer sanitary ware"
    ]
  },
  {
    name: "Luxury",
    price: "₹ 5000",
    discription: "High-end luxury package with superior materials and elegant finishes",
    points: [
      "Top-tier steel & high-grade cement",
      "Imported marble / large-format tiles up to ₹150/sqft",
      "Teak wood / veneer finish doors with premium hardware",
      "Luxury paint finish with texture options",
      "High-end branded CP fittings & premium sanitary ware"
    ]
  },
];
const PriceCard = memo(({item: { name, discription, points, price }, i})=>{return(
  <div key={price} aria-label={`${name}`}
    className={`w-full rounded-3xl grid xsl:grid-cols-2 gap-x-5 justify-between xl:block bg-white p-8 xl:p-10 border-2 ${name=="Premium" ? "border-a-royalsafforn shadow-none!" : "border-gray-300"} hover:border-a-royalsafforn duration-300`}
  >
    <div className=''>
      <div className="flex items-center justify-between gap-x-4">
        <h2 id="product1" className="text-lg md:text-xl font-semibold leading-8 bg-a-royalsafforn rounded-full px-5 py-1 md:py-2">{name}</h2>
      </div>
      <p className="mt-6 xl:mt-10 text-xl flex items-baseline gap-x-1">
        <span className="text-3xl md:text-4xl font-bold tracking-tight ">{price}</span>
        / sqft
      </p>
      <p className="mt-4 xl:mb text-sm leading-6 ">{discription}</p>
        <Link
        to="/contact"
        className={`mt-8 block text-center rounded-xl py-3 px-6 text-sm font-semibold transition-all duration-300
        ${name === "Premium"
          ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
          : "border border-gray-300 text-gray-800 hover:bg-gray-100"
        }`}
      >
        Get Started
      </Link>
    </div>
    
    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10">
    {points.map((point, i)=>(
      <li key={i} className="flex gap-x-3">
        <div className={`mt-1 h-fit flex-none rounded-full p-0.5 ${name === "Premium" ? "bg-a-royalsafforn/20" : "bg-a-green/10"}`}>
          <svg className={`h-4 w-4 ${name === "Premium" ? "text-a-royalsafforn" : "text-a-green"}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        </div>
        {point}
      </li>
    ))}
    </ul>
  </div>
)});

const Pricing = ({setOpenPop}) => {

const isXlDwn = useMediaQuery("(max-width: 1279px)");

//   const [tab, setTab] = useState(false); 
//   const luxuryContent = [
//     {name : "Product Type 1", price: "₹ 100 / sqft", img:"pricecard-1", discription: "A budget package with no compromise on quality that includes all construction essentials", points:
//         ["Trusted brand steel & cement",
//          "Standard floor tiles upto ₹50/sqft",
//          "Standard flush doors and window finish",
//          "Tractor Emulsion finish",
//          "Essential kitchen & bathroom fittings"
//         ]
//     },
//     {name : "Product Type 2", price: "₹ 200 / sqft", img:"pricecard-2",discription: "A budget package with no compromise on quality that includes all construction essentials", points:
//         ["Trusted brand steel & cement",
//          "Standard floor tiles upto ₹50/sqft",
//          "Standard flush doors and window finish",
//          "Tractor Emulsion finish",
//          "Essential kitchen & bathroom fittings"
//         ]
//     },
//     {name : "Product Type 3", price: "₹ 300 / sqft", img:"pricecard-3", discription: "A budget package with no compromise on quality that includes all construction essentials", points:
//         ["Trusted brand steel & cement",
//          "Standard floor tiles upto ₹50/sqft",
//          "Standard flush doors and window finish",
//          "Tractor Emulsion finish",
//          "Essential kitchen & bathroom fittings"
//         ]
//     },
//   ];
  const content = premiumContent;
//   const content = tab ? luxuryContent : premiumContent;

  return (<>
    <section className='py-10 md:py-16 bg-bg-brown' id='pricing'>
    
      <div className='sm:container mx-auto px-4'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <Marquee quotes={"our pricing"} color='' />
          <div className='pt-0 md:pt-8'></div>
          <Heading text={"Choose Your Ideal Package"} classes={""} />
          <p className="max-w-2xl pb-8 text-center text-lg leading-8">Choose the Package that works best You</p>
        </div>

        {/* <div className='my-10 flex justify-between sm:justify-center items-center gap-5 xs:gap-10'>
            <div className='text-xl xs:text-3xl w-[100px] text-wrap font-semibold text-white' onClick={()=>setTab(()=>false)}>Premium Packages</div>
            <ToggleBtn parentState={tab} setparentState={setTab} icon1="gold" icon2="diamond" />
            <div className='text-xl xs:text-3xl w-[100px] text-wrap font-semibold text-white' onClick={()=>setTab(()=>true)}>Luxury Packages</div>
        </div> */}
      </div>

      <div className='sm:container mx-auto pt-8 px-4'>
        {!isXlDwn ?
          (<div className='grid xl:grid-cols-3 gap-8'>
            {content.map((item, i)=>(
              <PriceCard key={i} item={item} />
            ))}
          </div>)
        :
          (<Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
            <EmblaSlider
              items={content}
              renderSlide={(item) =><PriceCard key={item.name} item={item} />}
              autoplay
              autoplayDelay={3000}
              loop = {true}
              arrows={true}
              arrowPosition="bottom-right"
              showCounter={true}
              counterPosition='top-right'
              slidesPerView={{
                  base: 1,
              }}
              viewportPadding='p-2'
              gap={20}
            />
          </Suspense>)
        }

        <div className='pt-16 text-center'>
          <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
        </div>

      </div>

    </section>
  </>)
}

export default Pricing