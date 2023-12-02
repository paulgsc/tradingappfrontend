import { useSelector } from "react-redux";
import Caraousel from "../../../../components/animation/Caraousel";
import ImagePropertyCard from "./ImagePropertyCard";
import ImageDescription from "./ImageDescription";
import { useSearchParams } from "react-router-dom";
import { fetchRentalPhotos } from "../../hooks/reactQuery";

function ImagesCard() {
  const [queryParameters] = useSearchParams();

  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const images = imageUpload.map((image) => image.imageUrl);

  const { imageActions: { overwrite = [], publish = [] } = {} } = useSelector(
    (state) => state.adminActions
  );

  const currentSearchParams = new URLSearchParams(queryParameters);
  // Convert the searchParams into an object
  const queryParamsObject = {};
  for (const [key, value] of currentSearchParams) {
    queryParamsObject[key] = value;
  }
  const { data } = fetchRentalPhotos(token, queryParamsObject);

  const publishedImages =
    (Array.isArray(data) && data.map((item) => item?.property_image?.value)) ||
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
        {queryParameters.get("tab") === "guide" && <ImagePropertyCard />}
        {queryParameters.get("tab") === "published" &&
          (overwrite?.length > 0 ? (
            <ImagePropertyCard imageData={data} />
          ) : (
            <Caraousel
              key={`${publishedImages.length}`}
              imageUrls={publishedImages}
              getClassname={getClassname}
            />
          ))}
        {queryParameters.get("tab") === "uploaded" &&
          (publish?.length > 0 ? (
            <ImagePropertyCard imageData={data} />
          ) : (
            <Caraousel imageUrls={images} getClassname={getClassname} />
          ))}
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
