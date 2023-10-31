import Arcodian from "../../../models/components/ui/Arcodian";
import Roles from "../ui/roles/Roles";
import SideNav from "../ui/SideNav";

function Advanced() {
  const content = [
    {
      title: "Roles",
      content: <Roles />,
    },
  ];

  return (
    <main className="flex w-full">
      <div className="w-2/12">
        <SideNav />
      </div>
      <section className="w-10/12 flex justify-center px-12 py-6">
        <div className="w-full h-fit shadow-sm border-b border-l border-neutral-100">
          <Arcodian content={content} className={"flex flex-col"} />
        </div>
      </section>
    </main>
  );
}

export default Advanced;
