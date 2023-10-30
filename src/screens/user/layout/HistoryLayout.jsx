import HistoryNavBar from "../component/navbar/history/HistoryNavBar";
import { useLocation } from "react-router";
import HistorySidebar from "../component/sidebar/history/HistorySidebar";
import HistorySearchbar from "../component/searchbar/history/HistorySearchbar";
import Orders from "../component/tables/Orders";

function HistoryLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/personal/history") && (
        <div>
          <hr className="invisible mt-12" />
          <HistoryNavBar />
          <HistorySidebar />
          <HistorySearchbar />
          <Orders />
        </div>
      )}
    </>
  );
}

export default HistoryLayout;
