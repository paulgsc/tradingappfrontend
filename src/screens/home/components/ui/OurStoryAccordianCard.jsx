import { useState } from "react";
import { AngleDownSVG } from "../../../../constants/svgs/Svg";

function OurStoryAccordianCard({ content }) {
  const [openIdxs, setOpenIdxs] = useState([]);
  const handleMouseEnter = (id) => {
    if (openIdxs.includes(id)) return;
    setOpenIdxs((prevOpenIdxs) => [...prevOpenIdxs, id]);
  };
  const handleMouseLeave = (id) => {
    setOpenIdxs((prevOpenIdxs) => prevOpenIdxs.filter((idx) => idx !== id));
  };
  return (
    <div className="w-full space-y-4">
      {content.map((item, i) => (
        <section
          key={i}
          tabIndex={-1}
          aria-expanded={openIdxs.includes(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
          className="relative group w-full h-fit space-y-6 border-b-2 rouned-lg px-6 aria-expanded:py-6 aria-expanded:border-none"
        >
          <details
            open={openIdxs.includes(i)}
            className="relative peer group list-none px-2 py-0.5 md:py-1.5 h-20 lg:h-24 cursor-pointer w-full"
          >
            <summary className="inline-flex items-center justify-start space-x-6 w-full text-left">
              <span
                aria-hidden={true}
                className="p-2.5 inline-flex items-center justify-center rounded-full bg-gray-600 group-open:bg-gray-950"
              >
                <AngleDownSVG
                  className={
                    "w-4 h-4 group-open:w-6 group-open:h-6 text-white rotate-180 group-open:rotate-0 transition-all duration-500"
                  }
                />
              </span>
              <h3 className="md:text-xl lg:text-2xl xl:text-3xl tracking-wide font-bold">
                {item.title}
              </h3>
            </summary>
          </details>
          <main className="w-full hidden peer-open:flex flex-col flex-1 p-2 mb-6 border-t-2 border-l-2 border-slate-400 rounded-l-lg peer-open:h-fit transition-transform duration-700 ease-linear">
            {item.content}
          </main>
        </section>
      ))}
    </div>
  );
}

export default OurStoryAccordianCard;
