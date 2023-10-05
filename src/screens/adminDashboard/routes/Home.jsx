import { useLocation } from "react-router";
import Navbar from "../components/ui/Navbar";
import Metrics from "../components/ui/metricCard/Metrics";
import ChartCarousel from "../components/ui/carousel/ChartCarousel";
import DjangoLink from "../components/ui/DjangoLink";
import { useSearchParams } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [queryParameters] = useSearchParams();
  if (location.pathname === "/admin/dashboard") {
    return (
      <div className="block w-full">
        <section className="w-full sticky top-0 z-50">
          <Navbar />
        </section>
        <main className="w-full space-y-2">
          <section>
            <Metrics />
          </section>
          <section>
            <ChartCarousel />
          </section>
        </main>
        {queryParameters.get("djangoLink") && <DjangoLink />}
      </div>
    );
  }
  return <></>;
}

export default Home;
