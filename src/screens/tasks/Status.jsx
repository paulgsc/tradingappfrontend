import React, { useState, useEffect } from "react";

const tasks = [
  {
    id: 1,
    title: "Unauthorized Access",
    status: "Pending",
    deliveryDate: "2023-06-07",
  },
];

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
  const [visibleTasks, setVisibleTasks] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        // Load next tasks
        const remainingTasks = tasks.slice(
          visibleTasks.length,
          visibleTasks.length + 5
        );
        setVisibleTasks((prevTasks) => [...prevTasks, ...remainingTasks]);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initialize visible tasks
    setVisibleTasks(tasks.slice(0, 5));

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen container mx-auto p-4 bg-gradient-to-t from-blue-200 to-white">
      <h1 className="text-2xl font-bold mb-4">Task Status</h1>
      <div className="h-full flex flex-col gap-4">
        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-md shadow-md flex items-center justify-between border-b"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col w-60">
                <div className="flex gap-2">
                  <h2 className="text-lg font-medium mb-2">{task.title}</h2>
                </div>
                <div className="gap-2">
                  <div className="flex items-center gap-2">
                    <span>Status: {task.status}</span>
                    <div
                      className={`w-2 h-2 shadow-lg rounded-full mr-2 ${getStatusColor(
                        task.status
                      )}`}
                    />
                  </div>
                  <p>Expected Delivery: {task.deliveryDate}</p>
                </div>
              </div>

              <span>demo</span>
              <input
                type="checkbox"
                className="appearance-none rounded-full border border-gray-300 checked:bg-indigo-600 checked:border-transparent h-5 w-5"
                checked={task.status === "Completed"}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusPage;
