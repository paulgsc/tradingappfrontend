import { Link } from "react-router-dom";
import SideTabs from "../../../../components/sidemenu/SideTabs";

function SideNav() {
  const links = [
    {
      id: 1,
      title: "Notfications",
      path: "/personal/settings/notifications",
    },
  ];
  return (
    <aside className="shadow-sm h-full border-l bg-stone-100 col-span-1">
      <SideTabs className={"min-h-screen flex justify-center items-start "}>
        <div className="flex flex-col mx-auto ">
          <SideTabs.Title>
            <Link to={"/personal/settings"}> General Settings</Link>
          </SideTabs.Title>
          <SideTabs.Links className={" my-1 "} items={links} />
        </div>
      </SideTabs>
    </aside>
  );
}

export default SideNav;
