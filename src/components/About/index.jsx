import React from "react";
import "./about.css";
import sanityClient from "../../../sanity";
import imageUrlBuilder from "@sanity/image-url";
import { HiDocumentDownload } from "react-icons/hi";
import { motion } from "framer-motion";
import { styles } from "../../styles/styles";
import { PortableText } from "@portabletext/react";
import { components } from "../../utils/PortableTextOptions";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const About = ({ about }) => {
  const [_file, id, extension] =
    about !== undefined && about?.file !== undefined
      ? about?.file.asset._ref.split("-")
      : "";

  return (
    <div className="container mx-auto mt-32" id="about">
      {/* Animation with framer-motion package */}
      <motion.div className="text-center">
        <p className={`${styles.sectionSubText} second-font text-center`}>
          About
        </p>
      </motion.div>

      <div className="flex flex-row-reverse max-lg:flex-col-reverse mt-5 max-lg:items-center gap-10 justify-center">
        <div>
          <h3 className="mb-5 mt-3 max-sm:mt-0 text-[18px] font-bold">
            {about?.job}
          </h3>
          {about?.description !== undefined ? (
            <div className="mt-4 max-w-xl leading-[30px]">
              {/* With the @portabletext/react package, we print the description data from Sanity to the screen more regularly. */}
              <PortableText
                value={about?.description}
                components={components}
              />
            </div>
          ) : (
            ""
          )}
          {about?.file !== undefined ? (
            <motion.a
              download
              href={`https://cdn.sanity.io/files/jfpjgj3u/production/${id}.${extension}`}
              target="_blank"
              className="about__btn flex items-center gap-1 max-lg:mx-auto w-fit transition-all ease-in duration-200 mt-4 text-white rounded-lg p-4"
            >
              Download Resume
              <HiDocumentDownload size={20} />
            </motion.a>
          ) : (
            ""
          )}
        </div>
        {about?.image !== undefined ? (
          <div className="relative mt-4 sm:w-[500px] w-full">
            <img
              src={urlFor(about?.image.asset._ref)}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default About;
