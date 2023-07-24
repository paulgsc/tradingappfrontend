import React, { useState, useRef, useEffect } from "react";

function Test() {
  const [showTooltip, setShowTooltip] = useState(false);
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Attach event listeners when the component mounts
  useEffect(() => {
    const targetElement = targetRef.current;
    const tooltipElement = tooltipRef.current;

    if (targetElement && tooltipElement) {
      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up event listeners when the component unmounts
    return () => {
      if (targetElement && tooltipElement) {
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center py-20">
      <div class="relative px-4 h-8 flex justify-center items-center rounded-lg bg-gray-800">
        <div className=" h-full overflow-clip ">
          <span className="text-xs text-white font-normal">some message</span>
        </div>
        <div class="z-10 absolute bottom-0 -translate-x-[6px] translate-y-[9px] left-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-gray-800 border-r-[6px] border-r-transparent "></div>
      </div>
    </div>
  );
}

export default Test;
