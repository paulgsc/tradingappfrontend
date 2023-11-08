function Test() {
  return (
    <div>
      <div className="flex  flex-1 flex-col items-center justify-center sm:aspect-[4/3] md:aspect-[2/1]">
        <button
          title="finish setup later"
          className="bg-gray-400/80 fixed right-6 top-2 z-50 rounded-sm scale-90 hover:scale-100 transition-all duration-200 ease-in-out hover:rounded-md hover:bg-white"
        ></button>
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white shadow-md">
          foo
          <div className="px-8 pb-8">
            <div className="mt-10 flex justify-between">
              <button
                className={`${
                  false === 1 ? "pointer-events-none opacity-50" : ""
                } duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700`}
              >
                Back
              </button>
              <button
                className={`${
                  false ? "pointer-events-none opacity-20" : ""
                } bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
