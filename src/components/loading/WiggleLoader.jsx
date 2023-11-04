function WiggleLoader() {
  return (
    <div className=" shadow-sm rounded-md w-96 h-96 bg-white p-2 flex items-center justify-center space-x-6">
      <div className="h-6 w-6 rounded-full bg-teal-200 animate-[wiggle_2s_ease-in-out_infinite]"></div>
      <div className="h-6 w-6 rounded-full bg-teal-200 animate-[wiggle_2s_ease-in-out_infinite]"></div>
      <div className="h-6 w-6 rounded-full bg-teal-200 animate-[wiggle_2s_ease-in-out_infinite]"></div>
    </div>
  );
}

export default WiggleLoader;
