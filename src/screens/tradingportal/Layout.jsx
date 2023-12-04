import { Helmet } from "react-helmet";

function Layout({ children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Leafiproperties:Trade - Buy New Shares | View Property activity
        </title>
        <link rel="canonical" href="https://leafiproperties.com/trade/" />
      </Helmet>
      {children}
    </div>
  );
}

export default Layout;
