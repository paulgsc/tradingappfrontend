import ToggleButton from "../../../../../components/ui/ToggleButton";

function NotificationsCard() {
  return (
    <ul className="w-full flex flex-col items-center mx-auto mt-12">
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
  );
}

export default NotificationsCard;
