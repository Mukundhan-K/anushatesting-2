import React from 'react';
import MarqueeComponent from './MarqueeComponent'; // Adjust path
import { getImageSvg } from '../../utility/getImage';

const AWARDS1 = [
  { id: 1, title: "Build Quality Recognition", year: "2025", icon: "cup" },
  { id: 2, title: "Infrastructure Excellence", year: "2022", icon: "cup" },
  { id: 3, title: "Urban Development Honor", year: "2019", icon: "cup" },
  { id: 4, title: "Structural Innovator", year: "2021", icon: "cup" },
];

const AWARDS2 = [
  { id: 1, title: "BuildCraft Distinction", year: "2024", icon: "cup" },
  { id: 2, title: "Arch Design Honor", year: "2025", icon: "cup" },
  { id: 3, title: "Craftsmanship Honor", year: "2020", icon: "cup" },
  { id: 4, title: "Standard of Quality", year: "2023", icon: "cup" },
];

const AwardBadge = ({ title, year, icon }) => (
  <div className="flex items-center gap-3 p-3 pr-5 bg-white rounded-full whitespace-nowrap shadow-sm">
    <div className="grid rounded-full size-14 bg-a-royalsafforn place-items-center">
      <img 
          src={getImageSvg(icon)} 
          alt={icon} 
          className="size-10" 
          loading="lazy" 
      />
    </div>
    <h3 className="text-xl md:text-3xl">
      {title} <span className="font-normal text-gray-400">|</span>
    </h3>
    <span className="text-xl">{year}</span>
  </div>
);

const MarqueeSlider = ({ reverse = false }) => {
  const AWARDS = reverse ? AWARDS1 : AWARDS2;
  
  return (
    <MarqueeComponent reverse={reverse} speed="40s" className="py-4">
      {AWARDS.map((award) => (
        <AwardBadge key={award.id} {...award} />
      ))}
    </MarqueeComponent>
  );
};

export default MarqueeSlider;