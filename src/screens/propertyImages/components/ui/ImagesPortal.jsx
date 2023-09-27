import ImagesAction from "./ImagesAction";
import ImagesCard from "./ImagesCard";

function ImagesPortal() {
  return (
    <div
      className={`flex flex-col items-start min-h-full mx-auto mt-2 xl:mt-6 w-full bg-white `}
    >
      <div className="grid items-start grid-cols-9 xl:grid-cols-7 w-full h-full mx-auto gap-6">
        <div className="invisible flex items-center justify-center h-full w-full col-span-1 shadow-sm ">
          +
        </div>
        <div className="flex items-start justify-center h-full w-full col-span-4 xl:col-span-3 shadow-sm ">
          <ImagesCard />
        </div>
        <div className="flex items-start justify-center h-full  w-full col-span-3 xl:col-span-2 shadow-md ">
          {<ImagesAction /> || "+"}
        </div>
      </div>
    </div>
  );
}

export default ImagesPortal;
