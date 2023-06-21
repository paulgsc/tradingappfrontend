import React, { useEffect } from "react";
import Form from "../../components/forms/Form";
import { useLocation, useParams } from "react-router";
import TaskStatusPage from "../../components/tasks/Status";
import { useSelector } from "react-redux";
import { fetchSiteTasksHook } from "../../hooks/react-query";

function Tasks() {
  const location = useLocation();
  const { id: taskId, lineId } = useParams(); // Get the selected task ID from the URL params
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { siteTasks = [], isLoading, isError } = fetchSiteTasksHook(token);
  const filteredTasks =
    siteTasks.filter((task) => task.id === parseInt(taskId)) || [];
  const filteredTaskLine = filteredTasks.flatMap((task) =>
    task.task_lines.find((line) => line.id === parseInt(lineId))
  );
  const records = filteredTaskLine
    .map((item) => {
      return [
        {
          id: "top",
          size: 1,
          content: [
            {
              id: 1,
              title: "name",
              value: item.title,
              name: "name",
              element: "input",
            },
          ],
        },
        {
          id: "body",
          size: 3,
          content: [
            {
              id: 2,
              title: "created by",
              value: item.created_by,
              name: "createdBy",
              element: "input",
            },
            {
              id: 3,
              title: "created at",
              value: new Date(item.created_at).toLocaleDateString(),
              name: "createdAt",
              element: "date",
            },
            {
              id: 4,
              title: "completed",
              value: item.completed,
              name: "completed",
              element: "input",
            },
            {
              id: 5,
              title: "completed at",
              value: item.completed_at,
              name: "completedAt",
              element: "date",
            },
            {
              id: 6,
              title: "link",
              value: item.url,
              name: "link",
              element: "input",
            },
            {
              id: 7,
              title: "link name",
              value: item.link_title,
              name: "linkName",
              element: "input",
            },
          ],
        },
        {
          id: "footer",
          size: 1,
          content: [
            {
              id: 8,
              title: "description",
              value: item.task_details,
              name: "description",
              element: "textArea",
            },
          ],
        },
      ];
    })
    .flat();

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full">
      <hr className="mt-8" />
      {records.map((record) => (
        <div className=" bg-slate-100 w-full xl:w-11/12" key={record.id}>
          <Form>
            <Form.Items
              data={record.content}
              size={record.size}
              handleChange={() => {}}
            />
          </Form>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
