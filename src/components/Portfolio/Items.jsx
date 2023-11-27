import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../sanity";
import { Truncate } from "../../utils/TruncateText";
import { useNavigate } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Items = ({ projectItems }) => {
  const navigate = useNavigate();

  return (
    <>
      {projectItems?.map((projectItem) => {
        return (
          <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0.8, scale: 0.6 }}
            exit={{ opacity: 0.8, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="portfolio__items card card-two pb-14"
            key={projectItem?._id}
          >
            <div className="portfolio__img-wrapper">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/portfolio/${projectItem?.slug.current}`);
                  window.scrollTo(0, 0);
                }}
                href={`/portfolio/${projectItem?.slug.current}`}
              >
                <img
                  src={urlFor(projectItem?.mainImage.asset._ref)}
                  alt=""
                  className="portfolio__img"
                />
              </a>
            </div>
            <span className="portfolio__category text-cs">
              {projectItem?.category[0].title}
            </span>
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate(`/portfolio/${projectItem?.slug.current}`);
                window.scrollTo(0, 0);
              }}
              href={`/portfolio/${projectItem?.slug.current}`}
              className="portfolio__title text-lg font-bold break-words"
            >
              {projectItem?.title && Truncate(projectItem?.title, 90)}
            </a>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p className="portfolio__description">
                {projectItem?.description &&
                  Truncate(projectItem?.description, 200)}
              </p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/portfolio/${projectItem?.slug.current}`);
                  window.scrollTo(0, 0);
                }}
                href={`/portfolio/${projectItem?.slug.current}`}
                className="link absolute bottom-4"
              >
                See Details
                <FaArrowRight className="link__icon"></FaArrowRight>
              </a>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default Items;
