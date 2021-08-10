import React from "react";
import map from "lodash/map";
import { Div } from "~components";
import { parseNewLine } from "~utils";

const getHighlight = (highlight) => {
  if (highlight) {
    if (highlight === "green") return "highlight_green";
    else if (highlight === "blue") return "highlight_blue";
  }

  return null;
};

const ProjectDescription = ({ project, className }) => {
  const { description, involvement, tech } = project;

  return (
    <Div align='stretch' className={`text-base text-pw-grey ${className}`}>
      <Div
        row
        justify='between'
        className='sub_info_container text-base font-medium text-pw-grey pb-5'>
        <Div>
          <div className='text-pw-grey-2'>Platform</div>
          <div className='capitalize'>{tech.join(" | ")}</div>
        </Div>
        <Div align='end'>
          <div className='text-pw-grey-2'>Project Involment</div>
          <div className='capitalize'>{involvement}</div>
        </Div>
      </Div>

      {map(description, (description, index) => {
        if (description.type === "text") {
          return (
            <div
              key={index}
              className={`p-3 ${getHighlight(description.highlight)}`}>
              {parseNewLine(description.value)}
            </div>
          );
        } else if (description.type === "points") {
          return (
            <Div
              key={index}
              className={`px-3 ${getHighlight(description.highlight)}`}>
              {description.title ? (
                <div className=' font-bold'>{description.title}</div>
              ) : null}
              <ul className='list-disc ml-10'>
                {map(description.value, (value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </Div>
          );
        } else if (description.type === "header") {
          return (
            <div key={index} className='mt-5 pl-3 text-lg font-bold'>
              {description.value}
            </div>
          );
        }
        return null;
      })}
    </Div>
  );
};

export default ProjectDescription;
