import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Forms() {
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Forms.OpenView />
      </div>
    </div>
  );
}

Forms.closedView = ({
  id,
  property_name,
  property_address,
  purchased_property_value,
  current_property_value,
  price_per_share,
  total_property_shares,
  income,
  expenses,
  initial_profits,
  final_profits,
  url,
  users,
}) => (
  <div className="h-fit w-full mt-5 bg-white shadow cursor-pointer rounded-xl">
    <div className="flex h-fit w-full">
      <div className="w-full">
        <span>{id}</span>
        <span>{property_name}</span>
        <span>{property_address}</span>
      </div>
      <div className="flex-none pt-2.5 pr-2.5 pl-1">
        <button
          type="button"
          className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path>
            <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
);

Forms.Icons = () => (
  <div className="flex justify-between items-center p-3 ">
    <div className="flex-initial">
      <h6 className="flex items-center text-blueGray-400 text-lg mt-3 mb-6 font-light capitalize">
        Change property
      </h6>
    </div>
    <div className="flex flex-row-reverse items-center">
      <div className="flex-initial pl-3">
        <button
          type="button"
          className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path
              d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
              opacity=".3"
            ></path>
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
          </svg>
          <span className="pl-2 mx-1">Save</span>
        </button>
      </div>
      <div className="flex-initial">
        <button
          type="button"
          className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M8 9h8v10H8z" opacity=".3"></path>
            <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
          </svg>
          <span className="pl-2 mx-1">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

Forms.OpenView = ({
  id,
  property_name,
  property_address,
  purchased_property_value,
  current_property_value,
  price_per_share,
  total_property_shares,
  income,
  expenses,
  initial_profits,
  final_profits,
  url,
  users,
  handleRecordChange,
}) => {
  console.log(property_name);
  const [property, setProperty] = useState({
    id: "",
    propertyName: property_name,
    propertyAddress: property_address,
    description: "",
    rentalStatus: "",
    monthlyRent: "",
    rentalRevenue: "",
    zip: "",
    state: "",
    city: "",
    dividend: "",
    purchasedValue: purchased_property_value,
    currentValue: current_property_value,
    pricepPerShare: price_per_share,
    totalShares: total_property_shares,
    income: income,
    expenses: expenses,
    maxShares: "",
    initial_profits: initial_profits,
    final_profits: final_profits,
    url: url,
    users: users,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(property_name);
    setProperty({
      id: "",
      propertyName: property_name,
      propertyAddress: property_address,
      description: "",
      rentalStatus: "",
      monthlyRent: "",
      rentalRevenue: "",
      zip: "",
      state: "",
      city: "",
      dividend: "",
      purchasedValue: purchased_property_value,
      currentValue: current_property_value,
      pricepPerShare: price_per_share,
      totalShares: total_property_shares,
      income: income,
      expenses: expenses,
      maxShares: "",
      initial_profits: initial_profits,
      final_profits: final_profits,
      url: url,
      users: users,
    });
  }, [property_name]);

  const data = [
    {
      propertyOverview: [
        {
          id: 1,
          title: "Name",
          value: property.propertyName,
          name: "propertyName",
        },
        {
          id: 2,
          title: "Description",
          value: property.description,
          name: "description",
        },
        {
          id: 3,
          title: "rental status",
          value: property.rentalStatus,
          name: "rentalStatus",
        },
        {
          id: 4,
          title: "monthly rent",
          value: property.monthlyRent,
          name: "monthlyRent",
        },
        {
          id: 5,
          title: "rental revenue",
          value: property.rentalRevenue,
          name: "rentalRevenue",
        },
        {
          id: 6,
          title: "current property value",
          value: property.currentValue,
          name: "currentValue",
        },
      ],
    },
    {
      propertyAddress: [
        {
          id: 7,
          title: "Address",
          value: property.propertyAddress,
          name: "propertyAddress",
        },
      ],
    },
    {
      propertyLocation: [
        {
          id: 8,
          title: "City",
          value: property.city,
          name: "city",
        },
        {
          id: 9,
          title: "State",
          value: property.state,
          name: "state",
        },
        {
          id: 10,
          title: "Zip",
          value: property.zip,
          name: "zip",
        },
      ],
    },
    {
      propertyMetrics: [
        {
          id: 9,
          title: "Total Property Shares",
          value: property.totalShares,
          name: "totalShares",
        },
        {
          id: 10,
          title: "Price per share",
          value: property.pricepPerShare,
          name: "pricepPerShare",
        },
        {
          id: 11,
          title: "Max purchase shares",
          value: property.maxShares,
          name: "maxShares",
        },
        {
          id: 12,
          title: "Dividend Income",
          value: property.dividend,
          name: "dividend",
        },
      ],
    },
  ];

  return (
    <section className="w-full py-1 bg-blueGray-50">
      <div className="flex-auto w-full px-4 lg:px-10 py-10 pt-0">
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Overview
        </h6>
        <PropertyData
          data={data}
          size={2}
          dataType={"propertyOverview"}
          handleChange={handleChange}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Location
        </h6>
        <PropertyData
          data={data}
          size={1}
          dataType={"propertyAddress"}
          handleChange={handleChange}
        />
        <PropertyData
          data={data}
          size={3}
          dataType={"propertyLocation"}
          handleChange={handleChange}
        />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Property Metrics
        </h6>
        <PropertyData
          data={data}
          size={2}
          dataType={"propertyMetrics"}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

const PropertyData = ({ data, size, dataType, handleChange }) => {
  const ListItems = [];
  let index = 0;
  const updatedData = data.flatMap((item) => item[dataType] || []);

  while (index < updatedData.length) {
    const listItems = updatedData.slice(index, index + size).map((item, i) => (
      <div key={item.id} className="w-full  px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            {item.title}
          </label>
          <input
            type="text"
            name={item.name}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            value={item.value}
            onChange={handleChange}
          />
        </div>
      </div>
    ));

    ListItems.push(
      <div key={index} className="flex flex-grow">
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
};

export default Forms;
