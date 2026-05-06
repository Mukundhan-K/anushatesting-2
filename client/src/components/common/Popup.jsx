import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import CommonForm from "./CommonForm";
import { getImageSvg } from "../../utility/getImage";

const Popup = ({ isOpen, onClose, title, children, otrcss, width }) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      
      // Cleanup function ensures scroll is restored even if component unmounts unexpectedly
      return () => {
        document.body.style.overflow = originalStyle || "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[5555] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl w-full 
          ${width ? width : 'max-w-[600px]'} 
          my-auto min-h-fit 
          transition-all duration-300 transform
          ${otrcss ? otrcss : 'p-6 lg:py-10 lg:px-12'}`}
      >
        {/* Close Icon - Improved hit area for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <span className="text-2xl leading-none">✕</span>
        </button>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};


export default Popup;