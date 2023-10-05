import Arcodian from "./Arcodian";
import NewAdminUserAlert from "./NewAdminUserAlert";

function NewAdminUserCard() {
  const content = [
    {
      title: "Admin User",
      content: <NewAdminUserAlert />,
    },
  ];

  return <Arcodian content={content} />;
}

export default NewAdminUserCard;
