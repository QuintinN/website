import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";

// Information displayed when the card on the contact page is turned upside down
const ContactInfo = ({ contact }) => {
  return (
    <>
      {contact?.address !== undefined ? (
        <div className="mt-10">
          <div className="flex gap-2 items-center">
            <BiHomeAlt className="text-xl" />
            <p className="font-medium">Address</p>
          </div>
          <h4 className="mt-4">{contact?.address}</h4>
        </div>
      ) : (
        ""
      )}
      {contact?.email !== undefined ? (
        <div className="mt-10">
          <div className="flex gap-2 items-center">
            <HiOutlineMail className="text-xl" />
            <p className="font-medium">Email</p>
          </div>
          <a
            className="mt-4 inline-block underline"
            href={`mailto:${contact?.email}`}
          >
            {contact?.email}
          </a>
        </div>
      ) : (
        ""
      )}
      {contact?.phone !== undefined ? (
        <div className="mt-10">
          <div className="flex gap-2 items-center">
            <AiOutlinePhone className="text-xl" />
            <p className="font-medium">Phone</p>
          </div>
          <h4 className="mt-4">{contact?.phone}</h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ContactInfo;
