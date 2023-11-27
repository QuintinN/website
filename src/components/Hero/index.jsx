import React from "react";
import "./hero.css";
import Social from "./Social";
import ScrollDown from "./ScrollDown";
import { BiMessageDetail } from "react-icons/bi";
import { RiApps2Line } from "react-icons/ri";

const Hero = ({ hero, socials, theme }) => {
  return (
    <section
      className="home section flex overflow-hidden h-[calc(100vh-92px)] max-[768px]:-mt-5"
      id="home"
    >
      <div className="home__container container2 grid">
        <div className="home__content grid">
          <Social socials={socials} />
          <div
            className="home__img"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="1500"
          ></div>
          <div className="home__data">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1500"
            >
              <h2 className="text-5xl font-semibold mb-2 max-sm:text-3xl">
                {hero?.title}
              </h2>
            </div>

            {/* <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1800"
              className="flex items-center button-wrapper gap-6 mt-7"
            >
              <a href="#contact">
                <button className="contact-btn font-medium flex items-center gap-2 ease-in duration-300 py-2 px-4 rounded-lg">
                  <BiMessageDetail />
                  <span className="relative bottom-[1px]">Let's Talk</span>
                </button>
              </a>

              <a
                href="#works"
                className="font-semibold text-[16px] border-b border-solid border-current"
              >
                See portfolio
              </a>
            </div> */}
            {hero?.subTitle !== undefined ? (
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1400"
                className="flex gap-2 mt-6 font-medium max-md:hidden text-[15px] max-sm:text-[14px] leading-7 sm:pl-4 sm:pr-6"
              >
                <span className="flex gap-2">
                  <RiApps2Line size={18} />
                  <span className="flex-1 -mt-1">{hero?.subTitle}</span>
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <ScrollDown /> */}
      </div>
    </section>
  );
};

export default Hero;
