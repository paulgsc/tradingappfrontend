import React from "react";
import { cn } from "../../lib/utils";

function TabMenu({ className, ...props }) {
  return <div className={cn(`${className} `)} {...props} />;
}

TabMenu.List = ({ className, ...props }) => {
  return (
    <ul
      role="tablist"
      className={cn(
        `${className} w-full h-fit flex flex-wrap p-0 m-0  text-base font-medium text-center`
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
        isTabActive(item.title) ? "border-blue-600" : "border-transparent"
      }`}
      id={`tabs-${item.title}`}
      type="button"
      role="tab"
      aria-controls={item.title}
      aria-selected={isTabActive(item.title)}
      onClick={() =>
        item?.path
          ? handleTabClick(item.title, item?.path)
          : handleTabClick(item.title)
      }
      {...props}
    />
  );
};

TabMenu.ContentCard = ({ className, ...props }) => {
  return <div id="myTabContent" className={cn(`${className} `)} {...props} />;
};

TabMenu.Content = ({ className, isTabActive, item, itemKey = "" }) => {
  return (
    <div
      key={`${item.id}_${itemKey}`}
      className={cn(
        `${className} ${
          isTabActive(item.title) ? "" : "hidden"
        } p-0 py-4 rounded-lg dark:bg-gray-800`
      )}
      id={item.title}
      role="tabpanel"
      aria-labelledby={`${item.title}-tab`}
    >
      {" "}
      {item.content}
    </div>
  );
};

export default TabMenu;
