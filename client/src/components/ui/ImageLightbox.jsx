import { useEffect } from "react";
import { getImageSvg } from "../../utility/getImage";

const ImageLightbox = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const total = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:scale-110 transition"
      >
        X
      </button>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 transition"
      >
        <img src={getImageSvg("arrow-white")} className="size-7" loading='lazy' alt={`arrow icon`} title={`icon of arrow`} />
      </button>

      {/* Image */}
      <div className="max-w-5xl w-full px-4">
        <img
          src={images[currentIndex]}
          alt="Gallery"
          className="w-full max-h-[80vh] object-contain rounded-2xl transition-all duration-500 ease-in-out"
          loading="lazy"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 transition"
      >
        <img src={getImageSvg("arrow-white")} className="size-7 rotate-180" loading='lazy' alt={`arrow icon`} title={`icon of arrow`} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-md">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
};

export default ImageLightbox;
