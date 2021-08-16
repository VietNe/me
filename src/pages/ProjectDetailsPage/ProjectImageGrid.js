import map from "lodash/map";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Div } from "~components";

const ProjectImageGrid = ({ canSelect, gridItemSelected, images }) => {
  return (
    <Div row className={` flex-wrap mx-6 lg:mx-20`}>
      <div className='font-bold mb-5 ml-3'>Images: </div>
      <div className='w-full'>
        {images && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2 }}>
            <Masonry gutter='10px'>
              {map(images, (projectImage, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      canSelect && "hover:opacity-80 cursor-pointer"
                    } border-2 border-pw-grey transition-opacity duration-200`}
                    onClick={() => gridItemSelected(index)}>
                    <img
                      key={index}
                      src={projectImage.link}
                      style={{ width: "100%", display: "block" }}
                      alt={projectImage.alt}
                    />
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </Div>
  );
};

export default ProjectImageGrid;
