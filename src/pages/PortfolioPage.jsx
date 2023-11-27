import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Items from "../components/Portfolio/Items";
import Breadcrumb from "../utils/Breadcrumb";

const PortfolioPage = ({ projects }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page.
  }, []);

  return (
    <div className="container2 mb-32">
      <Breadcrumb name="Portfolio" />
      <h4 className="mt-[50px] text-[22px] font-medium">Works</h4>
      <div className="container grid grid-cols-3 max-xl:grid-cols-2 max-[860px]:grid-cols-1 gap-6 mt-14">
        <AnimatePresence>
          {/* Items in the Porfolio page */}
          <Items projectItems={projects} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioPage;
