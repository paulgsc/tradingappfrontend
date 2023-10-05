import General from "../components/pages/General";
import Navbar from "../components/ui/Navbar";

function MyprofilePage() {
  return (
    <div className="block w-full">
      <section className="w-full sticky top-0 z-50">
        <Navbar />
      </section>
      <>
        <General />
      </>
    </div>
  );
}

export default MyprofilePage;
