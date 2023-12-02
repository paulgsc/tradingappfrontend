import { useState } from "react";
import { DotsSvg, MagnifyingGlass } from "../../../../constants/svgs/Svg";

function PendingTransfersCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  let transfers = [
    {
      type: "deposit",
      amount: "+50",
      status: "pending",
      from: "Capital One***9508",
      to: "Brokerage",
      initiated: "Dec 1, 2023",
      estimatedDate: "Dec 4, 2023",
    },
    {
      type: "deposit",
      amount: "+75",
      status: "pending",
      from: "Capital One***9508",
      to: "Brokerage",
      initiated: "Dec 1, 2023",
      estimatedDate: "Dec 6, 2023",
    },
    {
      type: "deposit",
      amount: "+125",
      status: "pending",
      from: "Capital One***9508",
      to: "Brokerage",
      initiated: "Dec 3, 2023",
      estimatedDate: "Dec 9, 2023",
    },
  ];

  // Function to filter transfers based on search input
  const filteredTransfers = globalFilter
    ? transfers.filter((transfer) => {
        const searchTerms = Object.values(transfer).map(String);
        return searchTerms.some((term) =>
          term.toLowerCase().includes(globalFilter.toLowerCase())
        );
      })
    : transfers;

  return (
    <section className="w-full max-w-4xl lg:space-y-2">
      <h1 className="lg:hidden capitalize font-semibold text-xl leading-10 lg:text-2xl">
        pending transfers
      </h1>
      <div className="hidden lg:flex flex-1 justify-between">
        <h1 className="capitalize font-semibold lg:text-2xl">
          pending transfers
        </h1>
        <div className="relative">
          <MagnifyingGlass
            className={
              "absolute inset-y-1.5 start-0.5 w-6 h-5 pointer-events-none"
            }
          />

          <input
            type="text"
            className="w-6 ps-8 py-1.5 focus-within:w-fit focus-within:ps-12  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
        </div>
      </div>

      <ul className="p-0.5 px-1.5 shadow-inner rounded-md space-y-2">
        {Array.isArray(filteredTransfers) &&
          filteredTransfers.map((transfer, idx) => (
            <li
              key={idx}
              className="group w-full flex flex-1 justify-between items-center p-0.5 py-1.5 border-b last:border-none relative after:opacity-0 after:absolute after:inset-0 after:-z-10 after:pointer-events-none hover:after:opacity-100 after:bg-gradient-to-tr after:from-slate-100 after:via-transparent after:to-slate-50"
            >
              <div>
                <h3 className="w-full font-semibold text-sm md:text-lg lg:text-xl leading-8">
                  {`Deposit from ${transfer.from}`}
                </h3>
                <p className="font-thin italic text-sm md:text-lg lg:text-xl text-slate-500 ml-2.5">
                  {`to ${transfer.to}`}
                </p>
              </div>
              <div className="lg:flex lg:items-center lg:gap-2">
                <div className="flex flex-col">
                  <span
                    role="text"
                    className="text-right text-base md:text-lg lg:text-xl font-bold text-slate-400 mr-2.5 mb-1.5"
                  >
                    {transfer.amount}
                  </span>
                  <div className="flex items-center space-x-1 md:space-x-3">
                    <time className="leadinig-6 text-xs md:text-base font-thin">
                      {transfer.initiated}
                    </time>
                    <span className="capitalize leading-6 text-sm font-thin md:text-lg text-slate-400">
                      {transfer.status}
                    </span>
                  </div>
                </div>
                <button className="hidden lg:inline-flex scale-90 hover:scale-100 p-2 text-center items-center rounded-full focus:bg-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                  <DotsSvg
                    className={"w-4 h-5 hover:font-bold hover:text-gray-950"}
                  />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default PendingTransfersCard;
