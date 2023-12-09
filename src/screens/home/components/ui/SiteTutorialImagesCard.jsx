function SiteTutorialImagesCard() {
  return (
    <div className="relative w-11/12 md:w-5/12 2xl:w-full 2xl:max-w-screen-md border border-slate-300 shadow-inner rounded-lg">
      <div className="relative w-full h-full max-md:h-72 overflow-hidden rounded-lg">
        <div className="duration-200 ease-linear">
          <img
            loading="lazy"
            src="https://source.unsplash.com/featured/?marketing"
            className=" animate-wiggle absolute inset-0 w-full h-full object-cover"
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}

export default SiteTutorialImagesCard;
