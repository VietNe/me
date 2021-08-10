import React from "react";
import ReactImageGallery from "react-image-gallery";

export default function ProjectViewPager({
  projectId,
  startIndex = 0,
  showFullscreenButton = true,
}) {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <ReactImageGallery
      items={images}
      startIndex={startIndex}
      showFullscreenButton={showFullscreenButton}
    />
  );
}
