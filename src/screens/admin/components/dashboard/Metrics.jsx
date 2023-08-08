import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserMetrics } from "../../../../hooks/react-query";
import MetricCard from "./MetricCard";
import { useState } from "react";
import { createGroups } from "../utils/utils";
import DynamicCards from "./DynamicCards";

function Metrics() {
  const { userInfo: { token = "", is_admin = false } = {}, error = null } =
    useSelector((state) => state.userAuth);
  const { property, isLoading, isError } = fetchUserMetrics(token);
  const metrics = createGroups(property) || [];
  const cards =
    (metrics &&
      metrics.map((item, i) => (
        <MetricCard
          key={i}
          id={i}
          metric={item?.metrics?.default}
          title={item?.title}
        />
      ))) ||
    [];

  const getSizeBasedOnScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1290) {
      return 4;
    } else if (screenWidth >= 992) {
      return 2;
    } else {
      return 1;
    }
  };

  const [size, setSize] = useState(getSizeBasedOnScreenWidth());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSizeBasedOnScreenWidth());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-14 flex w-full justify-center">
      <hr className="w-32" />
      <div className="flex flex-col w-full ">
        <DynamicCards
          data={cards}
          size={size}
          classname={" flex flex-1 justify-center"}
        />
      </div>
    </div>
  );
}

export default Metrics;
