import { useSelector } from "react-redux";
import ImageUpdateTable from "./ImageUpdateTable";

function ToPublishPreview({ imageData }) {
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const { imageActions: { publish = [], overwrite = [] } = {} } = useSelector(
    (state) => state.adminActions
  );
  const toPublish =
    imageUpload.filter((image) => publish.includes(image?.id)) || [];
  const toReplace =
    imageData?.filter((image, index) => overwrite.includes(index)) || [];
  return <ImageUpdateTable toPubish={toPublish} toReplace={toReplace} />;
}

export default ToPublishPreview;
