import { AngleDownSVG } from "../../../../constants/svgs/Svg";

function Arcodian({ content = [] }) {
  return (
    <>
      {content.map((item, i) => (
        <section
          key={i}
          className="flex items-start gap-12 w-full  border-gray-600/60"
        >
          <details
            open
            className="relative peer group list-none  p-2 lg:p-3 xl:p-4 cursor-pointer w-full open:max-w-fit"
          >
            <summary className="inline-flex items-center flex-row-reverse max-w-fit text-center gap-4 p-2 ">
              <h3 className="lg:text-lg xl:text-xl font-normal capitalize">
                {item.title}
              </h3>{" "}
              <AngleDownSVG
                className={
                  "w-3 h-3 text-neutral-400 rotate-180 group-open:rotate-0 transition-all duration-500"
                }
              />
            </summary>
          </details>
          <main className="hidden w-full peer-open:flex flex-col flex-1 p-2 blur-sm opacity-50 peer-open:blur-none peer-open:opacity-100 transition-all duration-500">
            {item.content}
          </main>
        </section>
      ))}
    </>
  );
}

export default Arcodian;
