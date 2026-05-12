import React,{lazy} from 'react';

// components
import Banner from "../components/common/Banner";
import CostEstimator from '../components/estimators/CostEstimator';
import Marquee from '../components/ui/marquee';
import Heading from '../components/common/Heading';
import LoanEstimator from "../components/estimators/LoanEstimator";
// import BankingPatners from '../components/home/BankingPatners';
// import Pricing from '../components/home/price';
import ButtonArrow from '../components/ui/ButtonArrow';
import HouseCalculator from '../components/estimators/Calculator';
const BankingPatners = lazy(() => import("../components/home/BankingPatners"));
const Pricing = lazy(() => import("../components/home/price"));

const registeredFormControl = [
    {
      name : "name",
      label : "Name",
      placeholder : "Ex - Arunya",
      componentType : "input",
      type : "text",
      icon : "user"
    },
    {
      name : "phone",
      label : "Phone",
      placeholder : "Ex - +91 76959 50724",
      componentType : "input",
      type : "tel",
      icon : "call"
    },
    {
      name : "email",
      label : "Email",
      placeholder : "Ex - anushastructures02@gmail.com",
      componentType : "input",
      type : "text",
      icon : "email"
    },
    {
      name : "type",
      label : "Construction Type",
      placeholder : "Select your Type",
      componentType : "select",
      options : [
        {id:'commercial', name: "Commercial"},
        {id:'industrial', name: "Industrial"},
        {id:'residential', name: "Residential"},
        {id:'corporate', name: "Corporate"},
      ],
    },
    {
      name : "location",
      label : "Location of Plot",
      placeholder : "Ex - Perumal (St), velacherry",
      componentType : "input",
      type : "text",
      icon : "location-house"
    },
    {
      name : "builtarea",
      label : "Built-up Area (sqft)",
      placeholder : "Ex - 1000",
      componentType : "input",
      type : "text",
      icon : "ruler-l"
    },
  ];
  
const Estimator = ({setOpenPop}) => {

  return (<>
        
    <Banner title={"Cost Estimator"} link1={"/home"} text1={"Home"} text2={"Cost Estimator"} />

    {/* <HouseCalculator />  */}

    <CostEstimator registeredFormControl={registeredFormControl} clsStyle={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}  />
    <LoanEstimator clsStyle={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}  />

    <Pricing />
    <BankingPatners />

    <div className='pb-10 text-center'>
        <ButtonArrow btnonclick={() => setOpenPop(true)} text='Start Your Construction' />
    </div>


  </>);
};

export default Estimator;