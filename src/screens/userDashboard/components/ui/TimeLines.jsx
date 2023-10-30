import { AngleDownSVG } from "../../../../constants/svgs/Svg";
import TimelineCard from "./TimelineCard";
function TimeLines({ timeline }) {
  return (
    <section className="items-start gap-12 w-full">
      <details
        open
        className="sticky top-10 z-10 peer group list-none  p-2 lg:p-3 xl:p-4 cursor-pointer w-full open:border-b open:border-gray-600/20 open:bg-[#e6f7e0]"
      >
        <summary className="inline-flex items-center flex-row-reverse max-w-fit text-center gap-4 p-1">
          <h3 className="inline-flex items-center justify-start space-x-2 text-base capitalize text-teal-900">
            <span>
              <svg
                className="w-3 h-3 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 10h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H17M1 10v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M1 10l2-9h12l2 9"
                />
              </svg>
            </span>
            <span> {`timeline ${timeline}`}</span>
          </h3>{" "}
          <AngleDownSVG
            className={
              "opacity-0 group-open:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 w-3 h-3 text-neutral-400 rotate-180 group-open:rotate-0 transition-all duration-300"
            }
          />
        </summary>
      </details>
      <main className="hidden w-full peer-open:flex flex-col flex-1 p-2 blur-sm opacity-50 peer-open:blur-none peer-open:opacity-100 transition-all duration-500">
        {Array(15)
          .fill()
          .map((item, i) => (
            <TimelineCard key={i} />
          ))}
      </main>
    </section>
  );
}

export default TimeLines;
