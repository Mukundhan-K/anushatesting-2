import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  // 1. Check if we are in a browser environment to prevent SSR errors
  const isServer = typeof window === "undefined";

  // 2. Initialize state safely
  const [matches, setMatches] = useState(() => {
    if (isServer) return false;
    return window?.matchMedia(query)?.matches;
  });

  useEffect(() => {
    if (isServer) return;

    const media = window?.matchMedia(query);
    
    // 3. Update state if the query changes immediately
    if (media?.matches !== matches) {
      setMatches(media?.matches);
    }

    const listener = (event) => setMatches(event?.matches);

    // 4. Use modern event listener (supported in all modern browsers)
    media.addEventListener("change", listener);
    
    return () => media?.removeEventListener("change", listener);
  }, [query, isServer]); // Adding isServer to dependencies for consistency

  return matches;
};

// const islwLg = useMediaQuery("(max-width: 1024px)");
// const isLg = useMediaQuery("(min-width: 1024px)");
