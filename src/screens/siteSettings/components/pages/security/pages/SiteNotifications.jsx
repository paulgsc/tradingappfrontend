import Arcodian from "../../../../../models/components/ui/Arcodian";
import AddNewArcodian from "../../../ui/AddNewArcodian";
import NotificationsCard from "../../../ui/notification/NotificationsCard";

function SiteNotifications() {
  const data = [
    {
      id: 1,
      title: "orders",
      content: <NotificationsCard />,
    },
    {
      id: 2,
      title: "transfers",
      content: <NotificationsCard />,
    },
    {
      id: 1,
      title: "profile",
      content: <NotificationsCard />,
    },
    {
      id: 1,
      title: "property",
      content: <NotificationsCard />,
    },
  ];
  return (
    <main className="w-full h-full">
      <AddNewArcodian />
      <Arcodian content={data} />
    </main>
  );
}

export default SiteNotifications;
