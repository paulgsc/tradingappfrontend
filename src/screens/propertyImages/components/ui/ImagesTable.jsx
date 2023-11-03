import { useState } from "react";
import Table from "../../../../components/tables/Table";
import { useDispatch } from "react-redux";
import { stageImageIds } from "../../hooks/reduxActions";
import DeleteImagesDialog from "../imageActions/DeleteImagesDialog";
import DeleteImageDialog from "../imageActions/DeleteImageDialog";
import { useEffect } from "react";

function ImagesTable({ type = "", data }) {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const columns = [
    {
      Header: "Image",
      accessor: (row) => row?.imageUrl || row?.object_key?.value, // Use imageUrl if available, otherwise use image
      Cell: ({ row }) => {
        return (
          <img
            className="h-12 w-12 rounded-md"
            src={
              row?.original?.imageUrl || row?.original?.property_image?.value
            }
            alt="Property"
          />
        );
      },
      width: "100%",
    },
    {
      Header: "Title",
      accessor: (row) => row?.imageName || row?.image_title?.value, // Use imageName if available, otherwise use image_title
      width: "100%",
    },

    {
      Header: "",
      accessor: "action_menu",
      width: "140px",
    },
  ];

  const updatedColumns = columns.map((column) => {
    if (column.accessor === "action_menu") {
      return {
        ...column,
        Cell: ({ row }) => (
          <>
            <DeleteImageDialog
              rowId={row?.original?.id}
              imageTitle={row?.imageName || row?.image_title?.value}
            />
          </>
        ),
      };
    }

    return {
      ...column,
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "rounded-md";
      case "header-row":
        return "flex justify-center w-full bg-stone-50 shadow-sm";
      case "header":
        return " flex w-full px-2 text-start text-base xl:text-lg text-black ";
      case "row":
        return "images-table-row flex justify-center items-center w-full h-16 border shadow-xs";
      case "cell":
        return " w-full px-2 flex items-center h-8 text-sm text-base font-bold text-[#447e9b] hover:underline";
      case "check-box-header":
        return " text-start";
      case "menu-container":
        return "absolute bg-white right-0 shadow-md border";
      default:
        return "";
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };
  const handleOpen = () => {
    setShowDialog(true);
  };

  useEffect(() => {
    dispatch(stageImageIds(type, selectedRowIds));
  }, [type, dispatch, selectedRowIds]);

  return (
    <div className="relative w-11/12 h-fit bg-white md:block">
      <button
        onClick={handleOpen}
        className={`absolute right-2 xl:right-3 xl:top-1 h-2 xl:h-4 w-2 xl:w-4 flex items-center justify-center ${
          selectedRowIds.length
            ? "top-1 text-red-600 hover:rounded-full xl:hover:bg-red-800 xl:hover:p-2 hover:ring-1 hover:ring-red-300 xl:hover:text-red-200 shadow-md"
            : "pointer-events-none invisible top-2"
        }`}
      >
        <i className="fa fa-trash fa-2xs " aria-hidden="true"></i>
      </button>
      <Table
        history={data || []}
        columnData={updatedColumns}
        getClassName={getClassName}
        showCheckboxColumn={true}
        getSelectedIds={setSelectedRowIds}
      />
      {showDialog && (
        <DeleteImagesDialog
          handleClose={handleClose}
          clearIds={clearIds}
          rowIds={selectedRowIds}
        />
      )}
    </div>
  );
}

export default ImagesTable;
