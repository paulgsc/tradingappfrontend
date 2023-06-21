import React from "react";

function Lists({ dataArray }) {
  return <div className="flex">{renderLists(dataArray)}</div>;
}

const renderLists = (data) => {
  const lists = [];
  let index = 0;

  while (index < data.length) {
    const listItems = data
      .slice(index, index + 3)

      .map((item, i) => (
        <div className="flex flex-wrap" key={i}>
          {item}
        </div>
      ));

    lists.push(
      <div key={index} className="flex-1 py-5 pl-5 overflow-hidden">
        <ul>
          <li className="text-xs text-gray-600 uppercase">
            {index === 0 ? "Receiver" : "Sender"}
          </li>
          {listItems}
        </ul>
      </div>
    );

    index += 3;
  }

  return lists;
};

export default Lists;
