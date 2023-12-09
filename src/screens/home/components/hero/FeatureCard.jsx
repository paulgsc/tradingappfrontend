import AccordianHeroCard from "../ui/Accordian";

function FeatureCard() {
  const content = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: (
        <div className="space-y-3">
          <p className=" break-words leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="flex flex-col">
            <li>Lorem ipsum</li>
            <li>Dolor sit amet</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: (
        <div className="space-y-3">
          <p className=" break-words leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <ul className="flex flex-col ">
            <li>Consectetur adipiscing</li>
            <li>Ut enim ad minim</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: (
        <div className="space-y-3">
          <p className=" break-words leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur.
          </p>
          <ul className="flex flex-col ">
            <li>Reprehenderit in voluptate</li>
            <li>Duis aute irure dolor</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="max-md:container flex max-md:flex-col grow flex-1 max-md:items-center justify-center w-full h-full max-md:mt-4 md:mt-10 mb-6 gap-4 xl:gap-12 2xl:gap-20">
      <div className="relative w-11/12 md:w-5/12 2xl:w-full 2xl:max-w-screen-md border border-slate-300 shadow-inner rounded-lg">
        <div className="relative w-full h-full max-md:h-72 overflow-hidden rounded-lg">
          <div className="circle duration-200 ease-linear">
            <img
              loading="lazy"
              src="https://source.unsplash.com/featured/?marketing"
              className="logo absolute inset-0 w-full h-full object-cover"
              alt="..."
            />
          </div>
        </div>
      </div>
      <AccordianHeroCard content={content} />
    </div>
  );
}

export default FeatureCard;
