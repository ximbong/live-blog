const importAll = r => {
  //use to implement dynamic import
  let images = {};

  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });

  return images;
};

export default importAll;
