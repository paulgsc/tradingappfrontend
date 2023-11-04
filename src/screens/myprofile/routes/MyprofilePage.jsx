import { useSearchParams } from "react-router-dom";
import NavLayout from "../../../components/ui/NavLayout";
import General from "../components/pages/General";
import Navbar from "../components/ui/Navbar";
import Advanced from "../components/pages/Advanced";

function MyprofilePage() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
    <div className="block w-full">
      <NavLayout>
        <Navbar />
      </NavLayout>
      {(currentTab === "general" || !currentTab) && <General />}
      {currentTab === "advanced" && <Advanced />}
    </div>
  );
}

export default MyprofilePage;
