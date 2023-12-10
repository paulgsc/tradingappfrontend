function AnimatedTextSVG({ className, text }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 125 45"
    >
      <defs>
        <linearGradient
          id="text-shimmer"
          x1="-100%"
          y1="0"
          x2="300%"
          y2="0"
          gradientTransform="rotate(10)"
        >
          <stop offset="0" stopColor="black">
            <animate
              attributeName="offset"
              values="0;0.95"
              dur="4.2s"
              repeatCount="indefinite"
              begin="ourstory.mouseover"
              end="ourstory.mouseleave"
            />
          </stop>
          <stop offset="0.1" stopColor="rgba(255, 255, 255, 0.2)">
            <animate
              attributeName="offset"
              values="0;1"
              dur="4.2s"
              repeatCount="indefinite"
              begin="ourstory.mouseover"
              end="ourstory.mouseleave"
            />
          </stop>
          <stop offset="0.1" stopColor="black">
            <animate
              attributeName="offset"
              values="0.05;1"
              dur="4.2s"
              repeatCount="indefinite"
              begin="ourstory.mouseover"
              end="ourstory.mouseleave"
            />
          </stop>
        </linearGradient>
      </defs>
      <text
        id="ourstory"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="url(#text-shimmer)"
      >
        {text}
      </text>
    </svg>
  );
}

export default AnimatedTextSVG;
