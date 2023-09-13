import { useState, useEffect } from "react";

function TypingEffect({ message }) {
  const [index, setIndex] = useState(0);
  const currentMessage = message?.slice(0, index);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % message?.length);
    }, 120);

    return () => {
      clearInterval(intervalId);
    };
  }, [message]);

  return (
    <div className="overflow-hidden whitespace-nowrap text-white capitalize bg-[#ff5e00] w-52 p-3 rounded-md">
      <span className="border-r-2">{currentMessage}</span>
    </div>
  );
}

export default TypingEffect;
