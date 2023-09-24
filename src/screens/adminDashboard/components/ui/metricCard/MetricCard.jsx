import PlaceHolder from "../../../../../components/loading/PlaceHolder";
import { DownArrow } from "../../../../../constants/svgs/Svg";
import MetricChart from "./MetricChart";

function MetricCard({ id, title, metric }) {
  return (
    <div className=" z-0 relative mt-6 px-2 py-4 flex flex-col flex-1 justify-center max-w-[18rem] rounded-sm border border-stroke bg-white shadow-default">
      <div className="grid grid-rows-3 w-10/12 gap-2 p-2 ">
        <div className="">
          <div className="flex items-center justify-center h-8 lg:h-9 w-8 lg:w-9 rounded-full bg-red-600">
            <PlaceHolder.Icon
              name={"people"}
              styles={{
                width: 18,
                height: 18,
              }}
            />
          </div>
        </div>

        <div className=" row-span-2">
          <div className="grid grid-rows-3">
            <h4 className="px-2 py-2 row-span-2 text-xl font-bold text-black">
              {metric || 0}
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">{`${title}${
                metric > 0 ? "s" : ""
              }`}</span>

              <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
                {metric}
                <DownArrow />
              </span>
            </div>
          </div>
        </div>
      </div>
      <MetricChart id={id} />
    </div>
  );
}

export default MetricCard;
