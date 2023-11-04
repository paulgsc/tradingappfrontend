function NewOrdersIcon() {
  return (
    <div className="relative">
      <h3 className="relative">Orders</h3>
      <div className="absolute top-0 right-0 translate-x-full">
        <span
          aria-hidden={false}
          className="group relative flex justify-center items-center bg-transparent h-12 w-12 rounded-full animate-[bouncy_2s_ease-in-out_infinite] aria-hidden:opacity-0 aria-hidden:pointer-events-none aria-hidden:scale-90 transition-all ease-in-out duration-300"
        >
          <span className="  group-hover:animate-[rubberBand_2s_ease-in-out] absolute -top-2.5 left-0 w-6 h-6 inline-flex justify-center items-center rounded-full text-center text-xs font-bold text-white bg-red-600 ring ring-white">
            23
          </span>
        </span>
      </div>
    </div>
  );
}

export default NewOrdersIcon;
