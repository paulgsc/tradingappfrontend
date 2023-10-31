function HoldingItemCard({ accessor, value, row }) {
  if (accessor === "property_address") {
    return (
      <div className="h-full w-full flex items-center justify-start gap-6">
        <img
          src="https://source.unsplash.com/75x75/?modern-house?3"
          alt=""
          className="w-12 h-12  rounded-md aspect-square"
        />
        <div>
          <h3 className="text-base capitalize font-medium">{value || ""}</h3>
          <span
            role="text"
            className="text-sm font-thin capitalize text-neutral-600"
          >{`${row.original.total_purchased_shares || 0} shares`}</span>
        </div>
      </div>
    );
  }
  if (accessor === "total_purchased_amount") {
    return (
      <div className="h-full w-full">
        <span className="h-full w-full max-w-fit rounded-lg p-2 inline-flex items-center bg-emerald-500/90 text-white">
          <h3 className="font-semibold text-lg 2xl:text-2xl"> {value || ""}</h3>
        </span>
      </div>
    );
  }

  if (accessor === "dividend") {
    return (
      <div className="group inline-flex items-center text-center space-x-6 w-full h-">
        <h3 className="font-semibold text-emerald-600/80 text-lg 2xl:text-3xl hover:text-emerald-700">
          {value ? " +" : " "}
          {value || ""}
        </h3>

        <span
          role="text"
          className=" max-2xl:inline-flex max-2xl:items-start text-end max-2xl:space-x-2 h-full"
        >
          <i className=" max-2xl:mt-0.5 text-emerald-600/80 fa-xl fa-solid fa-hand-holding-dollar group-hover:text-emerald-700"></i>
          <small className="2xl:absolute 2xl:bottom-0 left-1/5 lowercase text-[.65rem] text-neutral-400 group-hover:text-emerald-500">
            dividends earned
          </small>
        </span>
      </div>
    );
  }
}

export default HoldingItemCard;
