function TimelineCard() {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px  md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      <div className="relative">
        <div className="md:flex items-center md:space-x-4 mb-3">
          <div className="flex items-center space-x-4 md:space-x-2 ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
              <svg
                className="w-6 h-6 text-zinc-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M13.383.076a1 1 0 0 0-1.09.217L11 1.586 9.707.293a1 1 0 0 0-1.414 0L7 1.586 5.707.293a1 1 0 0 0-1.414 0L3 1.586 1.707.293A1 1 0 0 0 0 1v18a1 1 0 0 0 1.707.707L3 18.414l1.293 1.293a1 1 0 0 0 1.414 0L7 18.414l1.293 1.293a1 1 0 0 0 1.414 0L11 18.414l1.293 1.293A1 1 0 0 0 14 19V1a1 1 0 0 0-.617-.924ZM10 15H4a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0-4H4a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Zm0-4H4a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
              </svg>
            </div>
          </div>

          <div className="text-slate-500 ml-14">
            <span className="text-slate-900 font-bold">Mark Mikrol</span> opened
            the request
          </div>
          <time className="font-caveat font-thin text-xs text-neutral-400 md:w-28">
            Apr 7, 2024
          </time>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-8">
          <p className="text-sm">
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose injected humour and the like.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TimelineCard;
