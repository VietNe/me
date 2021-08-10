import React, { useState } from "react";
import { Div } from "~components";
import map from "lodash/map";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ProjectImageGrid = ({ projectId, canSelect, gridItemSelected }) => {
  const images = [
    "https://picsum.photos/200/300?image=1050",
    "https://picsum.photos/400/400?image=1039",
    "https://picsum.photos/400/400?image=1080",
    "https://picsum.photos/200/200?image=997",
    "https://picsum.photos/500/400?image=287",
    "https://picsum.photos/400/500?image=955",
    "https://picsum.photos/200/300?image=916",
    "https://picsum.photos/300/300?image=110",
    "https://picsum.photos/300/300?image=206",
  ];

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
                      canSelect && "hover:opacity-80cursor-pointer"
                    }  transition-opacity duration-200`}
                    onClick={() => gridItemSelected(index)}>
                    <img
                      key={index}
                      src={projectImage}
                      style={{ width: "100%", display: "block" }}
                      alt=''
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
