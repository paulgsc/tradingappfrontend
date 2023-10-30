import { useEffect, useRef, useState } from "react";
import HistorySideMenu from "../../components/ui/HistorySideMenu";
import TransfersTableSummary from "../../components/ui/tables/TransfersTableSummary";
import TableMenu from "../../components/ui/tables/TableMenu";
import FetchTransfers from "../../components/data/transfers/FetchTransfers";

function TransferHistory() {
  const inputRef = useRef();
  const [query, setQuery] = useState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);
  return (
    <section className="w-full flex justify-between">
      <HistorySideMenu />

      <div className="w-10/12 h-full mb-6 max-2xl:mb-20">
        <header className="2xl:z-10 2xl:sticky 2xl:top-16 w-full space-y-2 mx-auto bg-stone-50 pb-2">
          <TransfersTableSummary />
          <TableMenu inputRef={inputRef} setSearchQuery={setQuery} />
        </header>
        <FetchTransfers query={query} />
      </div>
    </section>
  );
}

export default TransferHistory;
