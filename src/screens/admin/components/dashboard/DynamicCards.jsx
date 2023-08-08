import React from "react";

function DynamicCards({ data, size, classname }) {
  const ListItems = [];
  let index = 0;

  while (index < data.length) {
    const listItems = data.slice(index, index + size).map((item, i) => (
      <div key={`${item.id}_${i}_dashboard`} className={classname}>
        {item}
      </div>
    ));

    ListItems.push(
      <div key={index} className="flex">
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
}

export default DynamicCards;
