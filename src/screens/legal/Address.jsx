import React, { useState } from "react";
import Form from "../../components/forms/Form";
import { useLocation, useNavigate } from "react-router";

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [activePath, setActivePath] = useState(redirect);

  const handleNavs = (e) => {
    e.preventDefault();
    const path = "legal";
    const fullPath = location.pathname;
    navigate(`${fullPath}?redirect=${path}`);
    setActivePath(path);
  };

  return (
    <div>
      <Form classsName="flex-col-container">
        <Form.Input
          placeholder="Street"
          className="bm-mg-container-1 margin-rt-lft-container-1"
        />
        <div className="flex-row-container bm-mg-container-1 ">
          {" "}
          <Form.Input
            placeholder="City"
            className="margin-rt-lft-container-1"
          />
          <Form.Input placeholder="State" />
          <Form.Input placeholder="Zip" className="left-margin-container-1" />
        </div>
        <div className="flex-row-container ">
          <Form.Input
            placeholder="County"
            className="margin-rt-lft-container-1"
          />
          <Form.Input placeholder="Country" />
        </div>
      </Form>
      <button
        className={"contact/address" === activePath ? "active" : ""}
        onClick={handleNavs}
      >
        next
      </button>
    </div>
  );
}

export default Address;
