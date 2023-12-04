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
        <StructuredData />
      </Helmet>
      {children}
    </div>
  );
}

const StructuredData = () => {
  const investmentServiceStrucData = {
    "@context": "https://schema.org",
    "@type": "InvestmentService",
    name: "Your Company Name",
    description: "Invest in rental properties and earn dividends.",
    url: "https://leafiproperties.com/",
    logo: "https://your-website.com/logo.png",
    sameAs: [
      "https://www.facebook.com/leafiproperties.com",
      "https://twitter.com/leafiproperties.com",
      "https://www.linkedin.com/leafiproperties.com",
    ],
    potentialAction: {
      "@type": "InvestAction",
      target: {
        "@type": "InvestmentProduct",
        name: "Rental Property Investment",
        description:
          "Invest in a share of a rental property and earn dividends from the rental income.",
        minimumInvestmentAmount: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: 100,
        },
        expectedReturn: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: 5,
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      content={JSON.stringify(investmentServiceStrucData)}
    />
  );
};

export default Layout;
