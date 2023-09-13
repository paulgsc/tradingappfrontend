import { useState, useEffect } from "react";
import TypingEffect from "./TypingEffect";

const messages = [
  "Start Investing Today!",
  "Buy shares, earn dividends.",
  "Sign up for exclusive deals.",
];

function AnimatedText() {
  const [index, setIndex] = useState(0);

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
