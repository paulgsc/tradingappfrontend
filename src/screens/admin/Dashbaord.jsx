import React from "react";
import PlaceHolder from "../../components/loading/PlaceHolder";
import { DownArrow } from "../../constants/svgs/Svg";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserMetrics } from "../../hooks/react-query";

function Dashbaord() {
  const { userInfo: { token = "", is_admin = false } = {}, error = null } =
    useSelector((state) => state.userAuth);
  const { property, isLoading, isError } = fetchUserMetrics(token);
  return (
    <div className="mt-14 flex w-full justify-center">
      <hr className="w-32" />
      <Dashbaord.OverviewMetrics metrics={createGroups(property) || []} />
    </div>
  );
}

Dashbaord.MetricCard = ({ title, metric }) => {
  return (
    <div className="mt-6 flex flex-1 justify-center max-w-[18rem] rounded-sm border border-stroke bg-white shadow-default">
      <div className="grid grid-rows-3 w-10/12 gap-2 p-2 ">
        <div className="">
          <div className="flex items-center justify-center h-8 lg:h-9 w-8 lg:w-9 rounded-full bg-red-600">
            <PlaceHolder.Icon
              name={"people"}
              styles={{
                width: 18,
                height: 18,
              }}
            />
          </div>
        </div>

        <div className=" row-span-2">
          <div className="grid grid-rows-3">
            <h4 className="px-2 py-2 row-span-2 text-xl font-bold text-black">
              {metric || 0}
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">{`${title}${
                metric > 0 ? "s" : ""
              }`}</span>

              <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
                {metric}
                <DownArrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashbaord.OverviewMetrics = ({ metrics = [] }) => {
  const cards =
    (metrics &&
      metrics.map((item, i) => (
        <Dashbaord.MetricCard
          key={i}
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
      <div key={`${item.id}_${i}_dashboard`} className={classname}>
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

const createGroups = (data) => {
  const categories = [
    {
      title: "User",
      key: "user_count",
    },
    {
      title: "Transfer Sweep",
      key: "transfer_amount",
    },
    {
      title: "Booking",
      key: "order_amount",
    },
    {
      title: "Account",
      key: "account_count",
    },
  ];

  const metrics = categories.map((item) => {
    let groupedData = {};

    if (data) {
      Object.keys(data).map((key) => {
        if (key.includes(item.key)) {
          groupedData = {
            ...groupedData,
            title: item.title,
            metrics: {
              ...groupedData.metrics,
              key: data[key],
              default: data[`total_${item.key}`],
            },
          };
        }
      });
    }
    return groupedData;
  });

  return metrics;
};

export default Dashbaord;
