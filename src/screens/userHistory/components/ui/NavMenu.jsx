import NavMenuItems from "./NavMenuItems";
import { transactionsNavbar } from "../../../../constants/navbar/menubar";
import DropDownIcon from "../../../user/component/ui/DropDownIcon";

function NavMenu() {
  return (
    <div tabIndex={-1} className="inline-flex items-center gap-20 h-full">
      {transactionsNavbar.map((menu) => (
        <div key={menu.id} className="group relative">
          <button
            aria-selected={location.pathname.includes(menu?.type)}
            className="h-16 inline-flex items-center px-6 border-2 rounded-t-xl border-transparent hover:border-stone-400/20 group-focus-within:border-stone-400/20 aria-selected:relative  aria-selected:before:absolute aria-selected:before:bottom-0 aria-selected:before:left-0 before:translate-y-full aria-selected:before:w-3/5 aria-selected:before:h-1 aria-selected:before:rounded-full aria-selected:before:bg-blue-600/60"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls={`headlessui-menu-items-${menu.id}`}
          >
            <span className="relative z-10">{menu.title}</span>
            {menu?.content && <DropDownIcon />}
          </button>

          {menu?.content && <NavMenuItems dropdown={menu.content} />}
        </div>
      ))}
    </div>
  );
}

export default NavMenu;
