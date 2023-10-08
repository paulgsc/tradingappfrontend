import { Toaster } from "react-hot-toast";
import Authentication from "../components/pages/Authentication";
import Navbar from "../components/ui/Navbar";

function SiteSettings() {
  return (
    <div className="block w-full">
      <section className="w-full sticky top-0 z-50">
        <Navbar />
      </section>
      <main className="w-full ">
        <Authentication />
      </main>
      <Toaster />
    </div>
  );
}

export default SiteSettings;
