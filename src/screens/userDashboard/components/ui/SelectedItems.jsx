function SelectedItems({ selectedItems, draggableItems = [], onRemoveItem }) {
  return (
    <nav className="">
      <h2 className="ps-4 text-sm font-medium tracking-tight">
        Selected Actions
      </h2>
      <ul className="space-y-2.5 w-full shadow-inner bg-blue-50">
        {selectedItems.map((item) => (
          <li
            key={item.id}
            className="group even:bg-blue-100 odd:bg-blue-200/80 "
          >
            <button
              onClick={(event) => {
                onRemoveItem(item, event);
              }}
              aria-selected={draggableItems.includes(item)}
              className="relative w-full inline-flex items-center justify-center p-0.5 me-2 hover:bg-zinc-200 aria-selected:bg-zinc-200"
            >
              <span className="relative py-2.5 text-sm tracking-tight text-slate-600 group-hover:text-black">
                {item.action_name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SelectedItems;
