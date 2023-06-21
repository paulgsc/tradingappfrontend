import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { fetchSiteTasksHook } from "../../hooks/react-query";
import { Link } from "react-router-dom";
import Form from "../forms/Form";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-black";
    case "In Progress":
      return "bg-green-500";
    case "Pending":
      return "bg-orange-500";
    default:
      return "bg-red-500";
  }
};

const TaskStatusPage = () => {
  const location = useLocation();
  const { id: taskId, lineId } = useParams(); // Get the selected task ID from the URL params
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { siteTasks = [], isLoading, isError } = fetchSiteTasksHook(token);
  const filteredTasks =
    siteTasks.filter((task) => task.id === parseInt(taskId)) || [];

  return (
    <div className="block h-full">
      <hr className="mt-12" />
      {location.pathname === `/admin/timeline/task/${taskId}` && (
        <TaskStatusPage.Task filteredTasks={filteredTasks} />
      )}
    </div>
  );
};

TaskStatusPage.Task = ({ filteredTasks }) => (
  <div className="min-h-screen container mx-auto p-4 bg-gradient-to-t from-blue-200 to-white">
    {filteredTasks.map((task) => (
      <div className="h-full">
        <div className="sticky top-14 z-30 bg-white border-b shadow-md">
          <h1 className="text-2xl font-bold mb-4">{`${task.title} tasklines`}</h1>
        </div>
        <div className="h-full flex flex-col gap-4 ">
          {task.task_lines.map((line) => (
            <div
              key={line.id}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between border-b"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-60">
                  <div className="flex gap-2">
                    <h2 className="text-lg font-medium mb-2">{line.title}</h2>
                    <Link
                      to={`/admin/timeline/task/${task.id}/taskline/${line.id}`}
                    >
                      <button className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200">
                        <i className="far fa-edit"></i>
                      </button>
                    </Link>
                  </div>
                  <div className="gap-2">
                    <div className="flex items-center gap-2">
                      <span>
                        Status: {line.completed ? "Complete" : "Pending"}
                      </span>
                      <div
                        className={`w-2 h-2 shadow-lg rounded-full mr-2 ${getStatusColor(
                          line.completed ? "Completed" : "Pending"
                        )}`}
                      />
                    </div>
                    <p>Expected Delivery: {task.delivery_date}</p>
                  </div>
                </div>

                <span>demo</span>
                <div className="relative flex flex-col">
                  <div className="">
                    {" "}
                    <input
                      type="checkbox"
                      className="appearance-none rounded-full border border-gray-300 checked:bg-indigo-600 checked:border-transparent h-5 w-5"
                      checked={line.complete}
                      readOnly
                    />
                  </div>
                  <div className="absolute mt-2 top-[125%] right-0 flex gap-1 items-center text-xs font-bold text-slate-400 ">
                    <span>{line.created_by}</span>
                    <span>
                      {new Date(line.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default TaskStatusPage;
