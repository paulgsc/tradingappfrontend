import React from "react";
import Index from "../components/hero/Index";
import Footer from "../components/bottom/Footer";
import { useLocation } from "react-router";
import Contact from "../components/ui/Contact";
import FAQ from "./faq/FAQ";

function Home() {
  const location = useLocation();

  return (
    <div className="flex">
      {location.pathname === "/" && <Home.Main />}
      {location.pathname === "/faq" && <FAQ />}
      {location.pathname === "/contact" && <Contact />}
    </div>
  );
}

Home.Main = () => (
  <div className="z-10 w-full">
    <Index />
    <Footer />
  </div>
);

export default Home;
