import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  housePic_1,
  housePic_2,
  housePic_3,
  housePic_4,
  housePic_5,
  housePic_6,
  housePic_7,
  housePic_8,
  housePic_9,
} from "../../assets";
const Slideshow = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    animation: slide 30s ease-in-out infinite;

    &.active {
      opacity: 1;
      z-index: 2;
    }

    span {
      display: block;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
  }
`;

function SlideshowComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const urls = [
    housePic_1,
    housePic_2,
    housePic_3,
    housePic_4,
    housePic_5,
    housePic_6,
    housePic_7,
    housePic_8,
    housePic_9,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [urls]);

  return (
    <Slideshow>
      {urls.map((url, index) => (
        <li key={index} className={index === activeIndex ? "active" : ""}>
          <span style={{ backgroundImage: `url(${url})` }}></span>
        </li>
      ))}
    </Slideshow>
  );
}

export default SlideshowComponent;
