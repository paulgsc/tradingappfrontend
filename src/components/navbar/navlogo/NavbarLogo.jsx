import React from "react";
import { Link } from "react-router-dom";

function NavbarLogo() {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center text-center justify-start">
        <svg
          className="text-3xl w-[220px] text-left m-0 p-0 items-start flex"
          height="30"
          width="120"
          viewBox="0 0 125 20"
        >
          <text x="0" y="15" fontFamily="Arial" fill="#0080ff">
            LeafiProperties |
          </text>
        </svg>
        <svg
          className="text-lg h-[24px] text-left m-0 p-0 items-start flex"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0"
          y="0"
          viewBox="0.5 0.5250000357627869 47.10000228881836 46.97500228881836"
          style={{ enableBackground: "new 0 0 48 48" }}
          xmlSpace="preserve"
          height="49.17966652927871"
          width="49.31053311824369"
          id="icon-0"
        >
          <g fill="#010c80" data-fill-palette-color="accent">
            <path
              d="M2.6 19.7h1.6 39.6 1.6c0.8 0 1.6-0.5 1.9-1.3 0.3-0.8 0-1.6-0.7-2.1L25.2 0.9c-0.7-0.5-1.6-0.5-2.3 0L1.5 16.3c-0.7 0.5-1 1.4-0.7 2.1C1 19.2 1.8 19.7 2.6 19.7z"
              fill="#010c80"
              data-fill-palette-color="accent"
            ></path>
            <g fill="#010c80" data-fill-palette-color="accent">
              <path
                d="M22.2 31.6c0 0.6 0.3 1 0.9 1.3v-2.4C22.5 30.7 22.2 31.1 22.2 31.6z"
                fill="#010c80"
                data-fill-palette-color="accent"
              ></path>
              <path
                d="M25.4 36.8v2.6c0.7-0.2 1.1-0.7 1.1-1.3 0-0.3-0.1-0.5-0.2-0.7C26.1 37.2 25.8 37 25.4 36.8z"
                fill="#010c80"
                data-fill-palette-color="accent"
              ></path>
              <path
                d="M45.5 43.7h-1.8V24.2c0-0.7-0.6-1.3-1.4-1.3H5.6c-0.8 0-1.4 0.6-1.4 1.3v19.5H2.5c-1.1 0-2 0.9-2 1.9s0.9 1.9 2 1.9h3.7 35.7 3.7c1.1 0 2-0.9 2-1.9S46.6 43.7 45.5 43.7zM28.7 40.9c-0.8 0.8-1.9 1.3-3.3 1.4v1.5h-2.3v-1.5c-1.8-0.3-3.5-1.1-5-2.4l2-2.4c1.1 1 2.1 1.6 3 1.8v-3.1c-1.5-0.4-2.6-0.9-3.3-1.5-0.7-0.6-1.1-1.6-1.1-2.8 0-1.2 0.4-2.2 1.2-3 0.8-0.8 1.9-1.2 3.2-1.4v-1h2.3v1.1c1.4 0.2 2.9 0.8 4.3 1.7l-1.8 2.5c-0.9-0.6-1.7-1.1-2.5-1.3v3c1.6 0.4 2.7 0.9 3.4 1.6 0.7 0.7 1.1 1.6 1.1 2.8C29.9 39.2 29.5 40.1 28.7 40.9z"
                fill="#010c80"
                data-fill-palette-color="accent"
              ></path>
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
}

export default NavbarLogo;

const houseSvg = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0"
      y="0"
      viewBox="0.5 0.5250000357627869 47.10000228881836 46.97500228881836"
      style={{ enableBackground: "new 0 0 48 48" }}
      xmlSpace="preserve"
      height="49.17966652927871"
      width="49.31053311824369"
      className="icon-icon-0"
      id="icon-0"
    >
      <g fill="#010c80" data-fill-palette-color="accent">
        <path
          d="M2.6 19.7h1.6 39.6 1.6c0.8 0 1.6-0.5 1.9-1.3 0.3-0.8 0-1.6-0.7-2.1L25.2 0.9c-0.7-0.5-1.6-0.5-2.3 0L1.5 16.3c-0.7 0.5-1 1.4-0.7 2.1C1 19.2 1.8 19.7 2.6 19.7z"
          fill="#010c80"
          data-fill-palette-color="accent"
        ></path>
        <g fill="#010c80" data-fill-palette-color="accent">
          <path
            d="M22.2 31.6c0 0.6 0.3 1 0.9 1.3v-2.4C22.5 30.7 22.2 31.1 22.2 31.6z"
            fill="#010c80"
            data-fill-palette-color="accent"
          ></path>
          <path
            d="M25.4 36.8v2.6c0.7-0.2 1.1-0.7 1.1-1.3 0-0.3-0.1-0.5-0.2-0.7C26.1 37.2 25.8 37 25.4 36.8z"
            fill="#010c80"
            data-fill-palette-color="accent"
          ></path>
          <path
            d="M45.5 43.7h-1.8V24.2c0-0.7-0.6-1.3-1.4-1.3H5.6c-0.8 0-1.4 0.6-1.4 1.3v19.5H2.5c-1.1 0-2 0.9-2 1.9s0.9 1.9 2 1.9h3.7 35.7 3.7c1.1 0 2-0.9 2-1.9S46.6 43.7 45.5 43.7zM28.7 40.9c-0.8 0.8-1.9 1.3-3.3 1.4v1.5h-2.3v-1.5c-1.8-0.3-3.5-1.1-5-2.4l2-2.4c1.1 1 2.1 1.6 3 1.8v-3.1c-1.5-0.4-2.6-0.9-3.3-1.5-0.7-0.6-1.1-1.6-1.1-2.8 0-1.2 0.4-2.2 1.2-3 0.8-0.8 1.9-1.2 3.2-1.4v-1h2.3v1.1c1.4 0.2 2.9 0.8 4.3 1.7l-1.8 2.5c-0.9-0.6-1.7-1.1-2.5-1.3v3c1.6 0.4 2.7 0.9 3.4 1.6 0.7 0.7 1.1 1.6 1.1 2.8C29.9 39.2 29.5 40.1 28.7 40.9z"
            fill="#010c80"
            data-fill-palette-color="accent"
          ></path>
        </g>
      </g>
    </svg>
  </>
);
