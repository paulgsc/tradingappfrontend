import React from "react";
import { useSelector } from "react-redux";
import Caraousel from "../../../../components/animation/Caraousel";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";
import { useQuery } from "@tanstack/react-query";

function OrderPropertyImages() {
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  const queryKey = ["active-property"];
  const { data: { images = [] } = {} } = useQuery(
    queryKey,
    fetchSelectedProperty,
    {
      enabled: true,
    }
  );

  const propertyImages =
    images.map((item) =>
      import.meta.env.DEV
        ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${item.image}`
        : `${VITE_APP_BACKEND_URL}${item.image}`
    ) || [];
  return <Caraousel getClassname={getClassname} imageUrls={propertyImages} />;
}

const getClassname = (name) => {
  switch (name) {
    case "image-container":
      return "relative overflow-hidden shadow-inner outline outline-neutral-400 rounded-lg  h-[440px] md:h-[524px] lg:h-[440px] xl:h-[524px]";
    case "full-screen":
      return "fixed flex flex-1 left-0 right-0 top-0 min-h-screen w-screen z-50";
    default:
      return "";
  }
};

export default OrderPropertyImages;
