import NavLayout from "../../../components/ui/NavLayout";
import ImagesPortal from "../components/ui/ImagesPortal";
import Navbar from "../components/ui/Navbar";

function PropertyImagesPages() {
  return (
    <>
      <NavLayout>
        <Navbar />
      </NavLayout>
      <main className="">
        <ImagesPortal />
      </main>
    </>
  );
}

export default PropertyImagesPages;
