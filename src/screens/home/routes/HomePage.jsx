import EditWrapper from "../../../components/wrapper/EditWrapper";
import Layout from "../Layout";
import Footer from "../components/footer/Footer";
import FeatureCard from "../components/hero/FeatureCard";
import Hero from "../components/hero/Hero";
import OurStory from "../components/our-story/OurStory";
import Testimonials from "../components/testimonials/Testimonials";
import Navbar from "../components/ui/Navbar";

function HomePage() {
  return (
    <Layout>
      <div className="relative">
        <section className="w-full sticky top-0 z-50 bg-white">
          <Navbar />
        </section>
        <section className="w-full">
          <FeatureCard />
          <Hero />
        </section>
        <section className="w-full flex justify-center items-center">
          <OurStory />
        </section>
        <section className="w-full bg-emerald-50">
          <EditWrapper path={"/admin/dashboard"}>
            <Testimonials />
          </EditWrapper>
        </section>
        <section className="">
          <Footer />
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
