import ImagesAction from "./ImagesAction";
import ImagesCard from "./ImagesCard";

function ImagesPortal() {
  return (
    <div
      className={`flex flex-col items-start min-h-screen mx-auto w-full bg-white `}
    >
      <div className="grid items-start grid-cols-9 xl:grid-cols-7 w-full h-full mx-auto shadow-md gap-1">
        <div className="invisible flex items-center justify-center h-full w-full col-span-1 shadow-sm border rounded-sm">
          +
        </div>
        <div className="flex items-start justify-center h-full w-full col-span-4 xl:col-span-3 shadow-sm ">
          <ImagesCard />
        </div>
        <div className="flex items-start justify-center h-full  w-full col-span-3 xl:col-span-2 shadow-md rounded-sm border">
          {<ImagesAction /> || "+"}
        </div>
      </div>
    </div>
  );
}

export default ImagesPortal;
