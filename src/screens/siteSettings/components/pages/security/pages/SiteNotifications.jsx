import ToggleButton from "../../../../../../components/ui/ToggleButton";
import AddNewArcodian from "../../../ui/AddNewArcodian";

function SiteNotifications() {
  return (
    <main className="w-full h-full">
      <AddNewArcodian />
      <ul className="w-full flex flex-col items-center">
        {Array(12)
          .fill()
          .map((item, i) => (
            <li
              key={i}
              className="w-8/12 inline-flex items-center justify-between"
            >
              <span role="text" className="">
                notifications
              </span>
              <ToggleButton />
            </li>
          ))}
      </ul>
    </main>
  );
}

export default SiteNotifications;
