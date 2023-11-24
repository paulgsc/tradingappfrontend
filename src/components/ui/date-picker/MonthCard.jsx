import { useState, useEffect } from "react";
import { calendarMonths } from "../../../constants/initDate";
import { AngleDownSVG } from "../../../constants/svgs/Svg";

export default function MonthCard() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [showAnimation, setShowAnimation] = useState(false);
  const handleNext = () => {
    setYear((prevYear) => {
      if (prevYear >= currentYear + 2) return prevYear;
      setShowAnimation(true);
      return Math.min(currentYear + 2, prevYear + 1);
    });
  };
  const handlePrev = () => {
    setYear((prevYear) => {
      if (prevYear === currentYear) return prevYear;
      setShowAnimation(true);
      return Math.max(currentYear, prevYear - 1);
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      timer && setShowAnimation(false);
    }, 1200);
    // Clear the timeout when the component is unmounted or when the dependency (year) changes
    return () => {
      clearTimeout(timer);
    };
  }, [year]);
  return (
    <div className=" z-50 hidden group-focus-within:block absolute start-0 top-12 w-screen max-w-xs backdrop-blur bg-white">
      <nav className="flex flex-1 items-center justify-between p-2 px-6">
        <h3>{year}</h3>
        <div className="inline-flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="w-fit scale-95 hover:scale-100"
          >
            <AngleDownSVG className="h-3 w-3 hover:text-neutral-500 text-neutral-400 rotate-90" />
          </button>
          <button
            onClick={handleNext}
            className="w-fit scale-95 hover:scale-100"
          >
            <AngleDownSVG className="h-3 w-3 hover:text-neutral-500 text-neutral-400 -rotate-90" />
          </button>
        </div>
      </nav>
      <div className="w-full">
        <ul
          aria-selected={showAnimation}
          className="grid grid-cols-3 w-full relative after:hidden aria-selected:after:block after:absolute after:inset-0 after:backdrop-blur-sm after:bg-gradient-to-r after:from-neutral-50 after:via-transparent after:to-neutral-50 after:animate-shine overflow-hidden"
        >
          {calendarMonths.map((month) => (
            <li
              key={month.id}
              className={`border-b h-14 w-full text-center inline-flex items-center justify-center`}
            >
              <p className="text-sm capitalize font-medium text-neutral-400">
                {month.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
