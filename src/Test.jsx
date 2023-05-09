import React, { useState, useRef } from "react";

function Test() {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
      <div className={flipped ? "flip-card hoverme" : "flip-card"}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src="img_avatar.png" alt="Avatar" />
          </div>
          <div className="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
      </div>
      <button className="test" onClick={handleClick}>
        click me
      </button>
    </div>
  );
}

export default Test;
