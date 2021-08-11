import React from "react";
import Div from "~components/Div";

const ContactComponent = ({ className, isWhite, links }) => {
  return (
    <Div row justify align {...{ className }}>
      {links &&
        links.map((item, index) => (
          <a
            key={index}
            className={`cursor-pointer transform transition-all duration-500 hover:scale-125 hover:opacity-70 ${
              index === 0 ? "" : "ml-6"
            }`}
            target='_blank'
            rel='noreferrer'
            href={item?.link}>
            <img
              src={isWhite ? item?.icon_white : item?.icon}
              className='h-5'
              alt={item?.name || ""}
            />
          </a>
        ))}
    </Div>
  );
};

export default ContactComponent;
