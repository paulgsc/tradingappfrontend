import { Helmet } from "react-helmet";

function Layout({ children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Leafiproperties:Home | Buy Property Shares | Earn Dividends
        </title>
        <meta property="twitter:site" content="@Leafiproperties" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content="Leafiproperties:Home | Buy Property Shares | Earn Dividends"
        />
        <meta
          property="twitter:description"
          content="Explore a new era of passive income with our platform. Buy shares in rental properties and unlock a stream of monthly dividends. Invest in real estate effortlessly and watch your wealth grow. Start your journey to financial freedom today."
        />
        <link rel="canonical" href="https://leafiproperties.com/" />
      </Helmet>
      {children}
    </div>
  );
}

export default Layout;
