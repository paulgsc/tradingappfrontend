import { getModelsMetadata } from "../../hooks/reactQuery";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function MetaContent() {
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const {
    data: { fields_meta = [] },
  } = getModelsMetadata(token, { model: model });

  return (
    <tbody>
      {Object.keys(fields_meta[0] || {}).map((key, rowIdx) => (
        <tr key={rowIdx} className="h-6 even:bg-pink-200">
          <td className="text-center border text-xs bg-white">{rowIdx + 1}</td>
          <td
            className={`text-start font-bold bg-orange-400 px-1 border hover:bg-blue-200`}
          >
            {key}
          </td>
          {fields_meta?.map((field, colIdx) => (
            <td
              key={colIdx}
              className={`${
                rowIdx === 0
                  ? "lowercase font-semibold bg-indigo-600 text-white text-lg hover:bg-indigo-800"
                  : "font-normal hover:bg-blue-200 capitalize"
              } text-end px-1  border `}
            >
              {String(field[key])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default MetaContent;
