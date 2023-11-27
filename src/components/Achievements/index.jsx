import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { AnimatePresence } from "framer-motion";
import Items from "./Items";
import { styles } from "../../styles/styles";
import "./achievements.css";

const Achievements = ({ achievements }) => {
  return achievements?.length !== 0 ? (
    <section
      className="software section pt-[200px] container2"
      id="achievements"
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="1500"
    >
      <div className="text-center">
        <p className={`${styles.sectionSubText} second-font text-center`}>
          Achievement
        </p>
        <h2 className={`${styles.sectionHeadText} section-title`}>
          <span className="text-[#915EFF]">My</span> Certifications & Licenses
        </h2>
      </div>
      <div className="achievements">
        <Swiper
          spaceBetween={70}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            540: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          className="container mySwiper py-8"
        >
          {achievements?.map((achievement) => (
            <SwiperSlide
              className="card card-one"
              key={achievement?._id}
              style={{ minHeight: "520px" }}
            >
              <AnimatePresence>
                <Items achievement={achievement} />
              </AnimatePresence>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  ) : (
    ""
  );
};

export default Achievements;
