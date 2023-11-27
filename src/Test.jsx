import { AngleDownSVG } from "./constants/svgs/Svg";

function Test() {
  const content = [
    {
      title: "income events",
      content: (
        <>
          <h6>
            All transactions generated from the ongoing operation of the rental
            property. These inlcude:
          </h6>
          <ul>
            <li>Rent payments</li>
          </ul>
        </>
      ),
    },
    {
      title: "onboarding events",
      content: (
        <>
          <h6>
            All transactions generated from the ongoing operation of the rental
            property. These inlcude:
          </h6>
          <ul>
            <li>Rent payments</li>
          </ul>
        </>
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen">
      <article className="inline-block px-2 pb-6 border-2 border-b-0 border-neutral-100 rounded-t-lg w-full max-w-xl">
        {content.map((item, i) => (
          <section key={i} className="w-11/12 border-b">
            <details
              open
              className="relative peer group list-none  p-2 lg:p-3 xl:p-4 cursor-pointer w-full open:max-w-fit"
            >
              <summary className="inline-flex items-center flex-row-reverse max-w-fit text-center gap-4 p-2">
                <h3 className="lg:text-lg xl:text-xl font-normal capitalize">
                  {item.title}
                </h3>
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
      </article>
    </div>
  );
}

export default Test;
