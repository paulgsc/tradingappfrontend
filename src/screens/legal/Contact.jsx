import React, { useState } from "react";
import Form from "../../components/forms/Form";
import Address from "./Address";
import Personal from "./Personal";

function Contact() {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  return (
    <div>
      {redirect.includes("contact/personal") || redirect === "contact" ? (
        <>
          {" "}
          <Personal />
        </>
      ) : (
        redirect.includes("contact/address") && (
          <>
            {" "}
            <Address />
          </>
        )
      )}
    </div>
  );
}

export default Contact;
