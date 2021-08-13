import React, { useState } from "react";
import ReactImageGallery from "react-image-gallery";

export default function ProjectViewPager({
  projectId,
  startIndex = 0,
  showFullscreenButton = true,
  images,
}) {
  const [showThumbnails, setShowThumbnails] = useState(!showFullscreenButton);
  let imageList = images.map((image) => ({
    ...images,
    original: image?.link,
    thumbnail: image?.link,
  }));

  if (!imageList) {
    return <div></div>;
  }

  return (
    <ReactImageGallery
      items={[...imageList, ...imageList]}
      startIndex={startIndex}
      showThumbnails={showThumbnails}
      lazyLoad={true}
      onScreenChange={() => setShowThumbnails(!showThumbnails)}
      showFullscreenButton={showFullscreenButton}
    />
  );
}
