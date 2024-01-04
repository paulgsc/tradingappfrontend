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

  const portfolio = [
    {
      id: 1,
      summary: "Account Balance",
      content: [
        {
          id: 1,
          title: "Equity",
          amount: amount_purchased_formated || "$0.00",
        },
        {
          id: 2,
          title: "Cash",
          amount: transfer_remaining_formated || "$0.00",
        },
        {
          id: 3,
          title: "accrued dividends",
          amount: 80.0,
        },
      ],
    },
    {
      id: 2,
      summary: "Holdings",
      content: [
        {
          id: 1,
          title: "",
          image: true,
          amount: 80.0,
        },
      ],
    },
  ];
  return (
    <article className="flex max-2xl:flex-col w-full max-w-full 2xl:max-h-[500px] rounded-[2rem] shadow-lg border border-neutral-100">
      <div className="w-1/2 max-2xl:w-full flex 2xl:flex-col items-center justify-center gap-6 py-6 rounded-[2rem] bg-sky-200/80">
        <div className="h-44 w-44 rounded-full flex items-center justify-center text-center shadow-inner bg-sky-300">
          <span role="text" className="text-3xl max-2xl:text-2xl text-white">
            {transfers_total_formated || "$0.00"}
          </span>
        </div>
      </div>
      <div className="w-1/2 max-2xl:w-full rounded-[2rem] px-1 pt-6 overflow-y-auto no-scrollbar">
        <ul className="mb-12">
          {portfolio.map((item) => (
            <li key={item.id} className="mb-4">
              <h3 className="text-start leading-10 pl-4 pb-2 font-bold">
                {item?.summary}
              </h3>
              <div className="flex flex-col items-center">
                <ul className="w-11/12 flex flex-col gap-4 ">
                  {item.content.map((content) => (
                    <li
                      key={content.id}
                      className="flex items-center justify-between w-full h-fit xl:h-16 p-2 px-4 rounded-l-lg rounded-r-2xl bg-gradient-to-tr even:from-blue-100 odd:from-teal-200/60 via-white to-transparent"
                    >
                      {content?.image ? (
                        <img
                          src="https://source.unsplash.com/75x75/?modern-house?3"
                          alt=""
                          className="w-12 h-12  rounded-full object-cover aspect-square"
                        />
                      ) : (
                        <span className="capitalize text-sm">
                          {content?.title}
                        </span>
                      )}

                      <span className="p-1 px-2 rounded-md bg-blue-100/60">
                        {content?.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default Investments;
