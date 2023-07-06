import React, { useEffect, useRef } from "react";
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

function Caraousel() {
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const carouselItems = document.querySelectorAll("[data-carousel-item]");
    const carouselIndicators = document.querySelectorAll(
      "[data-carousel-slide-to]"
    );
    const carouselPrevBtn = document.querySelector("[data-carousel-prev]");
    const carouselNextBtn = document.querySelector("[data-carousel-next]");

    let currentIndex = 0;

    function showSlide(index) {
      carouselItems.forEach((item, i) => {
        item.style.opacity = i === index ? "1" : "0";
        item.style.transition = "opacity 0.7s ease-in-out"; // Added opacity transition
      });

      carouselIndicators.forEach((indicator, i) => {
        indicator.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function handlePrevClick() {
      currentIndex =
        (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      showSlide(currentIndex);
    }

    function handleNextClick() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      showSlide(currentIndex);
    }

    function handleIndicatorClick(event) {
      const targetIndex = parseInt(
        event.target.getAttribute("data-carousel-slide-to")
      );
      if (!isNaN(targetIndex)) {
        currentIndex = targetIndex;
        showSlide(currentIndex);
      }
    }

    if (carouselPrevBtn) {
      carouselPrevBtn.addEventListener("click", handlePrevClick);
    }

    if (carouselNextBtn) {
      carouselNextBtn.addEventListener("click", handleNextClick);
    }

    carouselIndicators.forEach((indicator) => {
      indicator.addEventListener("click", handleIndicatorClick);
    });

    // Show initial slide
    showSlide(currentIndex);

    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        currentIndexRef.current =
          (currentIndexRef.current + 1) % carouselItems.length;
        showSlide(currentIndexRef.current);
      }, 3000);
    };

    const stopAutoSlide = () => {
      clearInterval(intervalRef.current);
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("mouseenter", stopAutoSlide);
      carouselRef.current.addEventListener("mouseleave", startAutoSlide);
      startAutoSlide();
    }

    return () => {
      if (carouselPrevBtn) {
        carouselPrevBtn.removeEventListener("click", handlePrevClick);
      }

      if (carouselNextBtn) {
        carouselNextBtn.removeEventListener("click", handleNextClick);
      }

      carouselIndicators.forEach((indicator) => {
        indicator.removeEventListener("click", handleIndicatorClick);
      });

      if (carouselRef.current) {
        carouselRef.current.removeEventListener("mouseenter", stopAutoSlide);
        carouselRef.current.removeEventListener("mouseleave", startAutoSlide);
        stopAutoSlide();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
        ref={carouselRef}
      >
        <div className="relative overflow-hidden rounded-lg  h-[440px] md:h-[524px] lg:h-[440px] xl:h-[524px]">
          <Images images={urls} />
        </div>

        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          <Indicators indicators={urls} />
        </div>

        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}

const Images = ({ images }) => {
  return (
    <>
      {images.map((image, i) => (
        <div
          key={i}
          className="  opacity-0 transition-opacity duration-700 ease-in-out"
          data-carousel-item
        >
          <img
            src={image}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            title="hover to pause"
          />
        </div>
      ))}
    </>
  );
};

const Indicators = ({ indicators }) => {
  return (
    <>
      {indicators.map((_, i) => (
        <button
          key={i}
          type="button"
          className="z-50 bg-slate-300 w-3 h-3 rounded-full"
          aria-current="true"
          aria-label={`Slide ${i}`}
          data-carousel-slide-to={i}
        ></button>
      ))}
    </>
  );
};

export default Caraousel;
