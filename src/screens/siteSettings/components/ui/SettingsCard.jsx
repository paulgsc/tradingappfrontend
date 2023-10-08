function SettingsCard({ description, info, children }) {
  return (
    <div className="w-full border-l border-t rounded-t-md shadow-sm">
      <div className="w-full py-2 px-12 flex flex-1 justify-between items-center gap-4 sm:h-36 lg:h-20 xl:h-16">
        <div className="flex justify-between items-center flex-1">
          <span className="text-xs md:text-sm ">{description}</span>
          <div tabIndex={-1} className="relative group flex h-full">
            <span className="text-sm h-6 w-6 border rounded-full text-center italic bg-indigo-100 focus:ring-2 hover:bg-indigo-300 ring-indigo-300 cursor-pointer">
              i
            </span>
            <p className="hidden z-50 bg-zinc-50 group-focus-within:block absolute right-0 top-12 border outline outline-zinc-300 leading-normal text-center break-word w-72 p-2">
              {info}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default SettingsCard;
