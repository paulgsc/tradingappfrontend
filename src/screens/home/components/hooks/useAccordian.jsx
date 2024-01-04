import { useState, useEffect } from "react";

// custom hook to animate open and close accordian
export const useAccordion = (totalItems, interval = 15000, imagesLength) => {
  const [openIndex, setOpenIndex] = useState(0); // store the id of the open accordian
  const [isFocused, setIsFocused] = useState(false); // monitor focus
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // store the id of the image index

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isFocused) {
        setOpenIndex((prevIndex) => (prevIndex + 1) % totalItems);
      }
    }, interval); // 15 seconds interval

    if (isFocused) clearInterval(intervalId); // clear the interval animation on focus

    return () => clearInterval(intervalId);
  }, [isFocused, totalItems, interval]);

  useEffect(() => {
    let intervalId;
    // listen for changes in openIndex to sync with animation above
    if (intervalId) {
      clearInterval(intervalId); // clear old interval
      setCurrentImageIndex(0); // set back to first index
    }
    // give uniform duration to each image
    const duration = interval / imagesLength;
    intervalId = setInterval(() => {
      // Increment the image index, and loop back to 0 if reached the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
    }, duration); // 30 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [imagesLength, interval, openIndex]);

  const handleFocus = (index) => {
    setOpenIndex(index);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return [openIndex, handleFocus, handleBlur, currentImageIndex];
};
