import { motion, cubicBezier } from "framer-motion";

function FalingLeafFramer({ posY }) {
  const easeLeafFall = (t) => {
    return cubicBezier(0.17, 0.23, 0.08, 0.14)(t);
  };

  return (
    <motion.g
      style={{
        position: "absolute",
        top: 0,
        left: 500,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
      animate={{ y: posY, rotate: Math.random() * 360 }}
      transition={{
        duration: 4.6,
        ease: easeLeafFall,
        repeat: Infinity,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    </motion.g>
  );
}

export default FalingLeafFramer;
