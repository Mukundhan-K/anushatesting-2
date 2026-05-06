import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ButtonArrow from '../ui/ButtonArrow';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';
import { getColdwebp } from '../../utility/getImage';

const PriceCard = ({ title, subtitle, price, color, badgeText, bgclr, tclr}) => (
  <div className={`p-5 pb-3 rounded-2xl border-2 transition-all duration-300 ${color} ${bgclr || 'bg-white'} shadow-sm flex flex-row items-center justify-between relative overflow-hidden`}>
    {badgeText && (
      <span className="absolute top-0 left-0 px-3 py-1 bg-a-green text-white rounded-br-xl text-[10px] font-black tracking-widest uppercase">
        {badgeText}
      </span>
    )}
    <div className="flex flex-col pt-2">
      <h3 className={`text-lg font-bold tracking-tight ${tclr || "text-black"} uppercase`} >{title}</h3>
      <p className={`font-extrabold ${tclr || "text-black"}`}>{subtitle}</p>
    </div>
    <div className={`text-2xl font-black ${tclr || "text-gray-900"}`}>
      ₹{price.toLocaleString('en-IN')}
    </div>
  </div>
);

const PriceCalculator = ({data=[2200,2750,3150]}) => {
  const [sqft, setSqft] = useState(2500);

  // Dynamic pricing logic based on standard rates
  const houseRate = data?.[0];
  const PremiumRate = data?.[1];
  const LuxuryRate = data?.[2];
  const othersRate = 2599;
  
  const houseTotal = sqft * houseRate;
  const PremiumTotal = sqft * PremiumRate;
  const LuxuryTotal = sqft * LuxuryRate;
  const othersTotal = sqft * othersRate;
  const savings = othersTotal - houseTotal;
  const savingsPercent = Math.round((savings / othersTotal) * 100);

  // Logic to determine which house image to show
  // (In a real app, these would be paths to your constructed house images with families)
  const imageSrc =
    sqft < 5000
      ? (data?.[2] < 3000) ? 'vh3lhvc8twe2r1g8simf_tnqgio' : 'p-1_qvamnu'
      // :
      //  sqft < 5000
      // ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
      : 'p-2_yuoww4';

  return (
    <section className='py-5' id='pricing'>

      <div className="sm:container  mx-auto p-4 font-sans">

        <div className='flex flex-col justify-center items-center'>
          <Marquee quotes={"our pricing"} color='' />
          <div className='pt-4 md:pt-8'></div>
          <Heading text={"Choose Your Ideal Package"} classes={""} />
          <p className="max-w-2xl pb-8 text-center text-lg leading-8">Choose the Package that works best You</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Pricing Details */}
          <div className="flex flex-col gap-4">
            <PriceCard
              title="Comfort"
              subtitle={`₹${houseRate} / sft`}
              price={houseTotal}
              color="border-orange-400"
              badgeText="Best Price"
              bgclr = "bg-a-royalsafforn/10"
              tclr="text-orange-600"
            />
            <PriceCard
              title="Premium"
              subtitle={`₹${PremiumRate} / sft`}
              price={PremiumTotal}
              color="border-gray-400"
              badgeText="Our Choice"
            />
            <PriceCard
              title="Luxury"
              subtitle={`₹${LuxuryRate} / sft`}
              price={LuxuryTotal}
              color="border-sky-400"
              badgeText="Quality"
              bgclr = "bg-sky-50/50"
              tclr="text-sky-600"
            />
            <PriceCard
              title="You Save"
              subtitle={`~${savingsPercent}% Less`}
              price={savings.toLocaleString('en-IN')}
              color="border-a-green/40"
              badgeText={"-" + savingsPercent + "%"}
              bgclr = "bg-green-50"
              tclr="text-a-green"
            />

            <Link to="/estimator" className='pt-2 text-center'>
              <ButtonArrow text='Get Detailed Estimate ' />
            </Link>

          </div>

          {/* Right Side: Visual & Slider */}
          <div className="flex flex-col items-center gap-8">
            <div className="w-full aspect-video bg-gray-100 rounded-2xl relative overflow-hidden border border-gray-100 shadow-inner">
              {/* Replace the div below with your <img> tag using the getHouseImage() logic */}
              <img
                src={getColdwebp(imageSrc)}
                alt={`Image for range value: ${sqft}`}
                className="w-full h-auto object-cover rounded-lg shadow-md" // Adjust as needed
                loading='lazy'  title={`Construcion of anusha structures`}
              />
            </div>

            <div className="w-full space-y-6">
              <div className="relative h-14 bg-gray-50 rounded-2xl flex items-center px-6 border border-gray-100 shadow-sm">
                <span className="text-lg font-black text-black mr-4">500</span>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  value={sqft}
                  onChange={(e) => setSqft(parseInt(e.target.value))}
                  className="flex-grow accent-a-green h-1.5 rounded-full cursor-pointer"
                />
                <span className="text-lg font-black text-gray-400text-black ml-4">10K</span>
              </div>

              <div className="flex justify-center">
                <div className="bg-a-green px-8 py-2 rounded-full text-white shadow-lg shadow-orange-200">
                  <span className="font-black text-xl">{sqft.toLocaleString()}</span>
                  <span className="font-bold ml-2">SFT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default PriceCalculator;