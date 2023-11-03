import CompanyDetailsData from "../../../data/CompanyDetailsData";
import CompanyLogoCard from "../../../ui/CompanyLogoCard";

function CompanyDetails() {
  return (
    <section className="w-full lg:max-w-6xl xl:max-w-full max-h-fit">
      <header>foo</header>
      <main className="flex items-start w-full space-x-2 p-2">
        <section className="w-full max-w-fit">
          <CompanyLogoCard />
        </section>
        <section className=" w-full">
          <CompanyDetailsData />
        </section>
      </main>
      <footer>foo</footer>
    </section>
  );
}

export default CompanyDetails;
