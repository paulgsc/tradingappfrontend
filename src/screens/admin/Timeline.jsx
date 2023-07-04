import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchSiteTasksHook } from "../../hooks/react-query";

function Timeline() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { siteTasks = [], isLoading, isError } = fetchSiteTasksHook(token);

  return (
    <div className="min-h-screen bg-gray-100">
      <hr className=" mt-8" />
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className=" w-full xl:w-2/3 mx-auto ">
          <Timeline.List taskArray={siteTasks} />
        </div>
      </div>
    </div>
  );
}

Timeline.Task = ({ item }) => {
  return (
    <div className="flex h-fit max-w- xl:w-2/5 px-2 py-10">
      <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
        <div className="text-gray-600 mb-2 flex justify-between">
          <div className="font-bold">{item?.title}</div>
          <div className="flex flex-row">
            <Link to={`/admin/timeline/task/${item.id}`}>
              <button className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200">
                <i className="fa-solid fa-eye fa-sm"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-gray-600">{item?.description}</div>
        <Timeline.TaskFooter item={item} />
      </div>
    </div>
  );
};

Timeline.TaskFooter = ({ item }) => (
  <div className="flex w-full justify-between items-center border-t py-1 mt-2">
    <span className="text-xs text-slate-400 font-light">
      {item?.delivery_date}
    </span>
    <div className="flex gap-2 items-center justify-center text-center">
      <span className="text-sm">{item?.status}</span>
      <input
        type="checkbox"
        className="appearance-none rounded-full border border-gray-300 bg-orange-600 checked:bg-indigo-600 checked:border-transparent h-2 w-2"
        checked={item?.status === "Completed"}
        readOnly
      />
    </div>
  </div>
);

Timeline.Date = () => {
  return (
    <div className=" w-72  flex justify-center">
      <div className="relative flex h-full w-1 bg-green-300 items-center justify-center">
        <div className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-red-300 leading-none text-center z-10 bg-white font-thin">
          <div>20</div>
          <div>September</div>
        </div>
      </div>
    </div>
  );
};

Timeline.List = ({ taskArray }) => {
  const TaskLists = taskArray.map((item) => (
    <div
      key={item.id}
      className="justify-center items-center shadow-sm gap-2 px-2 w-full h-72"
    >
      <Timeline.Date />
      <Timeline.Task item={item} />
    </div>
  ));

  return (
    <>
      <div className="hidden xl:block">
        {taskArray.map((item, i) => (
          <div key={item.id} className="flex flex-row w-full">
            {i % 2 === 0 ? (
              <>
                {" "}
                <Timeline.Task item={item} /> <Timeline.Date />{" "}
                <div className="w-2/5 px-2 py-10 "></div>{" "}
              </>
            ) : (
              <>
                {" "}
                <div className="w-2/5 px-2 py-10 "></div> <Timeline.Date />{" "}
                <Timeline.Task item={item} />{" "}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-12 items-center w-full xl:hidden">
        <hr className="mt-8" />
        <Timeline.Dynamic
          data={TaskLists}
          size={2}
          classname={" w-full items-center "}
        />
      </div>
    </>
  );
};

Timeline.Dynamic = ({ data, size, classname }) => {
  const ListItems = [];
  let index = 0;

  while (index < data.length) {
    const listItems = data.slice(index, index + size).map((item, i) => (
      <div key={i} className={classname}>
        {item}
      </div>
    ));

    ListItems.push(
      <div
        key={index}
        className="block md:grid md:grid-cols-2 items-center w-full justify-between"
      >
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
};

export default Timeline;
