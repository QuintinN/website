import React, { useState } from "react";
import "./resume.css";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceEducationCard from "./ExperienceEducationCard";
import { styles } from "../../styles/styles";

const Resume = ({ resumes, theme }) => {
  const [toggle, setToggle] = useState(1);

  const toggleTab = (index) => {
    setToggle(index);
  };

  // If the resumes array is empty, we do not render this component.
  return resumes?.length !== 0 ? (
    <div id="resume" className="qualification section container2 mx-auto mt-32">
      <div className="text-center">
        <p
          className={`${styles.sectionSubText} second-font`}
          style={{ textAlign: "center" }}
        >
          Resume
        </p>
        <h2 className={`${styles.sectionHeadText} section-title`}>
          <span className="text-[#915EFF]">My</span> Story
        </h2>
      </div>
      <div
        className="qualification__container container mt-12"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="qualification__tabs">
          {/* Education or Experience buttons */}
          <div
            onClick={() => toggleTab(1)}
            className={
              toggle === 1
                ? "qualification__button button--flex qualification__active active-resume resume__list-item"
                : "qualification__button button--flex resume__list-item"
            }
          >
            <i className="ri-briefcase-line qualification__icon"></i>
            <span className=" max-sm:text-base">Experience</span>
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={
              toggle === 2
                ? "qualification__button button--flex qualification__active active-resume resume__list-item"
                : "qualification__button button--flex resume__list-item "
            }
          >
            <i className="ri-graduation-cap-line qualification__icon"></i>
            <span className=" max-sm:text-base">Education</span>
          </div>
        </div>

        {/* toggle===1 -> experience */}
        {toggle === 1 ? (
          <div className="mt-20 flex flex-col overflow-hidden">
            {resumes && (
              // RESUME component with VerticalTimeline package
              <VerticalTimeline
                lineColor={theme === "dark-theme" ? "#815ad53a" : "#cfc6ba"}
              >
                {resumes?.map((experience, index) => {
                  if (experience.category === "experience") {
                    return (
                      <ExperienceEducationCard
                        key={`experience-${index}`}
                        data={experience}
                      />
                    );
                  }
                })}
              </VerticalTimeline>
            )}
          </div>
        ) : (
          <div className="mt-20 flex flex-col overflow-hidden">
            {resumes && (
              // RESUME component with VerticalTimeline package
              <VerticalTimeline
                lineColor={theme === "dark-theme" ? "#815ad53a" : "#cfc6ba"}
              >
                {resumes?.map((education, index) => {
                  if (education.category === "education") {
                    return (
                      <ExperienceEducationCard
                        key={`educations-${index}`}
                        data={education}
                      />
                    );
                  }
                })}
              </VerticalTimeline>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Resume;
