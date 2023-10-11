import { useLocation } from "react-router";
import ImagesTable from "../ui/ImagesTable";

function PublishedImages({ publishedImages }) {
  const location = useLocation();

  if (location.pathname === "/models/PropertyImage/images/uploads/published")
    return <ImagesTable type="published" data={publishedImages} />;
}

export default PublishedImages;
