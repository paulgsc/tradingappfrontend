import { Link, useParams } from "react-router-dom";

function UploadNavs() {
  const { model } = useParams();

  const sideNavs = [
    {
      id: 1,
      path: `/models/${model}/uploads`,
      title: "Upload from PC",
    },
    {
      id: 3,
      path: `/models/${model}/uploads/scheduled-actions`,
      title: "Scheduled uploads",
    },
  ];
  return (
    <aside className="col-span-2 flex flex-col space-y-4 p-2 my-4">
      {sideNavs.map((item, i) => (
        <Link
          to={item.path}
          key={i}
          className="bg-neutral-200/40 rounded-md p-2 text-sm"
        >
          {item.title}
        </Link>
      ))}
    </aside>
  );
}

export default UploadNavs;
