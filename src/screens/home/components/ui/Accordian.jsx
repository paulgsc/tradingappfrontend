import { AngleDownSVG } from "../../../../constants/svgs/Svg";

function AccordianHeroCard({ content, handleFocus, handleBlur, openIndex }) {
  return (
    <div className="w-11/12 max-md:p-1.5 md:w-5/12 2xl:w-full 2xl:max-w-screen-sm border-t ">
      {content.map((item, i) => (
        <section
          key={i}
          tabIndex={-1}
          onFocus={() => {
            handleFocus(i);
          }}
          onBlur={handleBlur}
          aria-expanded={openIndex === i}
          className="relative group w-full h-fit max-h-96 border-t-2 border-slate-300 rouned-lg px-6 aria-expanded:py-6 aria-expanded:border-none"
        >
          <div
            aria-expanded={openIndex === i}
            className=" group-focus-within:hidden loader absolute inset-x-0 inset-y-3 w-full opacity-0 aria-expanded:opacity-100 rounded-md shadow-md bg-stone-50 pointer-events-none -z-10"
          />
          <div
            aria-expanded={openIndex === i}
            className="hidden group-focus-within:block absolute inset-x-0 inset-y-3 w-full opacity-0 aria-expanded:opacity-100 rounded-md shadow-md bg-stone-100 pointer-events-none -z-10"
          />

          <details
            open={i === openIndex}
            className="relative peer group list-none px-2 py-0.5 md:py-1.5 h-fit md:peer-open:h-20 cursor-pointer w-full"
          >
            <summary className="inline-flex items-center justify-between w-full text-left">
              <h3 className="md:text-lg font-bold">{item.title}</h3>{" "}
              <AngleDownSVG
                className={
                  "w-4 h-4 group-open:w-6 group-open:h-6 text-gray-600 group-open:text-gray-950 rotate-180 group-open:rotate-0 transition-all duration-500"
                }
              />
            </summary>
          </details>
          <main className="w-full h-0 peer-open:flex flex-col flex-1 p-2 blur-sm opacity-0 scale-0 peer-open:h-fit peer-open:md:h-72 peer-open:scale-100 peer-open:blur-none peer-open:opacity-100 transition-transform duration-300 ease-linear">
            {item.content}
          </main>
        </section>
      ))}
    </div>
  );
}

export default AccordianHeroCard;
