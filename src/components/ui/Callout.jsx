function Callout({ className, message }) {
  return (
    <div className={className}>
      <div className="relative px-4 max-h-18 w-full flex justify-center items-center rounded-lg bg-gray-800">
        <div className="flex  items-center w-full h-full overflow-auto no-scrollbar ">
          <span className="text-xs text-white font-normal break-words text-center mb-4 mt-2 ">
            {message}
          </span>
        </div>
        <div className="z-10 absolute bottom-0 -translate-x-[6px] translate-y-[9px] left-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-gray-800 border-r-[6px] border-r-transparent "></div>
      </div>
    </div>
  );
}

export default Callout;
