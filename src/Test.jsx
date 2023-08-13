import React from "react";
import API from "./api/django";
import "./test.css";

function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center space-x-4">
      <svg width="100%" height="40%" viewBox="0 0 400 80">
        <rect x="0" y="0" width="100%" height="80" fill="lightgray" />

        <path
          d="M0 0 Q200 -40 400 0 L400 40 L0 40 Z"
          fill="none"
          stroke="black"
        />
      </svg>
    </div>
  );
}

const foo = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await API.post(
      "admin/google-api/sheets/create-pickle/",
      config
    );
    console.log(response);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default Test;
