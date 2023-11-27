import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../sanity";
import SanityService from "../services/sanityService";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Breadcrumb from "../utils/Breadcrumb";
import PDFViewer from "../utils/PDFViewer";
import { PortableText } from "@portabletext/react";
import { components } from "../utils/PortableTextOptions";
import { BiLinkExternal } from "react-icons/bi";
import "../styles/portfolio.css";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const PortfolioDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [project, setProject] = useState();
  const [lightbox, setLightbox] = useState({
    open: false,
    currentIndex: 0,
  });
  // Array for the lightbox images.
  const lightboxItems = [
    project?.image?.map((item) => ({
      src: urlFor(item.asset._ref),
    })),
  ];

  /* GET PORTFOLIO DATA BY SLUG FROM SANITY SERVICE */
  /* SLUG = ID */
  const getPortfolioData = (slug) => {
    SanityService.getDataBySlug("portfolio", slug)
      .then((response) => {
        setProject(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPortfolioData(slug);
  }, []);

  // PDF file settings for projects
  const [_file, id, extension] =
    project !== undefined && project?.file !== undefined
      ? project?.file.asset._ref.split("-")
      : "";

  return (
    <div className="mt-10 break-words container2 mx-auto mb-32 justify-center items-center relative">
      <div className="justify-center items-center mt-10 max-w-4xl mx-auto container2">
        <Breadcrumb name={project?.title} location="Portfolio" />
        <div className=" mt-12">
          <div>
            <h5 className="portfolio__title font-medium mb-5">
              {project?.title}
            </h5>
            <p className="portfolio__desc">{project?.description}</p>
            {project?.link !== undefined ? (
              <a
                href={project?.link}
                target="_blank"
                className="inline-block project-details-button"
              >
                <button className="flex items-center gap-2 mt-4 mb-4 font-semibold py-2 px-4 rounded-lg max-h-[40px] transition-all ease-in duration-300">
                  <BiLinkExternal /> Details
                </button>
              </a>
            ) : (
              ""
            )}
            <br />
            <div>
              {/* With the @portabletext/react package, we print the description data from Sanity to the screen more regularly. */}
              <PortableText value={project?.more} components={components} />
            </div>
            {project?.file !== undefined ? (
              <div className="mt-5">
                {/* Show the pdf from sanity.io on the screen */}
                <PDFViewer
                  pdf={`https://cdn.sanity.io/files/jfpjgj3u/production/${id}.${extension}`}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="porfoliopage">
            {/* carousel with swiper pack */}
            <Swiper
              spaceBetween={50}
              autoHeight
              pagination={{
                clickable: true,
              }}
              loop="true"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
              }}
              modules={[Pagination]}
              className="portfolio__container mySwiper mt-6 mb-10"
            >
              {project?.image?.map((item, i) => (
                <SwiperSlide
                  className="portfolio__item cursor-pointer"
                  key={i}
                  onClick={() =>
                    setLightbox({
                      currentIndex: i,
                      open: true,
                    })
                  }
                >
                  <img
                    src={urlFor(item.asset._ref)}
                    alt=""
                    className="mx-auto w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Opening full screen when clicking on images with the Lightbox package */}
          <Lightbox
            open={lightbox.open}
            close={() => setLightbox({ open: false, currentIndex: 0 })}
            slides={lightboxItems[0]}
            thumbnails={{ border: 0 }}
            plugins={[Zoom, Counter]}
            index={lightbox.currentIndex}
            className="z-[10000]"
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
