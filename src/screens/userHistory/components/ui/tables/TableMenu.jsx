import { useParams } from "react-router";
import DateRange from "../../../../models/components/ui/DateRange";
import SearchBar from "./SearchBar";

function TableMenu({ inputRef, setSearchQuery }) {
  const { model } = useParams();
  return (
    <div className="flex items-center justify-between gap-12 px-12">
      <div className="inline-flex items-center space-x-12">
        <DateRange />
      </div>
      <h1 className="uppercase font-bold text-lg text-zinc-500">{model}</h1>
      <SearchBar inputRef={inputRef} setQuery={setSearchQuery} />
    </div>
  );
}

export default TableMenu;
