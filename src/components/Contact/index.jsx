import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles/styles";
import ReactCardFlip from "react-card-flip";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import { FiRefreshCw } from "react-icons/fi";
import "./contact.css";

const ContactPage = ({ contact }) => {
  // Define state variables to manage contact data and the state of the card.
  const [flipped, setFlipped] = useState(false);
  // Function to flip the card.
  const handleFlip = (e) => {
    e.preventDefault();
    setFlipped(!flipped);
  };

  return (
    <div className={`xl:mt-12 overflow-hidden container2 mb-32`} id="contact">
      <div className="text-center">
        <p className={`${styles.sectionSubText} second-font text-center`}>
          Contact
        </p>
        <h2 className={`${styles.sectionHeadText} section-title`}>
          <span className="text-[#915EFF]">GET</span> IN TOUCH
        </h2>
      </div>
      <div className="flex xl:flex-row px-2 py-2 flex-col-reverse gap-10 mt-10">
        <motion.div
          className="flex-1 contact-card p-8 rounded-2xl"
          layout
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0.8, scale: 0.6 }}
          exit={{ opacity: 0.8, scale: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-end items-center -mb-10">
            <FiRefreshCw
              onClick={handleFlip}
              className="opacity-70 text-xl hover:rotate-180 transition-all duration-500 cursor-pointer"
            />
          </div>

          {/* Display the front or back of the card based on 'isFlipped'. */}
          <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
            <div>
              <ContactForm contact={contact} />
            </div>
            <div>
              <ContactInfo contact={contact} />
            </div>
          </ReactCardFlip>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
