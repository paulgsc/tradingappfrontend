import "intersection-observer";
import { useState, useRef, useEffect } from "react";
import TimeLineTitle from "./TimeLineTitle";
import EventCard from "./EventCard";
import FallingLeaves from "../../../../components/animation/FallingLeaves";

export default function TimeLine() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState();
  const [hideAnimation, setHideAnimation] = useState(false);
  const containerRef = useRef(null);
  const scrollCartRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setHideAnimation(true);
      // Add a delay to set scrolling back to false after some time
      setTimeout(() => setHideAnimation(false), 3000);
      if (containerRef.current) {
        if (scrollCartRef.current) {
          const scrollCartRect = scrollCartRef.current.getBoundingClientRect();
          if (timelineRef.current) {
            const listItems = Array.from(
              timelineRef.current.querySelectorAll("li")
            );

            const intersectingList = listItems.find((listItem) => {
              const listRect = listItem.getBoundingClientRect();
              const scrollY = scrollCartRect.top;
              const listY = listRect.top;
              const delta = Math.abs((scrollY - listY) / listY) <= 0.1;
              return delta;
            });
            setIsIntersecting((prevIsIntersecting) => {
              if (prevIsIntersecting) {
                const data = {
                  ...prevIsIntersecting,
                };
                if (intersectingList)
                  return {
                    ...data,
                    id: intersectingList.id,
                    instersects: true,
                  };
                return { ...data, instersects: false };
              } else {
                if (intersectingList)
                  return { id: intersectingList.id, instersects: true };
                return { instersects: false };
              }
            });
          }
        }
        setScrollPosition(containerRef.current.scrollTop);
      }
    };
    if (containerRef.current)
      containerRef.current.addEventListener("scroll", handleScroll);

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <article
      ref={containerRef}
      className="relative h-[40rem] w-full max-w-6xl overflow-y-auto bg-gradient-to-br from-indigo-100 via-slate-200/80 to-blue-100"
    >
      <div className="absolute max-2xl:-translate-y-full 2xl:-top-full min-h-screen ">
        {isIntersecting?.instersects && !hideAnimation && <FallingLeaves />}
      </div>
      <div className="w-0 h-20" />
      <div className="flex justify-center items-center">
        <div className="relative w-full">
          <div
            ref={scrollCartRef}
            id="scroll-cart"
            style={{ top: scrollPosition }}
            className={`${
              isIntersecting?.instersects && "opacity-0"
            } z-10 w-0.5 h-12 absolute left-1/2 -translate-x-[0.0625rem] bg-yellow-50`}
          ></div>
          <ul
            ref={timelineRef}
            className="flex flex-col justify-center items-center gap-96 w-full"
          >
            {Array(10)
              .fill("")
              .map((_, i) => (
                <li
                  id={`timeline-${i}`}
                  key={i}
                  className={`group w-full flex odd:flex-row-reverse last:pointer-events-none last:blur-sm last:-z-10`}
                >
                  <div className="w-6/12 relative ">
                    <EventCard
                      isIntersecting={
                        !!isIntersecting?.instersects &&
                        `timeline-${i}` === isIntersecting.id
                      }
                    />
                  </div>
                  <div
                    className={` h-4 w-4 rounded-full border-black ring-4 ${
                      isIntersecting?.instersects &&
                      `timeline-${i}` === isIntersecting.id
                        ? "ring-blue-400"
                        : "ring-zinc-300"
                    } hover:bg-indigo-100 relative before:absolute before:left-[.45rem] before:top-0 before:-translate-y-full before:h-60
              before:w-0.5 after:absolute after:bottom-0 after:left-[0.45rem] after:translate-y-full ${
                i === 9 ? "after:h-[30rem]" : "after:h-96"
              } after:w-0.5 after:bg-gray-300 before:bg-gray-300`}
                  ></div>
                  <div className="relative w-6/12">
                    <TimeLineTitle />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
