import React from 'react';
import { useNavigate } from "react-router-dom";

const EmailSuccess = () => {
  const navigate = useNavigate();
  return (
    <section className='bg-bg-brown'>
      <div className='container mx-auto px-4'>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          
          {/* Custom SVG Envelope Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-50 rounded-full scale-150 blur-xl opacity-60"></div>
            <svg 
              width="160" 
              height="120" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Envelope Body */}
              <path 
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" 
                fill="#FF8C00" // Pink/Red color from your image
                stroke="#026f41" // Dark blue outline
                strokeWidth="1.5"
              />
              {/* Envelope Flap/Inside */}
              <path 
                d="M22 6L12 13L2 6" 
                stroke="#026f41" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Document sticking out */}
              <rect x="8" y="2" width="8" height="8" rx="1" fill="white" stroke="#1E3A8A" strokeWidth="1" />
              <line x1="10" y1="5" x2="14" y2="5" stroke="#1E3A8A" strokeWidth="1" />
              <line x1="10" y1="7" x2="14" y2="7" stroke="#1E3A8A" strokeWidth="1" />
            </svg>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-a-royalsafforn mb-4">
            Mail Sent Successfully!
          </h1>
          
          <p className="text-gray-500 text-lg mb-10">
            Thank you for reaching out. We have received your inquiry and a member of our team will get back to you within 24 hours.
          </p>

          {/* Back Home Button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-a-green hover:bg-a-green/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-200 shadow-lg"
          >
            <span>&larr;</span> Back Home
          </button>

          {/* Footer Support */}
          <p className="mt-12 text-gray-400 text-sm">
            If you have any issues <a href="/contact" className="text-[#1E293B] font-semibold hover:underline">contact us</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSuccess;