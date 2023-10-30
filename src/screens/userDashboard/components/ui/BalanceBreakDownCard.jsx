import BalancePie from "../charts/BalancePie";

function BalanceBreakDownCard({ breakdown }) {
  if (Array.isArray(breakdown)) {
    return (
      <div className=" w-full bg-white rounded-3xl">
        <ul className="w-full flex items-start rounded-t-3xl bg-zinc-200">
          {breakdown.map((period) => (
            <li
              key={period?.title}
              aria-selected={period?.default}
              className="w-full  bg-zinc-100 aria-selected:bg-white brightness-90 aria-selected:brightness-100 aria-selected:border aria-selected:border-b-0 aria-selected:shadow-inner rounded-tr-3xl aria-selected:rounded-t-xl p-2 uppercase"
            >
              <header>
                <span role="text">{period?.title}</span>
              </header>
            </li>
          ))}
        </ul>
        <ul className="w-full flex items-start">
          {breakdown.map((period) => (
            <li
              key={period.id}
              aria-current={period?.default}
              className="group w-full hidden aria-[current]:block bg-zinc-200 aria-[current]:bg-white brightness-90 aria-[current]:brightness-100 aria-[current]:border aria-[current]:border-t-0 aria-[current]:shadow-inner rounded-lg p-2"
            >
              <BalancePie
                title={period?.title}
                data={period?.data || []}
                labels={period?.labels}
                formated_data={period?.formated_data}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <></>;
}

export default BalanceBreakDownCard;
