import { useSelector } from "react-redux";
import { getSheetsPreview } from "../../hooks/reactQuery";
import { useSearchParams } from "react-router-dom";

function PreviewContent() {
  const [queryParameters] = useSearchParams();
  const params = {
    sheet_id: queryParameters.get("sheetId"),
    range: queryParameters.get("dataRange"),
  };
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data: { headers = [], content = [] } = {}, isLoading } =
    getSheetsPreview(token, params);

  if (isLoading) {
    return (
      <tbody>
        {Array(10)
          .fill("")
          .map((_, rowIdx) => (
            <tr
              key={rowIdx}
              className="even:bg-gray-300 odd:bg-blue-50 even:animate-pulse"
            >
              <td className="text-center border text-xs bg-white">{rowIdx}</td>
              {Array(5)
                .fill("")
                .map((_, colIdx) => (
                  <td
                    key={colIdx}
                    className={`text-start font-bold p-2 h-6 border hover:bg-blue-200`}
                  ></td>
                ))}
            </tr>
          ))}
      </tbody>
    );
  }

  return (
    <tbody>
      <tr>
        <td className="text-center border text-xs bg-white">1</td>
        {headers.map((header, hdRowIdx) => (
          <td
            key={hdRowIdx}
            className={`text-start font-bold bg-orange-400 px-1 border hover:bg-blue-200`}
          >
            {header}
          </td>
        ))}
      </tr>
      {content.map((contentRow, rowIdx) => (
        <tr key={rowIdx} className="h-6 even:bg-pink-200">
          <td className="text-center border text-xs bg-white">{rowIdx + 2}</td>

          {Object.keys(contentRow).map((key, colIdx) => (
            <td
              key={colIdx}
              className={`${
                rowIdx === 0
                  ? "lowercase font-semibold bg-indigo-600 text-white text-lg hover:bg-indigo-800"
                  : "font-normal hover:bg-blue-200 capitalize"
              } text-end px-1  border `}
            >
              {String(contentRow[key])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default PreviewContent;
