import { useQueryClient } from "@tanstack/react-query";

import { Link } from "react-router-dom";

function BalanceCard() {
  const queryClient = useQueryClient();
  const { transfers_total_formated = 0 } =
    queryClient.getQueryData(["user-balance"]) || {};
  const transferLinks = [
    {
      id: 1,
      title: "+ add money",
      path: "/personal/banking",
    },
    {
      id: 2,
      title: "withdraw",
      path: "/personal/banking",
    },
  ];
  return (
    <div className="w-full max-w-lg max-h-fit shadow-sm border-b  rounded-sm">
      <section className="flex flex-col items-center justify-center gap-4 py-2">
        <span className=" w-20 h-20 flex justify-center items-center rounded-full bg-slate-200 p-4">
          <svg
            className="w-12 h-12 text-slate-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="teal"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.905 1.316 15.633 6M18 10h-5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5m0-5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3m-6.367-9L7.905 1.316 2.352 6h9.281Z"
            />
          </svg>
        </span>
        <div className="text-center">
          <span role="text" className="text-lg xl:text-xl font-semibold">
            {transfers_total_formated}
          </span>
          <p className="text-sm text-neutral-400 font-medium">Account Total</p>
        </div>
      </section>
      <section>
        <ul className="w-full flex items-center justify-between border-t border-zinc-300/60 py-4 px-6">
          {transferLinks.map((link) => (
            <li
              key={link.id}
              className="w-full uppercase text-center text-xs even:border-l border-zinc-400/60"
            >
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default BalanceCard;
