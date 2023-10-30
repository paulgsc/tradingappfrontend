import { useEffect, useMemo, useRef } from "react";
import OrdersColumns from "./OrdersColumns";

function FetchNextOrders({
  hasNextPage,
  fetchNextPage,
  handleCellClick,
  orders,
  isLoading,
  token,
}) {
  const containerRef = useRef();
  const lastElementRef = useRef();

  const onIntersection = useMemo(() => {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    };
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    let ref;
    const observer = new IntersectionObserver(onIntersection, {
      root: containerRef.current, // Set your container as the root
      rootMargin: "0px",
      threshold: 1,
    });

    if (lastElementRef.current) {
      ref = lastElementRef.current;
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [containerRef, lastElementRef, onIntersection, orders]);

  return (
    <OrdersColumns
      handleCellClick={handleCellClick}
      orders={orders}
      token={token}
      isLoading={isLoading}
      containerRef={containerRef}
      lastRowRef={lastElementRef}
    />
  );
}

export default FetchNextOrders;
