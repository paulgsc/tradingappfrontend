import { useLocation } from "react-router";
import AuthenticationSideMenu from "../../ui/AuthenticationSideMenu";
import CompanyDetails from "./pages/CompanyDetails";

function Overview() {
  const location = useLocation();
  const sideNavs = [
    {
      id: 1,
      title: "Company overview",
      path: "/admin/site-settings/overview/info",
    },
  ];
  return (
    <section className="flex flex-1 items-start justify-center mx-6 mt-2 space-x-4">
      <AuthenticationSideMenu sideNavs={sideNavs} />
      {location.pathname.includes("/overview/info") && <CompanyDetails />}
    </section>
  );
}

export default Overview;
