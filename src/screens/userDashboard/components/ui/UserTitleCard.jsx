import SearchBar from "./SearchBar";

function UserTitleCard() {
  return (
    <section className="w-full flex items-center justify-between">
      <title className="flex flex-col px-6">
        <h3 className="text-sm font-normal text-neutral-400">
          <time>Monday, 20 October 2023</time>
        </h3>
      </title>

      <nav className="flex flex-row-reverse items-center flex-1 justify-around">
        <SearchBar />
        <ul className=" max-w-sm  peer-focus-within:hidden inline-flex items-center space-x-6">
          <li
            aria-selected
            className="relative content-none before:absolute before:pointer-events-none before:hidden before:aria-selected:block before:-translate-x-2.5 before:translate-y-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-600"
          >
            Articles
          </li>
          <li
            aria-selected
            className="relative content-none before:absolute before:pointer-events-none before:hidden before:aria-selected:block before:-translate-x-2.5 before:translate-y-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-600"
          >
            Latest
          </li>
          <li
            aria-selected
            className="relative content-none before:absolute before:pointer-events-none before:hidden before:aria-selected:block before:-translate-x-2.5 before:translate-y-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-600"
          >
            Support
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default UserTitleCard;
