import { Link } from "react-router-dom";

function NavbarItems() {
  const navItems = [
    {
      id: "trade",
      title: "trade",
      path: "/trade",
    },
  ];
  return (
    <div className=" ">
      {navItems.map((menu) => (
        <ul key={menu.id} className="">
          <li key={menu.id} className="">
            <Link to={menu.path} className="hover:text-lime-800">
              <span className="capitalize font-normal leading-6">
                {menu.title}
              </span>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default NavbarItems;
