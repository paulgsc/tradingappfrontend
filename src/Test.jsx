import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <ul className="menu">
      <li className="">
        <NavLink
          to="/test"
          className={({ isActive }) => (isActive ? "bg-white" : " bg-red-600")}
        >
          Tasks
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? activeClassName : " bg-red-600"
          }
        >
          Tasks
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" activeclassname="text-blue-500">
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default Menu;
