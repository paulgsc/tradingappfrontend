import { cn } from "../../lib/utils";

function TabMenu({ className, ...props }) {
  return <section className={cn(`${className} `)} {...props} />;
}

TabMenu.List = ({ className, ...props }) => {
  return (
    <ul
      role="tablist"
      className={cn(
        `${className} w-full flex flex-wrap text-base font-medium text-center`
      )}
      {...props}
    />
  );
};

TabMenu.ListItems = ({ className, ...props }) => {
  return (
    <li
      role="presentation"
      className={cn(`${className} mr-1 xl:mr-2`)}
      {...props}
    />
  );
};

TabMenu.ButtonAction = ({
  className,
  item,
  isTabActive,
  handleTabClick,
  ...props
}) => {
  return (
    <button
      className={`p-2 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300  ${
        isTabActive(item.id) ? "border-blue-600" : "border-transparent"
      }`}
      id={`tabs-${item.id}`}
      type="button"
      role="tab"
      aria-controls={item.id}
      aria-selected={isTabActive(item.id)}
      onClick={() =>
        item?.path
          ? handleTabClick(item.id, item?.path)
          : handleTabClick(item.id)
      }
      {...props}
    />
  );
};

TabMenu.ContentCard = ({ className, ...props }) => {
  return <div id="myTabContent" className={cn(`${className} `)} {...props} />;
};

TabMenu.Content = ({ className, isTabActive, item, itemKey = "" }) => {
  if (isTabActive) {
    return (
      <div
        key={`${item.id}_${itemKey}`}
        className={cn(
          `${className} ${
            isTabActive(item.id) ? "" : "hidden"
          } p-0 py-4 rounded-lg`
        )}
        id={item.title}
        role="tabpanel"
        aria-labelledby={`${item.id}-tab`}
      >
        {" "}
        {item.content}
      </div>
    );
  }
  return <></>;
};

export default TabMenu;
