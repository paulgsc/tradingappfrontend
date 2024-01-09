function AvailableItems({ items, draggableItems = [], onSelectItem }) {
  return (
    <nav className="w-full">
      <h2 className="ps-4 text-sm font-medium tracking-tight">
        Available Actions
      </h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={(event) => {
                onSelectItem(item, event);
              }}
              aria-selected={draggableItems.includes(item)}
              className="relative w-full inline-flex items-center justify-center p-0.5 me-2 hover:bg-blue-50 aria-selected:bg-blue-100"
            >
              <span className="relative py-2.5 text-sm tracking-tight text-slate-600 hover:text-black">
                {item.action_name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AvailableItems;
