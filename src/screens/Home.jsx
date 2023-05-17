import React from "react";
import Navbar from "../components/navbar/Navbar";
import Backdrop from "../components/backdrop/Backdrop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";
import Disclaimer from "../components/bottom/Disclaimer";
import "./home.css";

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

      <div>
        <Backdrop />
      </div>
      <Disclaimer />
    </div>
  );
}

export default Home;
