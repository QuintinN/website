import React, { useEffect, useState } from "react";
import "./header.css";
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { links } from "../../constant/headerLinks";
import Logo from "../../assets/logo.png";
import LogoWhite from "../../assets/logo-white.png";

const Header = ({
  socials,
  checkPortfolios,
  checkResumes,
  checkSkills,
  checkServices,
  checkAchievements,
  theme,
  setTheme,
}) => {
  const [show, setShow] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);

  const location = useLocation();

  const scrollTop = () => {
    animateScroll.scrollToTop();
    setShow(false);
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", show);
  }, [show]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className={`${scrollNav ? "scroll-header" : ""} header`}>
      <nav className="nav py-7 px-7 max-sm:px-4">
        {location.pathname === "/" ? (
          <Link
            to="/"
            onClick={scrollTop}
            className="nav__logo text-cs uppercase w-16 h-16 flex items-center"
          >
            {theme === "dark-theme" ? (
              <img
                src={LogoWhite}
                alt=""
                className="w-full h-full -mr-[12px]"
              />
            ) : (
              <img src={Logo} alt="" className="w-full h-full -mr-[10px]" />
            )}
            uintin
          </Link>
        ) : (
          <RouterLink
            to="/"
            className="nav__logo text-cs uppercase w-16 h-16 flex items-center"
            onClick={scrollTop}
          >
            {theme === "dark-theme" ? (
              <img
                src={LogoWhite}
                alt=""
                className="w-full h-full -mr-[12px]"
              />
            ) : (
              <img src={Logo} alt="" className="w-full h-full -mr-[10px]" />
            )}{" "}
            uintin
          </RouterLink>
        )}
        <div className={`${show ? "nav__menu show-menu" : "nav__menu"}`}>
          <div className="nav__data">
            <ul className="nav__list">
              {location.pathname === "/" ? (
                <>
                  {links
                    .filter(
                      (link) =>
                        (link.name === "Skills" && checkSkills) ||
                        (link.name === "Works" && checkPortfolios) ||
                        (link.name === "Resume" && checkResumes) ||
                        (link.name === "Services" && checkServices) ||
                        (link.name === "Achievements" && checkAchievements) ||
                        link.name === "Home" ||
                        link.name === "About" ||
                        link.name === "Contact"
                    )
                    .map((link, i) => (
                      <span key={i}>
                        <li className="nav__item">
                          <Link
                            className="nav__link text-cs"
                            to={link.path}
                            spy={true}
                            hashSpy={true}
                            smooth={true}
                            offset={-120}
                            duration={500}
                            onClick={() => setShow(!show)}
                          >
                            {link.name}
                          </Link>
                        </li>
                      </span>
                    ))}
                </>
              ) : (
                <>
                  {location.pathname !== "/" ? (
                    <li className="nav__item">
                      <RouterLink
                        to="/"
                        onClick={() => {
                          setShow(!show);
                          animateScroll.scrollToTop();
                        }}
                        className="nav__link text-cs"
                      >
                        Go Home
                      </RouterLink>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              )}
            </ul>

            <div className="header__socials">
              {socials?.map(
                (social) =>
                  social.link != "" && (
                    <a
                      href={social.link}
                      key={social._id}
                      target="_blank"
                      className="header__social-link"
                    >
                      {social.name === "instagram" &&
                      social.link !== undefined ? (
                        <IoLogoInstagram />
                      ) : social.name === "twitter" &&
                        social.link !== undefined ? (
                        <IoLogoTwitter />
                      ) : social.name === "linkedin" &&
                        social.link !== undefined ? (
                        <IoLogoLinkedin />
                      ) : social.name === "facebook" &&
                        social.link !== undefined ? (
                        <IoLogoFacebook />
                      ) : social.name === "github" &&
                        social.link !== undefined ? (
                        <IoLogoGithub />
                      ) : (
                        ""
                      )}
                    </a>
                  )
              )}
            </div>
          </div>

          <div className="section__deco deco__left header__deco"></div>
        </div>

        <div className="nav__btns">
          <div
            className={
              !scrollNav && theme === "light-theme" && location.pathname !== "/"
                ? "theme__toggle color"
                : "theme__toggle"
            }
            onClick={toggleTheme}
          >
            {theme === "light-theme" ? (
              <BsMoon color="#000" />
            ) : (
              <BsSun color="#fff" />
            )}
          </div>

          <div
            className={`${show ? "nav__toggle animate-toggle" : "nav__toggle"}
           ${
             !scrollNav && theme === "light-theme" && location.pathname !== "/"
               ? "colorBg"
               : ""
           }`}
            onClick={() => setShow(!show)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
