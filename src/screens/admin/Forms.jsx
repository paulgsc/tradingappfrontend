import React, { useEffect, useState } from "react";
import { DeleteIcon, SaveIcon } from "../../constants/svgs/Svg";
import {
  fetchPropertiesByIdQuery,
  fetchPropertiesMetaData,
} from "../../hooks/react-query";
import { useDispatch, useSelector } from "react-redux";
import { djangoToReactTypes, notify } from "../../lib/utils";
import { Toaster } from "react-hot-toast";
import {
  createProperty,
  updateProperty,
} from "../../contexts/redux/actions/adminFetchDataAction";
import ToastAlerts from "../../components/ui/ToastAlerts";

function Forms({ recordId = null, create = false }) {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({});
  const [showFocus, setShowFocus] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const [missingRequiredFields, setMissingRequiredFields] = useState([]);
  const { userInfo: { token = "", is_admin = false } = {}, error = null } =
    useSelector((state) => state.userAuth);
  const {
    loading,
    updateSuccess = false,
    createSuccess = false,
    itFailed = false,
  } = useSelector((state) => state.adminFetchData);
  const { property, isLoading, isError } = create
    ? fetchPropertiesMetaData(token)
    : fetchPropertiesByIdQuery(token, recordId);

  const handleRecordChange = (name, value) => {
    const fieldType = create
      ? property[name]?.type
      : property.field_metadata[name]?.type;

    // Convert the value based on the field type
    switch (fieldType) {
      case "IntegerField":
        value = parseInt(value, 10);
        break;
      case "BooleanField":
        value = value === "true";
        break;
      // Add more cases for other field types if needed
      default:
        break;
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        edited: true,
      },
    }));
  };

  const handleSubmit = () => {
    setSaveCount((prevCount) => prevCount + 1);
    // Check if all required fields are filled
    let data = {};
    Object.keys(editedData).forEach(
      (key) => (data = { ...data, [key]: editedData[key].value })
    );
    const requiredFields =
      property &&
      Object.entries(create ? property : property?.field_metadata)
        .filter(([_, value]) => value.required === true)
        .map(([key]) => key);

    const missingFields = requiredFields.filter((field) => {
      if (!create) {
        return !data[field] && !property[field];
      }
      if (create) {
        return !data[field];
      }
    });

    if (missingFields.length > 0) {
      if (missingFields?.includes("created_at") && missingFields.length > 1) {
        // Handle the case when required fields are missing
        setMissingRequiredFields(missingFields);

        notify("Required fields are missing:");
        return;
      }
    }

    // Validate field types
    const invalidFields = Object.entries(data).filter(([name, value]) => {
      const fieldType = create
        ? property[name]?.type
        : property.field_metadata[name]?.type;
      if (!fieldType) {
        // Skip validation if the field type is not defined

        notify("invalid field type");
        return false;
      }

      // Validate field type based on the Django to React mapping
      switch (fieldType) {
        case "CharField":
          return typeof value !== "string";
        case "IntegerField":
          return typeof value !== "number" || !Number.isInteger(value);
        case "BooleanField":
          return typeof value !== "boolean";
        // Add more cases for other field types if needed
        default:
          return false;
      }
    });
    if (invalidFields.length > 0) {
      // Handle the case when invalid field types are found
      notify("Invalid field types:");
      return;
    }

    // All field types are valid and all required fields are filled
    // Perform the form submission logic here
    const postRecord = async () => {
      if (create) {
        data && dispatch(createProperty(data));
      }
      if (!create) {
        if ("id" in data) {
          data && dispatch(updateProperty(data));
        } else {
          data && dispatch(updateProperty({ ...data, id: property.id }));
        }
      }
    };
    postRecord();
    if (!loading && createSuccess) {
      notify("New record successfuly created!");
    }
    if (!loading && updateSuccess) {
      notify(
        <ToastAlerts>
          <ToastAlerts.Success />
        </ToastAlerts>,
        "top-center"
      );
    }
    if (!loading && itFailed) {
      notify("Looks like something went wrong!");
    }
  };

  useEffect(() => {
    let timeoutId;

    // Show the red focus for 5 seconds
    setShowFocus(true);
    timeoutId = setTimeout(() => {
      setShowFocus(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [saveCount]);

  const FormIcon = ({ icon, label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center px-5 py-2.5 font-medium tracking-wide capitalize rounded-md focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
    >
      {icon}
      <span className="pl-2 mx-1">{label}</span>
    </button>
  );

  return (
    <div className="mx-auto flex flex-col relative">
      <div className="flex justify-between items-center p-3">
        <div className="flex-initial">
          <h6 className="flex items-center text-blueGray-400 text-lg mt-3 mb-6 font-light capitalize">
            Change property
          </h6>
        </div>
        <div className="sticky top-0  flex flex-row-reverse items-center">
          <div className="flex-initial pl-3 font-medium tracking-wide text-white bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
            <FormIcon icon={<SaveIcon />} label="Save" onClick={handleSubmit} />
          </div>
          <div className="flex-initial">
            <FormIcon
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => notify("Delete clicked")}
            />
          </div>
        </div>
      </div>
      <div className="flex min-h-screen bg-gray-100 overflow-y-auto">
        <OpenView
          handleRecordChange={handleRecordChange}
          editedData={editedData}
          property={property}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />
      </div>
      <Toaster />
    </div>
  );
}

const OpenView = ({
  handleRecordChange,
  property,
  editedData,
  setEditedData,
  showFocus,
  missingRequiredFields,
  create,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleRecordChange(name, value);
  };

  const sections = [
    {
      title: "Property Overview",
      data: [
        { id: 1, title: "Name", name: "property_name" },
        { id: 2, title: "Description", name: "description" },
        { id: 3, title: "Rental Status", name: "rental_status" },
        { id: 4, title: "Monthly Rent", name: "monthly_rent" },
        { id: 5, title: "Rental Revenue", name: "rental_revenue" },
        {
          id: 6,
          title: "Current Property Value",
          name: "current_property_value",
        },
      ],
    },
    {
      title: "Property Address",
      data: [{ id: 7, title: "Address", name: "property_address" }],
    },
    {
      title: "Property Location",
      data: [
        { id: 8, title: "ZIP Code", name: "zip_code" },
        { id: 9, title: "State", name: "state" },
        { id: 10, title: "City", name: "city" },
      ],
    },
    {
      title: "Financial Information",
      data: [
        { id: 11, title: "Dividend", name: "dividend" },
        { id: 12, title: "Purchased Value", name: "purchased_property_value" },
        { id: 13, title: "Price per Share", name: "price_per_share" },
        { id: 14, title: "Total Shares", name: "total_property_shares" },
        { id: 15, title: "Income", name: "income" },
        { id: 16, title: "Expenses", name: "expenses" },
        { id: 17, title: "Maximum Shares", name: "max_shares" },
        { id: 18, title: "Initial Profits", name: "initial_profits" },
        { id: 19, title: "Final Profits", name: "final_profits" },
      ],
    },
    {
      title: "Property Image",
      data: [{ id: 20, title: "URL", name: "url" }],
    },
  ];

  return (
    <section className="min-h-screen w-full py-1 bg-blueGray-50">
      <div className="flex-auto w-full px-4 lg:px-10 py-10 pt-0">
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Overview
        </h6>
        <PropertyData
          data={sections}
          size={2}
          title={"Property Overview"}
          handleChange={handleChange}
          property={property}
          editedData={editedData}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Location
        </h6>
        <PropertyData
          data={sections}
          size={1}
          title={"Property Address"}
          handleChange={handleChange}
          property={property}
          editedData={editedData}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />
        <PropertyData
          data={sections}
          size={3}
          title={"Property Location"}
          handleChange={handleChange}
          property={property}
          editedData={editedData}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Metrics
        </h6>
        <PropertyData
          data={sections}
          size={2}
          title={"Financial Information"}
          handleChange={handleChange}
          property={property}
          editedData={editedData}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Images Links
        </h6>
        <PropertyData
          data={sections}
          size={2}
          title={"Property Image"}
          handleChange={handleChange}
          property={property}
          editedData={editedData}
          setEditedData={setEditedData}
          showFocus={showFocus}
          missingRequiredFields={missingRequiredFields}
          create={create}
        />
      </div>
    </section>
  );
};

const PropertyData = ({
  data,
  size,
  title,
  handleChange,
  property,
  editedData,
  showFocus,
  missingRequiredFields,
  create,
}) => {
  const ListItems = [];

  let index = 0;
  const findDataByTitle = (sections, title) => {
    const section = sections.find((section) => section.title === title);
    return section?.data || [];
  };

  // Usage
  const matchedData = findDataByTitle(data, title);
  while (index < matchedData.length) {
    const listItems = matchedData.slice(index, index + size).map((item, i) => {
      const isRequired =
        missingRequiredFields?.includes(item.name) && showFocus;

      return (
        <div key={item.id} className=" w-full  px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              {item.title}
            </label>
            <input
              type={
                djangoToReactTypes[
                  (property &&
                    property.field_metadata &&
                    !create &&
                    property.field_metadata[item.name]?.type) ||
                    (property && create && property[item.name]?.type) ||
                    false
                ] || "text"
              }
              required={
                (property &&
                  property.field_metadata &&
                  !create &&
                  property.field_metadata[item.name]?.required) ||
                (property && create && property[item.name]?.required) ||
                false
              }
              name={item.name}
              className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 focus:ring-blue-500 focus:border-blue-500  ${
                isRequired && "ring-4 ring-red-500"
              }`}
              value={
                editedData[item?.name]?.value ||
                (property &&
                  !create &&
                  !editedData[item?.name]?.edited &&
                  property[item?.name]) ||
                ""
              }
              onChange={handleChange}
            />
          </div>
        </div>
      );
    });

    ListItems.push(
      <div key={index} className=" flex flex-grow">
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
};

export default Forms;
