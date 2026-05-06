import React from 'react';
import { constructionData } from '../data/contentConfig.js';

// components
import Hero from "../components/home-cons/hero.jsx";
import Services from '../components/home/OurServices.jsx';
import OurJourney from "../components/home/ourjourney.jsx";
import OurProcess from '../components/home/OurProcess.jsx';
import Pricing2 from '../components/home/price.jsx';
import Review from '../components/home/Review.jsx';
import BankingPatners from '../components/home/BankingPatners.jsx';
import CostEstimation from '../components/home/CostEstimation.jsx';
import CommonSEO from '../utility/commonSeo.jsx';
import TabComponent from './WhyChoose.jsx';
import ComparisonTable from '../components/home/CompTable.jsx';

import OurProjects from '../components/home-cons/OurProjects.jsx';
import HeroCard from '../components/home/HeroCard.jsx';
import BeforeAfter from '../components/home/CompareImg.jsx';
import ResponsiveFloorPlans from "../components/home/Layout.jsx";

const HomeCons = ({url="default", setOpenPop}) => {
  // Extract the specific data for this niche
  const pageData = constructionData?.[url];
  console.log("pg data ", url, pageData);

  return (<>
    <CommonSEO title={pageData.seoTl} description={pageData.seoDes} keywords={pageData.keywords}/>

    <Hero />
    <HeroCard data={pageData.main} />
    <Services tit={pageData.serTl} data={pageData.serCard} />
    <OurJourney tit={pageData.abtTl} img={pageData.abtImg} data={pageData.abtCont} />
    <OurProcess />
    <section className='bg-gray-50 w-full'>
      <div className='lg:container mx-auto flex flex-col lg:flex-row justify-center items-center'>
        <TabComponent />
        <ComparisonTable />
      </div>
    </section>

    <OurProjects data={pageData.proj} />
    <Pricing2 data={pageData.priceList} />
    <Review setOpenPop={setOpenPop} />

    <BeforeAfter />
    <ResponsiveFloorPlans setOpenPop={setOpenPop} data={pageData.prs} />

    <CostEstimation setOpenPop={setOpenPop} />
    <BankingPatners />
  </>);
};

export default HomeCons;

// import React from 'react';

// // components
// import Hero from "../components/home/hero";
// import OurJourney from "../components/home/ourjourney.jsx";
// import OurProcess from '../components/home/OurProcess';
// import Pricing from '../components/home/Pricing';
// import OurProjects from '../components/home/OurProjects';
// import Review from '../components/home/Review';
// // import BeforeAfter from '../components/home/BeforeAfter';
// import BankingPatners from '../components/home/BankingPatners';
// import CostEstimation from '../components/home/CostEstimation';
// import CommonSEO from '../utility/commonSeo';
// import TabComponent from './WhyChoose.jsx';
// import ComparisonTable from '../components/home/CompTable.jsx';
// import Services from '../components/home/OurServices.jsx';

// const Home = ({setOpenPop}) => {
//   return (<>
//     <CommonSEO
//       title='Home | Turnkey Construction in Chennai | Builders,interior design,renovation chennai'   
//     />

//     <Hero />
//     <Services />
//     <OurJourney />
//     <OurProcess />
//     <section className='bg-gray-50 w-full'>
//       <div className='lg:container mx-auto flex flex-col lg:flex-row justify-center items-center'>
//         <TabComponent />
//         <ComparisonTable />
//       </div>
//     </section>
//     <Pricing setOpenPop={setOpenPop} />
//     <OurProjects />
//     <Review setOpenPop={setOpenPop} />
//     {/* <BeforeAfter /> */}
//     <CostEstimation setOpenPop={setOpenPop} />
//     <BankingPatners />
//   </>);
// };

// export default Home;