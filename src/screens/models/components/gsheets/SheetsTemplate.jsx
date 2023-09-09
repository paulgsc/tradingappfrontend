import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getModelsMetadata } from "../../hooks/reactQuery";
import { useEffect } from "react";

function SheetsTemplate({ children }) {
  const [highlightedColumns, setHighlightedColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const isMouseDown = useRef(false);
  const lastColumnIndex = useRef(null);
  const [dynamicLetters, setDynamicLetters] = useState([]);
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const {
    data: { fields_meta },
  } = getModelsMetadata(token, model);

  const handleHeaderMouseDown = (columnIndex, event) => {
    event.preventDefault();
    isMouseDown.current = true;
    lastColumnIndex.current = columnIndex;
    if (event.ctrlKey || event.metaKey) {
      if (selectedColumns.includes(columnIndex)) {
        setSelectedColumns(
          selectedColumns.filter((col) => col !== columnIndex)
        );
      } else {
        setSelectedColumns([...selectedColumns, columnIndex]);
      }
    } else {
      setSelectedColumns([columnIndex]);
    }
    if (columnIndex === dynamicLetters.length - 1) {
      setDynamicLetters((prevDynamicLetter) => [
        ...generateDynamicLetters(dynamicLetters),
      ]);
    }
  };

  const handleHeaderMouseEnter = (columnIndex) => {
    if (isMouseDown.current) {
      const startColumn = lastColumnIndex.current;
      const endColumn = columnIndex;
      const columnsRange = Array.from(
        { length: Math.abs(endColumn - startColumn) + 1 },
        (_, i) => Math.min(startColumn, endColumn) + i
      );
      setHighlightedColumns(columnsRange);
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    lastColumnIndex.current = null;
  };

  useEffect(() => {
    if (Array.isArray(fields_meta)) {
      const letters = ["A", "B", "C", "D"];
      setDynamicLetters(() => [
        ...generateDynamicLetters(letters, fields_meta.length + 5),
      ]);
    }
  }, [fields_meta]);
  return (
    <table className="w-full table-fixed mb-12">
      <thead className="w-full">
        <tr className="w-full">
          <th className=" w-10 border border-b-4 border-r-4 border-neutral-400/60 shadow-inner"></th>
          {dynamicLetters.map((letter, i) => (
            <th
              key={i}
              className={`w-48 leading-snug  border-2 border-neutral-300/60 font-normal ${
                highlightedColumns.includes(i) || selectedColumns.includes(i)
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
              onMouseDown={(event) => handleHeaderMouseDown(i, event)}
              onMouseEnter={() => handleHeaderMouseEnter(i)}
              onMouseUp={handleMouseUp}
            >
              {letter}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
}

function generateDynamicLetters(baseLetters, maxColumns) {
  const MAX_COLUMNS = maxColumns || 4;
  let dynamicLetters = [...baseLetters];

  while (dynamicLetters.length < MAX_COLUMNS) {
    const currentLetter = dynamicLetters[dynamicLetters.length - 1];
    const currentLetterLn = currentLetter.length;
    const nextLetterCode = currentLetter.at(-1).charCodeAt(0) + 1;

    if (nextLetterCode <= "Z".charCodeAt(0)) {
      if (currentLetterLn === 1)
        dynamicLetters.push(String.fromCharCode(nextLetterCode));
      else {
        dynamicLetters.push(
          `${currentLetter.slice(0, currentLetterLn - 1)}${String.fromCharCode(
            nextLetterCode
          )}`
        );
      }
    } else {
      dynamicLetters.push(`${"A".repeat(currentLetterLn + 1)}`);
    }
  }

  return dynamicLetters;
}

export default SheetsTemplate;
