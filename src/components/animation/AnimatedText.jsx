import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TypingEffect from "./TypingEffect";

function AnimatedText() {
  const [index, setIndex] = useState(0);
  const messages = [
    "Start Investing Today!",
    "Buy shares, earn dividends.",
    "Sign up for exclusive deals.",
  ];

  useEffect(() => {
    const messagesIntervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 6000);

    return () => {
      clearInterval(messagesIntervalId);
    };
  }, []);
  return <TypingEffect message={messages[index]} />;
}

export default AnimatedText;
