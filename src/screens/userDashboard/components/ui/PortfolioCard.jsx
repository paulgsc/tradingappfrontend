import PortfolioData from "../data/PortfolioData";

function PortfolioCard() {
  return (
    <section className="w-full max-h-[22.5rem] bg-white shadow-sm rounded-lg p-4 overflow-y-auto no-scrollbar">
      <span
        role="text"
        className="sticky -top-4 z-10 w-full h-12 inline-flex items-center px-2 bg-white"
      >
        <h3 className="font-normal text-neutral-400 capitalize ml-3 mb-2">
          Property Holding
        </h3>
      </span>
      <PortfolioData getClassName={getClassName} />
    </section>
  );
}

const getClassName = (componentType) => {
  switch (componentType) {
    case "table":
      return "w-full h-full p-2 bg-transparent";
    case "header-row":
      return "hidden";
    case "header":
      return "flex flex-1 text-sm xl:text-base font-semibold capitalize";
    case "tbody":
      return "w-full h-full space-y-4";
    case "row":
      return "flex xl:flex-1 items-center w-full h-fit 2xl:h-16 space-x-2 p-2 rounded-l-lg rounded-r-2xl bg-gradient-to-tr even:from-blue-100 odd:from-teal-200/60 via-white to-transparent";
    case "cell":
      return "h-full w-full flex flex-1 items-center relative";
    default:
      return "";
  }
};

export default PortfolioCard;
