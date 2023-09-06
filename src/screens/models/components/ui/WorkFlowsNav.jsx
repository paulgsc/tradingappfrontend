import AddBtn from "./AddBtn";

function WorkFlowsNav({ count }) {
  const dropdowns = [
    {
      id: 1,
      title: "Event",
      path: "/",
      icon: <i className="fa fa-caret-down" />,
    },
    {
      id: 2,
      title: "Status",
      path: "/",
      icon: <i className="fa fa-caret-down" />,
    },
    {
      id: 3,
      title: "Branch",
      path: "/",
      icon: <i className="fa fa-caret-down" />,
    },
    {
      id: 4,
      title: "Actor",
      path: "/",
      icon: <i className="fa fa-caret-down" />,
    },
  ];
  return (
    <header className=" z-10 w-full bg-stone-100 rounded-t-md p-6 flex items-center justify-between border border-gray-300">
      <div>
        <span className="text-base font-semibold text-neutral-600">
          {`${count || 0} upload scheduled action`}
        </span>
      </div>

      <ul className="flex items-center justify-evenly gap-6">
        {dropdowns.map((item) => (
          <li key={item?.id} className="inline-flex items-center space-x-1">
            <span className="text-sm text-neutral-500 capitalize">
              {item?.title}
            </span>
            <span className="text-sm text-neutral-400">{item?.icon}</span>
          </li>
        ))}
      </ul>
      <AddBtn />
    </header>
  );
}

export default WorkFlowsNav;
