import React, { useEffect, useState } from "react";
import "./portfolio.css";
import List from "./List";
import Items from "./Items";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { styles } from "../../styles/styles";

const Portfolio = ({ projects, catList }) => {
  const [projectItems, setProjectItems] = useState();

  // When the projects are loaded, we add the projects to setProjectItems
  useEffect(() => {
    setProjectItems(projects);
  }, [projects]);

  // This function works when you click on the categories in the Portfolio section. We filter portfolio items by category
  const filterItems = (category) => {
    if (category == "all") return setProjectItems(projects);

    const newProjectItems = projects?.filter(
      (item) => item.category[0].title === category
    );

    setProjectItems(newProjectItems);
  };

  return projects?.length !== 0 ? (
    <section className="portfolio section container2" id="works">
      {/* Animation with framer-motion package */}
      <div className="text-center">
        <p className={`${styles.sectionSubText} second-font text-center`}>
          Portfolio
        </p>
        <h2 className={`${styles.sectionHeadText} section-title`}>
          <span className="text-[#915EFF]">My</span> Works
        </h2>
      </div>
      <div className="max-sm:px-4 mb-10 ">
        <Link
          to="/portfolio"
          className="btn text-cs all-portfolio mx-auto w-52 max-sm:w-full mt-4"
        >
          All Works
          <AiOutlineFundProjectionScreen className="button__icon"></AiOutlineFundProjectionScreen>
        </Link>
      </div>
      <List catList={catList} filterItems={filterItems} />
      <div className="container grid grid-cols-3 max-xl:grid-cols-2 max-[860px]:grid-cols-1 gap-7">
        <AnimatePresence>
          <Items projectItems={projectItems} />
        </AnimatePresence>
      </div>
    </section>
  ) : (
    ""
  );
};

export default Portfolio;
