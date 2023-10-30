function HistorySideMenu() {
  const links = [
    {
      id: 1,
      title: "Token Duration",
      path: "/admin/site/settings",
    },
    {
      id: 2,
      title: "Token claims",
      path: "/admin/site/settings/login",
    },
  ];
  return (
    <aside className="shadow-md min-h-screen w-2/12 mx-auto border-l bg-zinc-50 ">
      <nav className="flex flex-col mx-auto space-y-6 m-4 pl-6 pr-1 py-1 ">
        {links.map((link, i) => (
          <a
            key={i}
            href="#my-element"
            title="This link navigates to the element with the id 'my-element'"
            aria-label="Link to my element"
            aria-labelledby="my-element-label"
            aria-selected
            className="p-2 px-6 rounded-r-md border-r border-b-0 hover:outline hover:outline-zinc-400/50 border-b-transparent hover:border-b-inherit shadow-sm backdrop-brightness-90 font-semibold italic text-sm hover:backdrop-brightness-90 hover:text-neutral-100 hover:underline aria-selected:text-blue-600 transition-colors ease-in-out duration-150 "
          >
            Click here
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default HistorySideMenu;
