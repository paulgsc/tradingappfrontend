import Navbar from "./Navbar";
import NavbarItems from "./menubar/NavbarItems";

export const navbar = (path) => {
  switch (true) {
    case path === "/":
      return <Navbar showMenu={true} Menubar={NavbarItems} />;
    case path.includes("/faq"):
      return <Navbar showMenu={true} Menubar={NavbarItems} />;
    case path.includes("/personal/banking"):
      return <Navbar />;
    case path.includes("/trade"):
      return <Navbar />;
    default:
      return null;
  }
};
