import React from 'react';
import MarqueeComponent from "./MarqueeComponent";

const Marquee = ({quotes, color="black"}) => {
 
  return (<>
    <div className="w-fit flex">
      <MarqueeComponent 
      className={`border border-${color} rounded-full h-[30px] w-[152px] font-outfit uppercase`}
      speed="4s"
      >
        <span className={`text-${color} px-4`}>{quotes}</span>
      </MarqueeComponent>
    </div>
    {/* <div className="marquee-container">
        <div className={`marquee-wrapper border border-${color}`}>
        <div className="marquee font-outfit uppercase">
            <ul>
                <li className={`text-${color}`}>{quotes}</li>
            </ul>
            <ul>
                <li className={`text-${color}`}>{quotes}</li>
            </ul>
        </div>
        </div>
    </div> */}
  </>);
};

export default Marquee;