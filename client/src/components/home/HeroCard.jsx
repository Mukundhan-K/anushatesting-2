import React from 'react';
import { Link } from 'react-router-dom';
import ButtonArrow from '../ui/ButtonArrow';

  const stats = [
    { id: 1, emoji: "🏠", value: "25+", label: "Projects" },
    { id: 2, emoji: "💼", value: "500", label: "Quality Checks" },
    { id: 3, emoji: "🎖️", value: "500K", label: "Sq.ft Completed" },
    { id: 4, emoji: "🛡️", value: "10", label: "Years Warranty" },
  ];

  const services = [
  {
    title: "Home Construction",
    description: "Duplex Homes, Luxury Homes, Villas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    link: "/home-construction",
    showButton: true,
    bttxt:"Residential"
  },
  {
    title: "Commercial Construction",
    description: "PG's, Offices, Hotels, Warehousing",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    link: "/commercial-construction",
    showButton: false,
    bttxt:"Commercial"
  },
];


const ServiceCard = ({ item, data }) => {
  return (
    <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden group">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[420px] aspect-video md:aspect-square object-cover group-hover:scale-105 transition duration-500"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm opacity-90 mb-4">{item.description}</p>

        {(data != item.title ) && (
          <Link to={item.link}>
            <ButtonArrow text={`Explore ${item.bttxt}`} />
          </Link>
        )}
        {/* {item.showButton && (
          <Link to={item.link}>
            <ButtonArrow text={`Explore ${item.bttxt}`} />
          </Link>
        )} */}
      </div>
    </div>
  );
};


const HeroCard = ({data}) => {

  return (<>
    <section id='ourHmCnscard' className=' h-full w-full'>
      <div className="sm:container mx-auto pb-0 md:pb-10 py-10 px-4 lg:px-20 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl shadow-sm border-t-4 border-orange-600 overflow-hidden">
          {/* 
              Grid Logic:
              - Mobile: grid-cols-2 (2x2)
              - Desktop: lg:flex (Single Row)
          */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`
                  relative flex flex-col items-center justify-center p-6 lg:p-10 flex-1
                  /* Mobile Border Logic (2x2 Grid) */
                  ${index === 0 ? 'border-r border-b border-gray-300' : ''}
                  ${index === 1 ? 'border-b border-gray-300' : ''}
                  ${index === 2 ? 'border-r border-gray-300 lg:border-b-0' : ''}
                  
                  /* Laptop/Desktop Border Logic (Reset mobile, add vertical) */
                  lg:border-b-0 lg:border-r lg:last:border-r-0 lg:border-gray-300
                `}
              >
                {/* Emoji Icon Container */}
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                  {stat.emoji}
                </div>

                {/* Counter Value */}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">
                    +
                  </span>
                </div>

                {/* Label */}
                <p className="mt-2 text-center text-gray-500 text-xs md:text-sm font-medium max-w-[140px] leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>


    <section className="h-full w-full px-6 md:px-12 bg-gray-100">
      <div className="sm:container mx-auto py-10 px-4 flex flex-col lg:flex-row items-center justify-center">
        {/* Heading */}
        <div className="mb-8 lg:pr-5">
          <h2 className="text-4xl font-semibold mb-3">
            Choose Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Expertise in delivering top-notch construction with precision,
            quality, and transparency.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((item, index) => (
            <ServiceCard key={index} item={item} data={data} />
          ))}
        </div>
      </div>
    </section>
  </>);
};

export default HeroCard;