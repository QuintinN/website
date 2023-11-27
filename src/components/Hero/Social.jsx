import React from "react";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Social = ({ socials }) => {
  return (
    <div
      className="home__social text-xl"
      data-aos="fade-right"
      data-aos-delay="100"
      data-aos-duration="1000"
    >
      {socials?.map(
        (social) =>
          social.link != "" && (
            <a
              href={social.link}
              key={social._id}
              target="_blank"
              className="hover:text-violet-500 transition-all ease-in duration-200"
            >
              {social.name === "instagram" && social.link !== undefined ? (
                <IoLogoInstagram />
              ) : social.name === "twitter" && social.link !== undefined ? (
                <FaXTwitter />
              ) : social.name === "linkedin" && social.link !== undefined ? (
                <IoLogoLinkedin />
              ) : social.name === "facebook" && social.link !== undefined ? (
                <IoLogoFacebook />
              ) : social.name === "github" && social.link !== undefined ? (
                <IoLogoGithub />
              ) : (
                ""
              )}
            </a>
          )
      )}
    </div>
  );
};

export default Social;
