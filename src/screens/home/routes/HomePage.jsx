import EditWrapper from "../../../components/wrapper/EditWrapper";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Testimonials from "../components/testimonials/Testimonials";
import Navbar from "../components/ui/Navbar";

function HomePage() {
  return (
    <div className="relative">
      <section className="w-full sticky top-0 z-50 bg-white">
        <Navbar />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="w-full">
        <EditWrapper path={"/admin/dashboard"}>
          <Testimonials />
        </EditWrapper>
      </section>
      <section className="">
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
