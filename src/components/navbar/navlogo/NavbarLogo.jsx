import { Link } from "react-router-dom";
import { siteLogo1 } from "../../../assets";

function NavbarLogo() {
  return (
    <div className="flex items-center overflow-y-hidden ">
      <Link to={"/"} className="">
        <div className="  flex items-center text-start justify-start rounded-lg shadow-sm h-12  w-36">
          <img
            loading="lazy"
            height={"48px"}
            width={"144px"}
            alt="website logo"
            src={siteLogo1}
            className="flex justify-start text-start object-left"
          />
        </div>
      </Link>
    </div>
  );
}

export default NavbarLogo;
