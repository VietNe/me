const projectImages = {
  Project1: require.context(
    `~assets/images/projectImages/snapteam`,
    false,
    /.*\.png$/
  ),
  Project2: require.context(
    `~assets/images/projectImages/pulse`,
    false,
    /.*\.png$/
  ),
  Project3: require.context(
    `~assets/images/projectImages/measure`,
    false,
    /.*\.png$/
  ),
  Project4: require.context(
    `~assets/images/projectImages/wakency`,
    false,
    /.*\.png$/
  ),
  benefactory: require.context(
    `~assets/images/projectImages/benefactory`,
    false,
    /.*\.png$/
  ),
  lighthouse: require.context(
    `~assets/images/projectImages/lighthouse`,
    false,
    /.*\.png$/
  ),
  nykaa: require.context(
    `~assets/images/projectImages/nykaa`,
    false,
    /.*\.png$/
  ),
  Project5: require.context(
    `~assets/images/projectImages/vc_music_player`,
    false,
    /.*\.png$/
  ),
};

export const getProjectImages = (id) => {
  if (!id) return [];

  const images = projectImages[id];
  const extractedImages = [];

  images?.keys().forEach((key, index) => {
    const image = images(key);
    // extracts filename with extension for id
    const id = key
      .substring(0, key.lastIndexOf("."))
      .substring(key.lastIndexOf("/") + 1);

    extractedImages.push({ image, id, index });
  });
  return extractedImages;
};
