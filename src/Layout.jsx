// Layout.js

import React from "react";
import { useLocation } from "react-router";
import { navbar } from "./components/navbar/Navlist";

const Layout = ({ children }) => {
  const location = useLocation();
  const navbarComponent = navbar(location.pathname);
  return (
    <div>
      <header>{navbarComponent}</header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
