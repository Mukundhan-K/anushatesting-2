import React, { useState } from 'react';
import Marquee from '../ui/marquee';
import { getColdwebp } from '../../utility/getImage';

  const transformations = [
    {
      id: 1,
      title: "Commercial Building",
      description: "Plain cement structure transformed into a contemporary modern elevation with feature wall and landscape planter.",
      before: getColdwebp('6_qqefst'),
      after: getColdwebp('7_sn75ks'),
      // before: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771937197/before-after-1_x1wqnn.webp",
      // after: "https://res.cloudinary.com/djw3rcz4j/image/upload/v1771933187/before-after-2_zplfqb.webp",
      beforeLabel: "Before - Anusha",
      afterLabel: "After - Anusha"
    },
    {
      id: 2,
      title: "Residential Villa",
      description: "Generic structure redesigned with branded facade, curtain glazing, and professional signage zone.",
      before: getColdwebp('4_pkd3jm'),
      after: getColdwebp('5_bvbj0u'),
      beforeLabel: "Before - Anusha",
      afterLabel: "After - Anusha"
    }
  ];


const ImageSlider = ({ beforeImage, afterImage, beforeLabel, afterLabel }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl bg-gray-200 select-none group">
      {/* Labels Header */}
      <div className="absolute top-0 left-0 w-full z-30 flex  md:text-xs font-bold uppercase tracking-tighter">
        <div 
          className="bg-a-green text-white py-2 px-4 flex justify-center items-center transition-all duration-75"
          style={{ width: `${sliderPosition}%` }}
        >
          <span className="truncate">{beforeLabel || "Before"}</span>
        </div>
        <div 
          className="flex-1 bg-a-royalsafforn text-white py-2 px-4 flex justify-center items-center"
        >
          <span className="truncate">{afterLabel || "After"}</span>
        </div>
      </div>

      {/* After Image (Base Layer) */}
      <img
        src={afterImage}
        alt="After Transformation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Clipped Overlay) */}
      <div
        className="absolute inset-0 w-full h-full border-r-2 border-white/50"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before Structure"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Indicators */}
      <div className="absolute top-10 left-4 z-20 bg-a-green text-white px-2 py-1 text-sm rounded backdrop-blur-sm">BEFORE</div>
      <div className="absolute top-10 right-4 z-20 bg-a-royalsafforn text-white px-2 py-1 text-sm rounded shadow-lg">AFTER</div>

      {/* Slider Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
      />

      {/* Center Handle Visual */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-500 transition-transform duration-200 group-active:scale-90">
          <svg className="w-6 h-6 text-a-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" transform="rotate(180 12 12)"/>
            <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BeforeAfter = () => {

  return (
    <section className="w-full py-8 lg:py-16 font-sans">
      <div className="sm:container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 text-a-royalsafforn font-bold text-xs tracking-widest mb-4">
            <Marquee quotes={"Live Magic"} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Before & After <span className="text-a-royalsafforn italic">Elevation</span><br/>Comparisons
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Drag the slider to see how we transforms the building into architecturally refined masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {transformations.map((item) => (
            <div key={item.id} className="flex flex-col">
              <ImageSlider 
                beforeImage={item.before} 
                afterImage={item.after} 
                beforeLabel={item.beforeLabel}
                afterLabel={item.afterLabel}
              />
              <div className="mt-6 text-center lg:text-left">
                <p className="text-[10px] font-bold text-a-royalsafforn tracking-[0.2em] mb-3 uppercase">
                  ← Drag slider to compare →
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                   <span className="text-a-green">{item.title}:</span>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;