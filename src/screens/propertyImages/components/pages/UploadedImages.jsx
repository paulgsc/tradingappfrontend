import { useLocation } from "react-router";
import ImagesTable from "../ui/ImagesTable";

function UploadedImages({ uploadedImages }) {
  const location = useLocation();
  console.log("this rerun");

  if (location.pathname === "/models/PropertyImage/images/uploads/stage")
    return <ImagesTable type="uploads" data={uploadedImages} />;
}

export default UploadedImages;
