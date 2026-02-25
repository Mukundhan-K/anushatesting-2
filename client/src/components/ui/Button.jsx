import React from 'react';

const Button = ({ outcls, bttype = "button", btnonclick, text = "start sketching", btnHide = true }) => {
  if (!btnHide) return null;

  return (
    <>
      <div className={`group relative flex items-center justify-center ${outcls}`}>
        <div className="btn-wrapper">
          {/* Decorative Elements */}
          <div className="line horizontal top"></div>
          <div className="line vertical right"></div>
          <div className="line horizontal bottom"></div>
          <div className="line vertical left"></div>

          <div className="dot top left"></div>
          <div className="dot top right"></div>
          <div className="dot bottom right"></div>
          <div className="dot bottom left"></div>

          {/* Animated Background Grid (appears on hover) */}
          <div className="absolute inset-0 opacity-0 group-hover:animate-[opacity-anim_1.4s_ease-in-out_forwards] pointer-events-none z-0"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #026f4122 0 1px, transparent 2px 5px)' }}>
          </div>

          {/* Main Button */}
          <button type={bttype} onClick={btnonclick} className="btn">
            <span>{text}</span>
            <svg className="btn-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6744 11.4075L15.7691 17.1233C15.7072 17.309 15.5586 17.4529 15.3709 17.5087L3.69348 20.9803C3.22819 21.1186 2.79978 20.676 2.95328 20.2155L6.74467 8.84131C6.79981 8.67588 6.92419 8.54263 7.08543 8.47624L12.472 6.25822C12.696 6.166 12.9535 6.21749 13.1248 6.38876L17.5294 10.7935C17.6901 10.9542 17.7463 11.1919 17.6744 11.4075Z" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3.2959 20.6016L9.65986 14.2376" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17.7917 11.0557L20.6202 8.22724C21.4012 7.44619 21.4012 6.17986 20.6202 5.39881L18.4989 3.27749C17.7178 2.49645 16.4515 2.49645 15.6704 3.27749L12.842 6.10592" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M11.7814 12.1163C11.1956 11.5305 10.2458 11.5305 9.66004 12.1163C9.07426 12.7021 9.07426 13.6519 9.66004 14.2376C10.2458 14.8234 11.1956 14.8234 11.7814 14.2376C12.3671 13.6519 12.3671 12.7021 11.7814 12.1163Z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .btn-wrapper {
          --dot-size: 8px;
          --line-weight: 1px;
          --line-distance: 0.8rem 1rem;
          --animation-speed: 0.35s;
          --dot-color: #026f41;
          --line-color: #026f41aa;
          --grid-color: #026f4122;

          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
          padding: var(--line-distance);
          background-color: transparent;
          user-select: none;
        }

        .btn-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(45deg, var(--grid-color) 0 1px, transparent 2px 5px);
          opacity: 0;
          z-index: -1;
        }

        .btn-wrapper:has(.btn:hover)::after {
          animation: opacity-anim calc(var(--animation-speed) * 4) ease-in-out forwards;
        }

        .btn {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.8rem 1.25rem;
          background-color: #026f41;
          border: 1px solid var(--grid-color);
          color: #fff;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          text-transform: capitalize;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .btn:hover {
          background-color: #026f41;
          color: #fff;
          transform: scale(1.05);
          letter-spacing: 0.06em;
        }

        .btn:active { transform: scale(0.98); }

        .btn-svg {
          margin-left: 0.5rem;
          height: 24px;
          stroke-width: 1.5;
          stroke: #fff;
          fill: #fff3;
          transition: all 0.2s ease-in-out;
        }

        /* Dot Animations */
        .dot { position: absolute; width: var(--dot-size); aspect-ratio: 1; border-radius: 2px; background-color: var(--dot-color); opacity: 0; transition: all 0.3s; }
        
        .btn-wrapper:has(.btn:hover) .dot.top.left { top: 50%; left: 20%; animation: move-top-left var(--animation-speed) ease-in-out forwards; }
        .btn-wrapper:has(.btn:hover) .dot.top.right { top: 50%; right: 20%; animation: move-top-right var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 0.6); }
        .btn-wrapper:has(.btn:hover) .dot.bottom.right { bottom: 50%; right: 20%; animation: move-bottom-right var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 1.2); }
        .btn-wrapper:has(.btn:hover) .dot.bottom.left { bottom: 50%; left: 20%; animation: move-bottom-left var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 1.8); }

        @keyframes move-top-left { 100% { top: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; } }
        @keyframes move-top-right { 100% { top: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; } }
        @keyframes move-bottom-right { 100% { bottom: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; } }
        @keyframes move-bottom-left { 100% { bottom: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; } }

        /* Line Animations */
        .line { position: absolute; transition: all 0.3s ease-in-out; }
        .line.horizontal { height: var(--line-weight); width: 100%; background-image: repeating-linear-gradient(90deg, transparent 0 2px, var(--line-color) 2px 4px); }
        .line.vertical { width: var(--line-weight); height: 100%; background-image: repeating-linear-gradient(0deg, transparent 0 2px, var(--line-color) 2px 4px); }
        
        .line.top { top: -0.5px; transform-origin: left; transform: scaleX(0); }
        .line.right { right: -0.5px; transform-origin: top; transform: scaleY(0); }
        .line.bottom { bottom: -0.5px; transform-origin: right; transform: scaleX(0); }
        .line.left { left: -0.5px; transform-origin: bottom; transform: scaleY(0); }

        .btn-wrapper:has(.btn:hover) .line.top { animation: draw-line var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 0.8); }
        .btn-wrapper:has(.btn:hover) .line.right { animation: draw-line var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 1.4); }
        .btn-wrapper:has(.btn:hover) .line.bottom { animation: draw-line var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 2); }
        .btn-wrapper:has(.btn:hover) .line.left { animation: draw-line var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 2.4); }

        @keyframes draw-line { 100% { transform: scale(1); } }
        @keyframes opacity-anim { 100% { opacity: 1; } }
      `}</style>

    </>
  );
};

export default Button;