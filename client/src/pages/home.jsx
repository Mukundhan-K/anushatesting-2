import React from 'react';

// components
import Hero from "../components/home/hero";
import OurJourney from "../components/home/ourjourney.jsx";
import OurProcess from '../components/home/OurProcess';
import Pricing from '../components/home/Pricing';
import OurProjects from '../components/home/OurProjects';
import Review from '../components/home/Review';
import BeforeAfter from '../components/home/BeforeAfter';
import BankingPatners from '../components/home/BankingPatners';
import CostEstimation from '../components/home/CostEstimation';
import CommonSEO from '../utility/commonSeo';
import TabComponent from './WhyChoose.jsx';
import ComparisonTable from '../components/home/CompTable.jsx';
import Services from '../components/home/OurServices.jsx';

const Home = ({setOpenPop}) => {
  return (<>
    <CommonSEO
      title='Home | Turnkey Construction in Chennai | Builders,interior design,renovation chennai'   
    />

    <Hero />
    <Services />
    <OurJourney />
    <OurProcess />
    <section className='bg-gray-50 w-full'>
      <div className='lg:container mx-auto flex flex-col lg:flex-row justify-center items-center'>
        <TabComponent />
        <ComparisonTable />
      </div>
    </section>
    <Pricing setOpenPop={setOpenPop} />
    <OurProjects />
    <Review setOpenPop={setOpenPop} />
    <BeforeAfter />
    <CostEstimation setOpenPop={setOpenPop} />
    <BankingPatners />
  </>);
};

export default Home;