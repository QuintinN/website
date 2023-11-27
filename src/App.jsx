import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer, Header } from "./components";
import { HomePage, PortfolioDetailPage, PortfolioPage } from "./pages";
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import SanityService from "./services/sanityService";
import ParticlesBg from './shared-components/ParticlesBg'

const getStorageTheme = () => {
  let theme = "dark-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const App = () => {
  const [theme, setTheme] = useState(getStorageTheme());

  const [hero, setHero] = useState();
  const [about, setAbout] = useState();
  const [achievements, setAchievements] = useState();
  const [projects, setProjects] = useState();
  const [catList, setCatList] = useState();
  const [resumes, setResumes] = useState();
  const [socials, setSocials] = useState();
  const [contact, setContact] = useState();

  /* GET HERO DATA FROM SANITY SERVICE */
  const getHero = () => {
    SanityService.getData("hero")
      .then((response) => {
        setHero(response[response.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET ABOUT DATA FROM SANITY SERVICE */
  const getAbout = () => {
    SanityService.getData("about")
      .then((response) => {
        setAbout(response[response.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET Achievements DATA FROM SANITY SERVICE */
  const getAchievements = () => {
    SanityService.getData("achievements")
      .then((response) => {
        setAchievements(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET PORTRFOLIO DATA FROM SANITY SERVICE */
  const getPortfolioData = () => {
    SanityService.getDataWithCategory("portfolio")
      .then((response) => {
        setProjects(response);
        // We put the portfolio categories into an array
        const allCatList = [
          "all",
          ...new Set(response?.map((project) => project.category[0].title)),
        ];
        setCatList(allCatList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET RESUMES DATA FROM SANITY SERVICE */
  const getResumes = () => {
    SanityService.getData("resume")
      .then((response) => {
        setResumes(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET FOOTER SOCIAL DATA FROM SANITY SERVICE */
  const getSocialLinks = () => {
    SanityService.getData("social")
      .then((response) => {
        setSocials(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET CONTACT DATA FROM SANITY SERVICE */
  const getContactData = () => {
    SanityService.getData("contact")
      .then((response) => {
        setContact(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // We init the Aos package for animations
    Aos.init();

    getHero();
    getAbout();
    getAchievements();
    getPortfolioData();
    getResumes();
    getSocialLinks();
    getContactData();
  }, []);

  const checkPortfolios = projects?.length === 0 ? false : true;
  const checkResumes = resumes?.length === 0 ? false : true;
  const checkAchievements = achievements?.length === 0 ? false : true;

  return (
    <div>
      <Header
        theme={theme}
        setTheme={setTheme}
        checkPortfolios={checkPortfolios}
        checkAchievements={checkAchievements}
        checkResumes={checkResumes}
      />
      <div className="relative z-0">
        <div className="hidden sm:block">
          <ParticlesBg />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                hero={hero}
                about={about}
                achievements={achievements}
                projects={projects}
                catList={catList}
                resumes={resumes}
                socials={socials}
                contact={contact}
                theme={theme}
              />
            }
          />
          <Route
            path="/portfolio"
            element={<PortfolioPage projects={projects} />}
          />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
        </Routes>
        <Footer socials={socials} />
      </div>
    </div>
  );
};

export default App;
