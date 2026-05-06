import { useEffect, useRef } from "react";
import { getImageSvg } from "../../utility/getImage";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 }); // Target position
  const currentPos = useRef({ x: 0, y: 0 }); // Actual element position

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let rafId;
    const render = () => {
      // Linear Interpolation (0.1 = 10% of the distance traveled per frame)
      // This creates the "smooth follow" effect
      const lerpAmount = 0.15;
      
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpAmount;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpAmount;

      if (cursorRef.current) {
        // Offset by -20px (half of size-10) to center the image on the tip
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x - 35}px, ${currentPos.current.y - 35}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden sm:block fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
    >
      <img
        src={getImageSvg("cap")}
        alt="Cursor Follower"
        className="size-10 object-contain"
      />
    </div>
  );
}