import React from "react";
import iconEmailWhite from "~assets/icons/icon-email-white.png";
import iconEmail from "~assets/icons/icon-email.png";
import iconGithubWhite from "~assets/icons/icon-github-white.png";
import iconGithub from "~assets/icons/icon-github.png";
import iconLinkedInWhite from "~assets/icons/icon-linkedin-white.png";
import iconLinkedIn from "~assets/icons/icon-linkedin.png";
import iconResumeWhite from "~assets/icons/icon-resume-white.png";
import iconResume from "~assets/icons/icon-resume.png";
import Div from "~components/Div";

const ContactComponent = ({ className, isWhite, hideResume }) => {
  return (
    <Div row justify align {...{ className }}>
      <a
        className='cursor-pointer transform transition-all duration-500 hover:scale-125 hover:opacity-70'
        target='_blank'
        rel='noreferrer'
        href='/#'>
        <img
          src={isWhite ? iconGithubWhite : iconGithub}
          className='w-4'
          alt=''
        />
      </a>
      <a
        className='ml-6 cursor-pointer transform transition-all duration-500 hover:scale-125 hover:opacity-70'
        target='_blank'
        rel='noreferrer'
        href='/#'>
        <img
          src={isWhite ? iconLinkedInWhite : iconLinkedIn}
          className='w-4'
          alt=''
        />
      </a>
      <a
        className='ml-6 cursor-pointer transform transition-all duration-500 hover:scale-125 hover:opacity-70'
        target='_blank'
        rel='noreferrer'
        href='mailto:nqviet.dev@gmail.com'>
        <img
          src={isWhite ? iconEmailWhite : iconEmail}
          className='w-4'
          alt=''
        />
      </a>
      {!hideResume && (
        <a
          className='ml-6 cursor-pointer transform transition-all duration-500 hover:scale-125 hover:opacity-70'
          target='_blank'
          rel='noreferrer'
          href='/#'>
          <img
            src={isWhite ? iconResumeWhite : iconResume}
            className='w-4'
            alt=''
          />
        </a>
      )}
    </Div>
  );
};

export default ContactComponent;
