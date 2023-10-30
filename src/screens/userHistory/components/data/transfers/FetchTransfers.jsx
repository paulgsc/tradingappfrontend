import { useSelector } from "react-redux";
import MyTransfers from "../../ui/MyTransfers";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOTransfers } from "../hooks/reactQuery";

function FetchTransfers({ query }) {
  const [queryParameters] = useSearchParams();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const pageNo = queryParameters.get("page") || 1;

  const queryKey = [`user-transfers-page-${pageNo}`];
  const {
    data: { results = [], next, previous, num_pages } = {},
    isLoading,
    isFetching,
  } = useQuery(queryKey, () => fetchOTransfers(token, pageNo), {
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <MyTransfers
      orders={results}
      hasNextPage={!!next}
      hasPreviousPage={!!previous}
      isFetching={isFetching}
      isLoading={isLoading}
      query={query}
      numPages={num_pages}
    />
  );
}

export default FetchTransfers;
