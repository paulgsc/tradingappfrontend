import React from "react";

function CircularProgresBar({ radius, strokeColor, percentage }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage);

  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - 4} // Adjust this value to control the thickness of the bar
        fill="none"
        stroke="#ccc" // Background color
        strokeWidth="8"
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - 4}
        fill="none"
        stroke={strokeColor}
        strokeWidth="8"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${radius} ${radius})`} // Rotate the circle by -90 degrees
      />
    </svg>
  );
}

export default CircularProgresBar;
