import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";
import Index from "../components/hero/Index";
import Footer from "../components/bottom/Footer";
import { useLocation } from "react-router";
import FAQ from "../components/ui/FAQ";
import Contact from "../components/ui/Contact";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
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
