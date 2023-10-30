import PropertyTitle from "../../../../components/property/PropertyTitle";
import ToPublishPreview from "../imageActions/ToPublishPreview";

function ImagePropertyCard({ imageData }) {
  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar">
      <PropertyTitle />
      <ToPublishPreview imageData={imageData} />
    </div>
  );
}

export default ImagePropertyCard;
