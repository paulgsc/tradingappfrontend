import { useState, useEffect } from "react";
import styled from "styled-components";
const Slideshow = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
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
    animation: slide 90s ease-in-out infinite;

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
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81rG_9ULYOg8LBlY2fSqm8WCIbh46P5_KBtLMvFbqFgekXC-upCjSeX2lPjlWwmO1RzeX5HUgmPSAwEFAjXQkWiYO2vWiw=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81qeMTNF-Kn1EWyBM41hwkv6FBOlHT6FObD_gB6NjZT21pzqlF4zEd8PCxQkl5fEBhAj4dXiWtuTmR97ujOhVOcxBw2lxg=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81rp-ccytLKrflgAKNQutm2zxXvwVtVIwmiW2vth5rwHKr39zp0WfehcO8n7yJhU4fjAGgLLy4RO5Ru_ObY9hHxQ6UHD-g=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81owyPWmtzNGCjZL-6vY75tvaIxbl_nMozUVEjJhHq2_3GOvz8It99hzEzyz5tbUXlEzKzOfwn30LG_LJ5iJn4CbX6Xf=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81pjgH5UsLQa-YHrlYNscfS4Xaq7p4bAYxgEl2jPfrDiKKnMr2sy5NLK4dKap8bIvC2J4Z9dLcrqfd4ybz1LySIpLKCk=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81pctQf_Y9VunzjOjNZc_46RPV6pibFT8nI3800YOnvuF-8iI80SwLOGPFiky9MzzCnFjYc4mVhxwFaFku9CNK7_XbUaMg=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81pANK70JeQ_Ioz63AZPpAxXstp9CG4DJO8bWZXEIE7jrRoHDCXSmHWjXOe7yJTKijqa6pdhrlRn-OcW469VulmrSS8VDg=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81qcI7PeK5TO00xhqhXQ6MCxIyEwVRj8fu8rxYTwXig1oA9oBMnCI41aN996HnsGGF7CrY_dhgdH5akP_mW6jDWQSP3G=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AFGJ81r5Une4VnyStWbCam3LnCGUPM7kYScO5d6hXI7hI1sXE1T89hEnuD2_aUpNyL7hIJ2VCX-kP8KFlaKo7Zr7fJZ0BIyvTQ=s1600",
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
