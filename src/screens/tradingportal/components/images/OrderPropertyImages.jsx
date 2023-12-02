import Caraousel from "../../../../components/animation/Caraousel";
import EditWrapper from "../../../../components/wrapper/EditWrapper";
import ImageSkeleton from "./ImageSkeleton";
import { useQueryClient } from "@tanstack/react-query";

function OrderPropertyImages() {
  const queryClient = useQueryClient();
  let propertyLoading = false;
  const { images = [] } = queryClient.getQueryData(["active-property"]) || {};

  if (propertyLoading) {
    return <ImageSkeleton />;
  }
  return (
    <EditWrapper path={"/models/PropertyImage/images/uploads"}>
      <Caraousel getClassname={getClassname} imageUrls={images} />
    </EditWrapper>
  );
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
