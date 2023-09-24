import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import DynamicCards from "./DynamicCards";
import { fetchUserMetrics } from "../../../hooks/react_query";
import MetricCard from "./MetricCard";

function Metrics() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { data } = fetchUserMetrics(token);
  const cards =
    (Array.isArray(data) &&
      data.map((item, i) => (
        <MetricCard
          key={i}
          id={item?.title}
          metric={item?.summary}
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
    <div className="flex w-full justify-center">
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
