import { AngleDownSVG, CalendarSVg, Clock } from "../../../constants/svgs/Svg";
import MonthCard from "./MonthCard";

export default function DatePicker() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <div className="relative group">
        <button
          className="inline-flex items-center space-x-2 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
          type="button"
        >
          <Clock className="h-4 w-4" />
          <span role="text">Last 30 days</span>
          <AngleDownSVG className="h- w-2 mt-1" />
        </button>
        <div className="hidden group-focus-within:block absolute inset-0 top-12">
          <div tabIndex={-1} className="relative">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <CalendarSVg className="w-4 h-4" />
              </div>
              <input
                name="start"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Start date"
              />
            </div>
            <MonthCard />
          </div>
        </div>
      </div>
    </div>
  );
}
