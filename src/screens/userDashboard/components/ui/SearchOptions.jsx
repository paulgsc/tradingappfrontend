function SearchOptions() {
  const options = [
    {
      id: 1,
      title: "orders",
      model: "orders",
    },
    {
      id: 2,
      title: "transfers",
      model: "transfers",
    },
    {
      id: 3,
      title: "settings",
      model: "settings",
    },
    {
      id: 4,
      title: "notifications",
      model: "notifications",
    },
    {
      id: 5,
      title: "faq",
      model: "faq",
    },
    {
      id: 6,
      title: "articles",
      model: "articles",
    },
  ];
  return (
    <ul
      tabIndex={-1}
      className="z-10 w-full max-h-28 overflow-y-auto no-scrollbar absolute top-0 right-[0.05rem] translate-y-6 py-2  mt-1 shadow-inner border-l border-b rounded-bl-lg bg-teal-50"
    >
      {options.map((option) => (
        <li
          key={option.id}
          className="w-full  text-start px-1 hover:bg-teal-100"
        >
          <span className=" w-full inline-flex items-center space-x-1 text-xs capitalize cursor-text">
            <strong>{`${option.title}`}</strong>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default SearchOptions;
