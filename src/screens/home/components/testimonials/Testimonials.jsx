import TestimonialCard from "./TestimonialCard";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialsNavBtns from "./TestimonialsNavBtns";
import { useState } from "react";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonialsCnt = 10;

  return (
    <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8 ">
      <div className="max-w-screen w-full overflow-hidden grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16 ">
        <div className="z-10 max-w-xl text-center ltr:sm:text-left rtl:sm:text-right space-y-4">
          <TestimonialHeader />
          <TestimonialsNavBtns
            setIndex={setIndex}
            maxIndex={(testimonialsCnt - 1) * 100}
          />
        </div>
        <div className="col-span-2 inline-flex items-center flex-1 mr-6 xl:mr-12 overflow-hidden">
          {Array(testimonialsCnt)
            .fill("")
            .map((_, i) => (
              <TestimonialCard
                key={i}
                className={`transform duration-500 ease-in-out`}
                index={index}
                content={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
