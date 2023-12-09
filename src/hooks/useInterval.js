import { useState, useEffect } from "react";

const useInterval = (callback, delay) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      if (intervalId) clearInterval(intervalId);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, delay);
    }, delay); // Adjust this multiplier if needed

    return () => intervalId && clearInterval(intervalId);
  }, [delay, callback]);

  return isVisible;
};

export default useInterval;
