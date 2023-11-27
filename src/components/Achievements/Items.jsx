import React from "react";
import "../Portfolio/portfolio.css";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../sanity";
import { Truncate } from "../../utils/TruncateText";
import { FaArrowRight } from "react-icons/fa";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Items = ({ achievement }) => {
  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0.8, scale: 0.6 }}
        exit={{ opacity: 0.8, scale: 0.6 }}
        transition={{ duration: 0.4 }}
        key={achievement?._id}
      >
        <div className="portfolio__img-wrapper">
          {achievement?.image !== undefined ? (
            <img
              src={urlFor(achievement?.image.asset._ref)}
              alt=""
              className="portfolio__img"
            />
          ) : (
            ""
          )}
        </div>
        <h3 className="portfolio__title text-lg font-bold mt-4">
          {achievement?.title && Truncate(achievement?.title, 65)}
        </h3>
        <p className="mt-2">
          {achievement?.name && Truncate(achievement?.name, 50)}
        </p>
        {achievement?.link !== undefined ? (
          <a
            href={achievement?.link}
            target="_blank"
            className="link absolute bottom-5"
          >
            See Details
            <FaArrowRight className="link__icon"></FaArrowRight>
          </a>
        ) : (
          ""
        )}
      </motion.div>
    </>
  );
};

export default Items;
