import { useLocation } from "react-router";
import Navbar from "../components/ui/Navbar";
import Metrics from "../components/ui/Metrics";

function Home() {
  const location = useLocation();
  if (location.pathname === "/admin/dashboard") {
    return (
      <div className="block w-full">
        <section className="w-full sticky top-0 z-50">
          <Navbar />
        </section>
        <main className="flex w-full">
          <Metrics />
        </main>
      </div>
    );
  }
  return <></>;
}

export default Home;
