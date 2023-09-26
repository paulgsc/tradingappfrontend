import { useSelector } from "react-redux";
import Caraousel from "../../../../components/animation/Caraousel";
import ImagePropertyCard from "./ImagePropertyCard";
import ImageDescription from "./ImageDescription";
import { useFetchPropertyWithImages } from "../../../../hooks/react-query";

function ImagesCard({ selectedQuery }) {
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const { propertyWithImages } = useFetchPropertyWithImages(selectedProperty);
  const images = imageUpload.map((image) => image.imageUrl);
  const selectedProperty =
    propertyWithImages.find((property) => property?.id === selectedQuery) || [];

  const publishedImages =
    (selectedProperty?.images &&
      selectedProperty?.images.map((item) =>
        import.meta.env.DEV
          ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${item.image}`
          : `${VITE_APP_BACKEND_URL}${item.image}`
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
          publishedImages={selectedProperty?.images && selectedProperty.images}
        />
      </div>
    </div>
  );
}

export default ImagesCard;
