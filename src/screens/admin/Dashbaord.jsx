import React from "react";
import PlaceHolder from "../../components/loading/PlaceHolder";
import { DownArrow } from "../../constants/svgs/Svg";
import { Dashboard } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";

function Dashbaord() {
  return (
    <div className="mt-14 flex w-full justify-center">
      <hr className="w-32" />
      <Dashbaord.OverviewMetrics />
    </div>
  );
}

Dashbaord.MetricCard = ({ title, metric }) => {
  return (
    <div className="mt-6 flex flex-1 justify-center max-w-[18rem] rounded-sm border border-stroke bg-white shadow-default">
      <div className="flex flex-col w-10/12 gap-1 p-2 ">
        <div className="flex items-center justify-center h-8 lg:h-9 w-8 lg:w-9 rounded-full bg-red-600">
          <PlaceHolder.Icon
            name={"people"}
            styles={{
              width: 18,
              height: 18,
            }}
          />
        </div>

        <h4 className="text-xl font-bold text-black">3.456</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-400">{title}</span>

          <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
            {metric}
            <DownArrow />
          </span>
        </div>
      </div>
    </div>
  );
};

Dashbaord.OverviewMetrics = () => {
  const metrics = [
    {
      metric: 2,
      title: "Total Users",
    },
    {
      metric: 0,
      title: "Capital Raised",
    },
    {
      metric: 0,
      title: "Sold Shares",
    },
    {
      metric: 0,
      title: "Sold Shares",
    },
  ];

  const cards = metrics.map((item, i) => (
    <Dashbaord.MetricCard key={i} metric={item.metric} title={item.title} />
  ));

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
    <div className="flex flex-col w-full ">
      <DynamicCards
        data={cards}
        size={size}
        classname={" flex flex-1 justify-center"}
      />
    </div>
  );
};

const DynamicCards = ({ data, size, classname }) => {
  const ListItems = [];
  let index = 0;

  while (index < data.length) {
    const listItems = data.slice(index, index + size).map((item, i) => (
      <div key={item.id} className={classname}>
        {item}
      </div>
    ));

    ListItems.push(
      <div key={index} className="flex">
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
};

export default Dashbaord;
