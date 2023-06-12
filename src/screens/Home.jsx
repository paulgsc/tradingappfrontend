import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";
import Index from "../components/hero/Index";
import NavbarItems from "../components/navbar/menubar/NavbarItems";
import Footer from "../components/bottom/Footer";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  return (
    <div className="flex">
      <Navbar showMenu={true} Menubar={NavbarItems} />
      <div className="z-10 w-full">
        <Index />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
