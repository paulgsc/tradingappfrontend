import { useSelector } from "react-redux";
import Caraousel from "../../../../components/animation/Caraousel";
import ImagePropertyCard from "./ImagePropertyCard";
import ImageDescription from "./ImageDescription";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchRentalPhotos } from "../../hooks/reactQuery";

function ImagesCard() {
  const [queryParameters] = useSearchParams();
  const [searchParams, setSearchParams] = useState({});
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const images = imageUpload.map((image) => image.imageUrl);

  const { data } = fetchRentalPhotos(token, searchParams);
  const publishedImages =
    (Array.isArray(data) &&
      data.map((item) =>
        import.meta.env.DEV
          ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${item?.image?.value}`
          : `${VITE_APP_BACKEND_URL}${item?.image?.value}`
      )) ||
    [];

  const getClassname = (name) => {
    switch (name) {
      case "image-container":
        return "relative overflow-hidden rounded-lg  h-[440px] md:h-[360px] xl:h-[524px]";
      case "full-screen":
        return "fixed top-0 left-0 w-full h-full z-50";
      default:
        return "";
    }
  };

  useEffect(() => {
    const recordId = queryParameters.get("recordId");
    const propertyId = queryParameters.get("propertyId");
    if (recordId) {
      setSearchParams(() => ({
        record_id: recordId,
      }));
    } else if (propertyId) {
      setSearchParams(() => ({
        property_id: propertyId,
      }));
    } else {
      setSearchParams({});
    }
  }, [queryParameters]);
  return (
    <div className="flex flex-col w-full h-full gap-2 ">
      <div className="flex justify-center items-center row-span-1 xl:row-span-1 h-full">
        {[
          "/admin/site/models/propertyimages/uploads",
          "/admin/site/models/propertyimages/published",
        ].includes(location.pathname) ? (
          <>
            {location.pathname.includes("published") ? (
              <Caraousel
                key={`${publishedImages.length}`}
                imageUrls={publishedImages}
                getClassname={getClassname}
              />
            ) : (
              <Caraousel imageUrls={images} getClassname={getClassname} />
            )}
          </>
        ) : (
          <>
            <ImagePropertyCard />
          </>
        )}
      </div>
      <div className="flex justify-center items-center row-span-2 xl:row-span-1 h-full shadow-sm border-t-2">
        <ImageDescription
          publishedImages={(Array.isArray(data) && data) || []}
        />
      </div>
    </div>
  );
}

export default ImagesCard;
