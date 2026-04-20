import * as React from "react";

const MOBILE_BREAKPOINT = 768;


export function useIsMobile() {
  const getIsMobile = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
  };
  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile());

  React.useEffect(() => {
    const update = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    update();
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return isMobile;
}
