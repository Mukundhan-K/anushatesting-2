import React from 'react';

const MarqueeComponent = ({ 
  children, 
  reverse = false, 
  pauseOnHover = true, 
  className = "", 
  speed = "30s" 
}) => {
  const directionClass = reverse ? "flex-shrink-0 flex items-center gap-[var(--gap)] animate-scroll-reverse" : "flex-shrink-0 flex items-center gap-[var(--gap)] animate-scroll";

  return (
    <div 
      className={`group flex overflow-hidden user-select-none gap-[var(--gap)] ${className}`}
      style={{ '--gap': '20px', '--speed': speed }}
    >
      {/* Render the content twice for seamless looping */}
      <div className={`${directionClass} ${pauseOnHover ? 'group-hover:m-paused ' : ''}`}>
        {children}
      </div>
      <div className={`${directionClass} ${pauseOnHover ? 'group-hover:m-paused ' : ''}`} aria-hidden="true">
        {children}
      </div>
    </div>
  );
};

export default MarqueeComponent;