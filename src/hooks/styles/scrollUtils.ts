import React from "react";

export const useScrollVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
};
