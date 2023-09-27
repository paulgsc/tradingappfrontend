import PropertyTitle from "../../../../components/property/PropertyTitle";
import ToPublishPreview from "../imageActions/ToPublishPreview";

function ImagePropertyCard() {
  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar">
      <PropertyTitle />
      <ToPublishPreview />
    </div>
  );
}

export default ImagePropertyCard;
