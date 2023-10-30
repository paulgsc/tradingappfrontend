import { useState } from "react";
import LoadingBtn from "../buttons/LoadingBtn";

function ReviewLoading({ children }) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingBtn />;
  }
  return <>{children}</>;
}

export default ReviewLoading;
