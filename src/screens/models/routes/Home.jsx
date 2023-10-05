import Navbar from "../components/ui/Navbar";
import Dashboard from "../components/ui/Dashboard";
import { useLocation } from "react-router";
import { useState } from "react";

function Home() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  if (location.pathname === "/models") {
    return (
      <>
        <section className=" sticky top-0 z-50">
          <Navbar globalFilter={searchQuery} setGlobalFilter={setSearchQuery} />
        </section>
        <main>
          <Dashboard searchQuery={searchQuery} />
        </main>
      </>
    );
  }
  return <></>;
}

export default Home;
