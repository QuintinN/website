import React from "react";

const ScrollDown = () => {
  return (
    <div className="home__scroll absolute bottom-10">
      <a href="#about" className="home__scroll-button btn--flex flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="1.5"
          className="home__scroll-mouse"
          clipRule="evenodd"
          viewBox="0 0 247 390"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            d="M123.359 79.775v72.843"
            className="wheel"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            d="M236.717 123.359C236.717 60.794 185.923 10 123.359 10 60.794 10 10 60.794 10 123.359v143.237c0 62.565 50.794 113.359 113.359 113.359 62.564 0 113.358-50.794 113.358-113.359V123.359z"
          ></path>
        </svg>
        <span className="flex items-center">
          <span className="home__scroll-name">Scroll Down</span>
          <i className="ri-arrow-down-line home__scroll-arrow"></i>
        </span>
      </a>
    </div>
  );
};

export default ScrollDown;
