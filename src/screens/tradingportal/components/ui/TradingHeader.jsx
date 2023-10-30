import { useQueryClient } from "@tanstack/react-query";

function TradingHeader() {
  const queryClient = useQueryClient();
  const { property_name = "" } = queryClient.getQueriesData("active-property");
  return (
    <header className="flex items-center justify-center h-24 w-full rounded bg-gray-50 dark:bg-gray-800">
      <h1 className="text-base lg:text-2xl xl:text-3xl leading-relaxed text-gray-600 dark:text-gray-500">
        Own a Piece of {property_name}: Invest Now, Reap the Benefits Forever
      </h1>
    </header>
  );
}

export default TradingHeader;
