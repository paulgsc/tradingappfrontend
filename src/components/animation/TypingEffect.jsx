import React, { useState, useEffect } from "react";
import "../../test.css";

function TypingEffect({ message }) {
  const [index, setIndex] = useState(0);
  const currentMessage = message?.slice(0, index);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      !clear && setIndex((prevIndex) => (prevIndex + 1) % message?.length);
    }, 120);
    return () => {
      clearInterval(intervalId);
    };
  }, [clear]);

  useEffect(() => {
    if (index === message.length - 1) {
      setClear(true);
    }
  }, [index]);

  useEffect(() => {
    setClear(false);
    setIndex(0);
  }, [message]);

  return (
    <div className="overflow-hidden whitespace-nowrap text-white capitalize bg-[#ff5e00] w-52 p-3 rounded-md">
      <span
        class={`${
          clear ? "" : "border-r-2"
        } animate-[blinkcaret_step-end_0.75s_infinite]`}
      >
        {currentMessage}
      </span>
    </div>
  );
}

export default TypingEffect;
