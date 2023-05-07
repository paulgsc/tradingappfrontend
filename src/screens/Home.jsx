import React from "react";
import Navbar from "../components/navbar/Navbar";
import Backdrop from "../components/backdrop/Backdrop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../contexts/redux/actions/fetchDataActions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  return (
    <div>
      <Navbar />
      <Backdrop />
    </div>
  );
}

export default Home;
