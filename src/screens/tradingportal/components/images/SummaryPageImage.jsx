import React from "react";
import { useSelector } from "react-redux";
import OrderSummary from "../../../../components/ui/OrderSummary";

function SummaryPageImage() {
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  const { tradingPropertyInfo: { images = [] } = {} } = useSelector(
    (state) => state.propertyData
  );
  const propertyImages =
    images
      .slice(0, 1)
      .map((item) =>
        import.meta.env.DEV
          ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${item.image}`
          : `${VITE_APP_BACKEND_URL}${item.image}`
      ) || [];
  return <OrderSummary.Img className={""} src={propertyImages} />;
}

export default SummaryPageImage;
