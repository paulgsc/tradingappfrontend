import { useQueryClient } from "@tanstack/react-query";

function Investments() {
  const queryClient = useQueryClient();

  const {
    transfer_remaining_formated = 0,
    amount_purchased_formated = 0,
    transfers_total_formated = 0,
  } = queryClient.getQueryData(["user-balance"]) || {};

  const summary = [
    {
      id: 1,
      title: "total investment value",
      amount: transfers_total_formated,
    },
    {
      id: 2,
      title: "property holdings",
      amount: amount_purchased_formated,
    },
    {
      id: 3,
      title: "cash",
      amount: transfer_remaining_formated,
    },
  ];

  return (
    <div className="flex flex-col flex-1 justify-start items-center gap-6 h-[29.7rem] px-0.5 pt-2 rounded-lg shadow-inner bg-zinc-50/60">
      <div className="p-6 h-32 w-32 2xl:h-36 2xl:w-36 rounded-full flex items-center justify-center border border-slate-200 bg-white shadow-inner">
        <h1 className="font-semibold 2xl:text-xl">
          {transfers_total_formated}
        </h1>
      </div>
      <article className="w-full space-y-6 ">
        {summary.map((item) => (
          <div
            key={item?.id}
            className="flex items-center justify-center w-full rounded-sm border-b border-gray-300 p-2 2xl:px-10 bg-blue-50 brightness-95"
          >
            <h3 className="w-3/5 capitalize font-medium">{item?.title}</h3>
            <span
              role="text"
              className="text-center font-semibold w-full max-w-[6.65rem] p-2 rounded-lg shadow-sm outline outline-neutral-50/60 bg-emerald-100"
            >
              {item?.amount}
            </span>
          </div>
        ))}
      </article>
    </div>
  );
}

export default Investments;
