import { useSelector } from "react-redux";
import ImageUpdateTable from "./ImageUpdateTable";

function ToPublishPreview() {
  const { imageUpload = [], imagesSelectedQuery: { images = [] } = {} } =
    useSelector((state) => state.adminFetchData);
  const { imageActions: { publish = [], overwrite = [] } = {} } = useSelector(
    (state) => state.adminActions
  );
  const toPublish =
    imageUpload.filter((image) => publish.includes(image?.id)) || [];
  const toReplace =
    images.filter((image) => overwrite.includes(image?.id)) || [];
  return <ImageUpdateTable toPubish={toPublish} toReplace={toReplace} />;
}

export default ToPublishPreview;
