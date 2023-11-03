import { Toaster } from "react-hot-toast";
import Navbar from "../components/ui/Navbar";
import NavLayout from "../../../components/ui/NavLayout";
import { useLocation } from "react-router";
import Security from "../components/pages/security/Security";
import Overview from "../components/pages/overview/Overview";
import FetchSettings from "../components/data/FetchSettings";

function SiteSettings() {
  const location = useLocation();
  return (
    <FetchSettings>
      <div className="block w-full">
        <NavLayout>
          <Navbar />
        </NavLayout>
        <main className="w-full ">
          {location.pathname.includes("/admin/site-settings/security") && (
            <Security />
          )}
          {location.pathname.includes("/admin/site-settings/overview") && (
            <Overview />
          )}
        </main>
        <Toaster />
      </div>
    </FetchSettings>
  );
}

export default SiteSettings;
