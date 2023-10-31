import Navbar from "../components/ui/Navbar";
import Dashboard from "../components/ui/Dashboard";
import { useLocation } from "react-router";
import { useState } from "react";
import NavLayout from "../../../components/ui/NavLayout";

function Home() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  if (location.pathname === "/models") {
    return (
      <>
        <NavLayout>
          <Navbar globalFilter={searchQuery} setGlobalFilter={setSearchQuery} />
        </NavLayout>
        <main>
          <Dashboard searchQuery={searchQuery} />
        </main>
      </>
    );
  }
  return <></>;
}

export default Home;
