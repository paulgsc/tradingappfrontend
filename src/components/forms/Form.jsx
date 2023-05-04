import React from "react";

function Form({ ...props }) {
  return <form {...props} />;
}

Form.Input = ({ ...props }) => <input {...props} />;

Form.Label = ({ ...props }) => <label {...props} />;

Form.Button = ({ ...props }) => <button {...props} />;

Form.Footer = ({ ...props }) => <p {...props} />;

export default Form;
