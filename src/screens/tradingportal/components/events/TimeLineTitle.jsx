export default function TimeLineTitle() {
  return (
    <div className="absolute -top-1/4 group-odd:right-2 group-even:left-2 w-full max-w-xs px-2.5 space-y-1.5">
      <span
        role="text"
        className="inline-flex items-center justify-center w-full text-center pt-[.20rem] -translate-y-0.5 rounded-full bg-gradient-to-t from-gray-50 via-neutral-200 to-gray-300 [clip-path:polygon(0_0,65%_0,71%_18%,100%_18%,100%_100%,0_100%)]"
      >
        <time>Jan 15, 2023</time>
      </span>
      <div className="relative w-full h-28 rounded-md rounded-bl-[2rem] rounded-tr-[2rem] outline outline-neutral-300/30  overflow-hidden p-2">
        <h3 className="text-base inline-flex items-center gap-2 font-semibold">
          <span className="bg-blue-200 shadow-inner rounded-full p-2">
            Event:
          </span>
          <p className="px-2 py-1 rounded-md shadow-inner relative bg-emerald-100 after:absolute after:inset-0 after:bg-gradient-to-t after:from-emerald-50 via-emerald-100 to-emerald-200 ">
            CashFlow
          </p>
        </h3>
        <p className="rounded-b-[1rem] text-sm mt-2 bg-gray-50/30  py-0.5 px-2">
          A tenant has paid rent for unit in this complex
        </p>
      </div>
    </div>
  );
}
