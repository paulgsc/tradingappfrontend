import React, { useState } from "react";
import Form from "../../components/forms/Form";
import { useLocation, useNavigate } from "react-router";

function Personal() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [activePath, setActivePath] = useState(redirect);

  const handleNavs = (e) => {
    e.preventDefault();
    const path = "contact/address";
    const fullPath = location.pathname;
    navigate(`${fullPath}?redirect=${path}`);
    setActivePath(path);
  };

  return (
    <div>
      <Form>
        <Form.Input placeholder="First Name" />
        <Form.Input placeholder="Last Name" />
        <Form.Input placeholder="Phone Number" />
        <Form.Input placeholder="Email" />
      </Form>
      <button
        className={"contact/personal" === activePath ? "active" : ""}
        onClick={handleNavs}
      >
        next
      </button>
    </div>
  );
}

export default Personal;
