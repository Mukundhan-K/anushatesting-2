import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { getImageSvg } from "../../utility/getImage";

const getSlideWidth = (value) => `${100 / value}%`;

export default function EmblaSlider({
  items = [],
  renderSlide,
 /* behavior */
  autoplay = false,
  autoplayDelay = 5000,
  loop = false,
 /* layout */
  slideAlign = "start", // start | center | end
  viewportPadding="p-2",
  slidesPerView = {base: 1},
  gap = 24,
  variableWidth = false,
 /* controls */
  arrows = false,
  arrowPosition = "bottom-left", // bottom-left | bottom-right | center
  renderArrow,
  dots = false,
  dotsPosition = "bottom-center", // bottom-center | bottom-right | top-right
  controlsInside = false,
  dotbg,

  slideWidth = "100%",

 /* scrollbar */
  scrollbar = false,
  scrollbarType = "default", // default | custom
  scrollbarPosition = "bottom",
  scrollWid,
 /* counter */
   showCounter = false,
   counterPosition = "right",
   counterColor = "black"
}) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

 const plugins = [];
  if (autoplay) {
    plugins.push(
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: true,
      })
    );
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop,
      align: slideAlign,
      skipSnaps: false,
    },
    plugins
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateProgress = () => {
      const total = emblaApi.scrollSnapList().length;
      const current = emblaApi.selectedScrollSnap() + 1; // start from 1
      setScrollProgress(current / total);
    };
    updateProgress();
    emblaApi.on("select", updateProgress);

    return () => emblaApi.off("select", updateProgress);
  }, [emblaApi]);


// 🔁 Update slidesPerView on resize
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;



      if (width >= 1280 && slidesPerView.xl)
        setCurrentSlidesPerView(slidesPerView.xl);
      else if (width >= 1024 && slidesPerView.lg)
        setCurrentSlidesPerView(slidesPerView.lg);
      else if (width >= 768 && slidesPerView.md)
        setCurrentSlidesPerView(slidesPerView.md);
      else if (width >= 640 && slidesPerView.sm)
        setCurrentSlidesPerView(slidesPerView.sm);
      else setCurrentSlidesPerView(slidesPerView.base || 1);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [slidesPerView]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    // onScroll();
    // emblaApi.on("scroll", onScroll);
  }, [emblaApi, onSelect]);
  // }, [emblaApi, onSelect, onscroll]);

  
  const scrollbarPositions = {
    "bottom": arrows ? "mt-10" : "mt-7",
    "top": "mb-6",
    "bottom-left": "mt-6 mr-auto",
    "bottom-right": "mt-6 ml-auto",
    "inside-bottom": "absolute left-0 right-0 bottom-3 px-6",
  };
  const counterPositions = {
    "right": "text-right",
    "left": "text-left",
    "top-right": "absolute -top-12 right-0 pr-2",
  };
  const arrowPositionClasses = {
    "bottom-left": "left-0 bottom-0",
    "bottom-right": "right-0 bottom-0 pr-2",
    "center": "left-0 right-0 top-1/2 -translate-y-1/2 justify-between",
    "top-right": "right-0 -top-12 pr-2",

  };
  const dotsPositionClasses = {
    "bottom-center": "left-1/2 -translate-x-1/2 -bottom-0",
    "bottom-right": "right-0 -bottom-0",
    "bottom-left": "left-0 -bottom-0",
    "top-right": "right-0 top-0",
  };  

  return (
    <div className="relative">

      {/* SLIDER */}
    
      <div ref={emblaRef} className={`overflow-hidden ${viewportPadding}`}>
        <div className="flex" style={{ marginLeft: `-${gap / 2}px` }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                paddingLeft: `${gap / 2}px`,
                ...(variableWidth
                  ? item?.width
                    ? { minWidth: "fit-content" }
                    : { width: "auto" }
                  : { width: getSlideWidth(currentSlidesPerView) })
              }}
            >
              {renderSlide(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS */}  
      {arrows && (
        <div
          className={`h-fit cursor-pointer absolute flex gap-3 ${
            arrowPositionClasses[arrowPosition]
          } ${controlsInside ? "p-4" : scrollbar ? "-bottom-4!" : "-bottom-12!"}`}
        >
          {renderArrow ? (
            renderArrow({ direction: "prev", onClick: scrollPrev })
          ) : (
            <button
              onClick={scrollPrev}
              className="w-10 h-10 cursor-pointer rounded-full border flex items-center justify-center"
            >
              <img
                src={getImageSvg("arrow-black")} 
                alt="Anusha Construction building" 
                loading='lazy' 
                draggable={false}
                className='size-4 cursor-pointer'
              />
            </button>
          )}

          {renderArrow ? (
            renderArrow({ direction: "next", onClick: scrollNext })
          ) : (
            <button
              onClick={scrollNext}
              className="w-10 h-10 cursor-pointer rounded-full border flex items-center justify-center"
            >
              <img
                src={getImageSvg("arrow-black")} 
                alt="Anusha Construction building" 
                loading='lazy' 
                draggable={false}
                className='size-4 cursor-pointer rotate-180'
              />
            </button>
          )}
        </div>
      )}

      {/* DOTS */}
      {dots && (
        <div
          className={`absolute cursor-pointer flex gap-3 rounded-3xl ${
            dotsPositionClasses[dotsPosition]
          } ${controlsInside ? "p-4 " : "-bottom-5! pl-4"}  ${dotbg && `${dotbg} + p-3 `}`}
        >
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full border cursor-pointer transition
                ${
                  index === selectedIndex
                    ? "bg-black border-black"
                    : "border-black"
                }`}
            />
          ))}
        </div>
      )}

      {/* COUNTER */}
      {showCounter && (
        <div
          className={`text-lg font-medium mt-4 cursor-pointer ${counterPositions[counterPosition]} text-${counterColor}
            ${scrollbar && "-mb-14"}
          `}
        >
          {selectedIndex + 1} / {items.length}
        </div>
      )}

      {/* SCROLLBAR */}
      {scrollbar && (
        <div
          className={`h-1.5 rounded-full bg-gray-200 cursor-pointer overflow-hidden
             ${scrollbarPositions[scrollbarPosition]} ${scrollWid ? "w-[calc(100%-100px)]" : 'w-full'} `}
        >
          <div
            className={`h-full cursor-pointer transition-[width] duration-200 ease-out ${
              scrollbarType === "custom"
                ? "bg-black"
                : "bg-a-royalsafforn"
            }`}
            style={{
              width: `${scrollProgress * 100}%`,
            }}
          />
        </div>
      )}

    </div>
  );
};


// notes

// Use it like this 👇

// const CustomArrow = ({ direction, onClick }) => (
//   <button
//     onClick={onClick}
//     className="w-11 h-11 rounded-full border bg-white flex items-center justify-center shadow"
//   >
//     {direction === "prev" ? "←" : "→"}
//   </button>
// );
{/* <EmblaSlider
  renderArrow={CustomArrow}
/> */}

// const EmblaSlider = lazy(() => import("../utility/EmblaSlider"));

// <Suspense fallback={<div className="p-24 text-center">Loading...</div>}>
//   <EmblaSlider
//     items={images}
//     renderSlide={(item) =><Card key={item.id} item={item} />}
//     autoplay
//     autoplayDelay={3000}
//     loop = {true}
//     arrows={true}
//     arrowPosition="bottom-right"
//     showCounter={true}
//     counterPosition='top-right'
//     slidesPerView={{
//       base: 1,
//       sm: 2,
//       md: 3,
//       lg: 4,
//     }}
//     viewportPadding='p-2'
//     gap={20}
//   />
// </Suspense>
