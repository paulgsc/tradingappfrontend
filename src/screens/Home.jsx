import React from "react";
import Navbar from "../components/navbar/Navbar";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";
import Disclaimer from "../components/bottom/Disclaimer";
import "./home.css";
import Index from "../components/hero/Index";
import Property from "../components/three/Property";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  return (
    <div className="home__container">
      <div className="home__navbar">
        <Navbar showMenu={true} />
      </div>
      <Index />
      <Property />
      <Disclaimer />
    </div>
  );
}

export default Home;
