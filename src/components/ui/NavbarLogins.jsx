import { Link, useLocation } from "react-router-dom";

function NavbarLogins() {
  const location = useLocation();
  const redirect = location?.pathname;

  return (
    <div className="flex items-center justify-center text-white rounded-xl w-full px-4 pb-0.5 bg-indigo-400 hover:bg-indigo-500 cursor-pointer hover:shadow-md">
      <Link to={`/login/?redirect=${redirect}`} className="">
        <span className="text-center text-sm md:text-base">Sign In</span>
      </Link>
    </div>
  );
}

export default NavbarLogins;
