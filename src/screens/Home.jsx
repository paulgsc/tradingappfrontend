import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";
import Disclaimer from "../components/bottom/Disclaimer";
import Index from "../components/hero/Index";
import NavbarItems from "../components/navbar/menubar/NavbarItems";

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
        <Disclaimer />
      </div>
    </div>
  );
}

export default Home;
