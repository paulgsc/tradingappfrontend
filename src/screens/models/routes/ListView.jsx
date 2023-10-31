import Navbar from "../components/ui/Navbar";
import { useLocation, useParams } from "react-router";
import PaginatedResults from "../components/ui/PaginatedResults";
import { useState } from "react";
import QuickSummary from "../components/ui/QuickSummary";
import NavLayout from "../../../components/ui/NavLayout";

function ListView() {
  const location = useLocation();
  const { model } = useParams();

  const [globalFilter, setGlobalFilter] = useState("");

  if (model && location.pathname === `/models/${model}/list-view`) {
    return (
      <>
        <NavLayout>
          <Navbar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </NavLayout>
        <section className=" min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
          <header>
            <QuickSummary />
          </header>

          <PaginatedResults globalFilter={globalFilter} />
        </section>
      </>
    );
  }
  return <></>;
}

export default ListView;
