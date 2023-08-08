// Layout.js

import React from "react";
import { useLocation } from "react-router";
import { navbar } from "./components/navbar/Navlist";
import AuthBroadcast from "./components/auth/AuthBroadcast";

const Layout = ({ children }) => {
  const location = useLocation();
  const navbarComponent = navbar(location.pathname);
  return (
    <div>
      <header>{navbarComponent}</header>
      <main>
        <AuthBroadcast>{children}</AuthBroadcast>
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
