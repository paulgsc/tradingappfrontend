import { useState, useEffect, useRef } from "react";

// custom hook to animate open and close accordian
export const useAccordion = (totalItems, interval = 15000) => {
  const [openIndex, setOpenIndex] = useState(0); // store the id of the open accordian
  const [isFocused, setIsFocused] = useState(false); // monitor focus

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isFocused) {
        setOpenIndex((prevIndex) => (prevIndex + 1) % totalItems);
      }
    }, interval); // 15 seconds interval

    if (isFocused) clearInterval(intervalId); // clear the interval animation on focus

    return () => clearInterval(intervalId);
  }, [isFocused, totalItems, interval]);

  const handleFocus = (index) => {
    setOpenIndex(index);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return [openIndex, handleFocus, handleBlur];
};

export const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
  });
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      const { width, height, top, bottom } = entries[0].contentRect;
      setDimensions({ width, height, top, bottom });
    });
    observer.current.observe(ref.current);

    return () => observer.current.disconnect();
  }, [ref]);

  return dimensions;
};
