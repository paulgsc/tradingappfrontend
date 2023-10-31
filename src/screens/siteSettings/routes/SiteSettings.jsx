import { Toaster } from "react-hot-toast";
import Authentication from "../components/pages/Authentication";
import Navbar from "../components/ui/Navbar";
import NavLayout from "../../../components/ui/NavLayout";

function SiteSettings() {
  return (
    <div className="block w-full">
      <NavLayout>
        <Navbar />
      </NavLayout>
      <main className="w-full ">
        <Authentication />
      </main>
      <Toaster />
    </div>
  );
}

export default SiteSettings;
