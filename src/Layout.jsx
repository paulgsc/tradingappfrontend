// Layout.js

import AuthBroadcast from "./components/auth/AuthBroadcast";

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <AuthBroadcast>{children}</AuthBroadcast>
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
