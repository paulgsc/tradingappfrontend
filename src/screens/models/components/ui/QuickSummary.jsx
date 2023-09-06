function QuickSummary() {
  return (
    <div className="flex flex-1 justify-center p-4 space-x-6">
      {Array(3)
        .fill("")
        .map((_, i) => (
          <section
            key={i}
            className="max-w-sm h-fit flex flex-1 justify-start items-center space-x-4 p-4 rounded-lg border border-gray-300/80 bg-white"
          >
            <div>
              <span className="sr-only">some icon</span>
              <div className="flex items-center justify-center h-16 w-16 p-2 outline outline-neutral-100/20 rounded-lg bg-blue-300/20"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-normal ">Lorem ipsum</span>
              <span
                role="status"
                aria-live="polite"
                className="font-bold text-xl xl:text-2xl"
              >
                100
              </span>
            </div>
          </section>
        ))}
    </div>
  );
}

export default QuickSummary;
