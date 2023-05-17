import React from "react";
import { privacySection } from "../../constants/legal/legal";
import "./disclaimer.css";
import { useNavigate } from "react-router";

function Disclaimer() {
  const navigate = useNavigate();
  return (
    <div className="disclaimer__container">
      {privacySection.map((item) => (
        <div key={item.id} className="disclaimer__card">
          <p className="disclaimer__card-title">{item.title}</p>
          {item.content.map((item) => (
            <p
              className="disclaimer__card-content"
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                if (item.link) {
                  window.open(item.link);
                } else {
                  navigate(item.path);
                }
              }}
            >
              {item.title}
              {item.link && <i className="fas fa-external-link-alt fa-sm"></i>}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Disclaimer;
