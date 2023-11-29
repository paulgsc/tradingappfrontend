import { PaperClip, Youtube } from "../../../../constants/svgs/Svg";

export default function EventCard({ isIntersecting }) {
  return (
    <div className="w-full relative">
      <div
        aria-selected={isIntersecting}
        className="w-full h-4 relative bg-gray-100 overflow-hidden after:absolute after:w-full after:h-full after:bg-gradient-to-br after:from-gray-100/80 after:via-white after:to-gray-100/80 aria-selected:after:animate-shine"
      />
      <div className="absolute inset-0 top-6">
        <div className="border-t border-b flex flex-col items-center gap-6 bg-white ml-2 mr-3 rounded-md shadow-lg">
          <div className="w-11/12">
            <h1 className="font-semibold leading-8 text-2xl capitalize">
              release of ...
            </h1>
            <ul className="inline-flex items-center justify-start gap-2">
              {["rent", "payment", "revenue", "occupancy"].map((item, i) => (
                <li
                  key={i}
                  className="relative rounded-full px-1.5 py-0.5 bg-gray-50 shadow-inner after:absolute after:inset-0 bg-gradient-to-br from-gray-950 via-gray-500 to-gray-800"
                >
                  <p className="text-white text-xs font-thin mb-.05">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="w-11/12 max-h-32 max-2xl:text-sm text-base break-words break-before-auto  overflow-hidden">
            A tenant has paid rent on a unit in the complex. Received rent is on
            time, this unit has a 2 yr lease. quick summary... To view the the
            event in great detail view the links below.
          </p>
          <div className="flex items-center justify-between w-full px-6">
            <span role="text" className="text-xs font-thin text-slate-400">
              useful links
            </span>
            <div>
              <span className="inline-flex items-center space-x-2 ">
                <button>
                  <Youtube className="w-7 h-7 text-red-600" />
                </button>
                <button>
                  <PaperClip className="w-5 h-5 text-slate-400" />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
