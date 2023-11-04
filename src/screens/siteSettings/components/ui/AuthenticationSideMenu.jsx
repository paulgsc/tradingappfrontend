import { Link } from "react-router-dom";

function AuthenticationSideMenu({ sideNavs }) {
  if (Array.isArray(sideNavs)) {
    return (
      <aside className="shadow-md min-h-screen w-72 mx-auto border-l bg-zinc-50 col-span-1">
        <nav className="flex flex-col mx-auto space-y-6 m-4 pl-6 pr-1 py-1 ">
          {sideNavs.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              title="This link navigates to the element with the id 'my-element'"
              aria-label="Link to my element"
              aria-labelledby="my-element-label"
              aria-selected
              className="p-2 px-6 rounded-r-md border-r border-b-0 hover:outline hover:outline-zinc-400/50 border-b-transparent hover:border-b-inherit shadow-sm backdrop-brightness-90 font-semibold italic text-sm hover:backdrop-brightness-90 hover:text-neutral-100 hover:underline aria-selected:text-blue-600 transition-colors ease-in-out duration-150 "
            >
              {link?.title}
            </Link>
          ))}
        </nav>
      </aside>
    );
  }
  return <></>;
}

export default AuthenticationSideMenu;
