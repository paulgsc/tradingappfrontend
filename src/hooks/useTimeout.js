import { useState, useEffect } from "react";

const useTimeout = (callback, delay) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(true);
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, callback]);

  return isVisible;
};

export default useTimeout;
