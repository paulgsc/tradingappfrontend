import { useSelector } from "react-redux";
import NavbarLogins from "./components/navbar/navlogins/NavbarLogins";
import NavbarLogo from "./components/navbar/navlogo/NavbarLogo";
import Profile from "./components/profile/Profile";
import CustomSvg from "./components/ui/CustomSvg";
import "./test.css";

function SlideshowComponent() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const openMenu = (e) => {
    e.preventDefault();
    const Main = document.getElementById("Main");
    Main.classList.toggle("hidden");
  };
  return (
    <div className="test__container">
      <div aria-label="toggler" className="test1">
        <button
          aria-label="open"
          id="open"
          onClick={openMenu}
          className="btn-container-zero"
        >
          <CustomSvg.HamburgerMenu />
        </button>
        <NavbarLogo />
      </div>
      <div className="right-margin-container-2 ">
        {token ? <Profile user={profileInitial} /> : <NavbarLogins />}
      </div>
    </div>
  );
}

export default SlideshowComponent;
