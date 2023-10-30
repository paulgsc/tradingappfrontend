import { useQuery } from "@tanstack/react-query";
import MyOrders from "../../ui/MyOrders";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchOrders } from "../hooks/reactQuery";

function FetchOrders({ query }) {
  const [queryParameters] = useSearchParams();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const pageNo = queryParameters.get("page") || 1;

  const queryKey = [`user-orders-page-${pageNo}`];
  const {
    data: { results = [], next, previous, num_pages } = {},
    isLoading,
    isFetching,
  } = useQuery(queryKey, () => fetchOrders(token, pageNo), {
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <MyOrders
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

export default FetchOrders;
