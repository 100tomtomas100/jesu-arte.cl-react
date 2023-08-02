import Cloudify from "./Cloudify";

const preloadImgs = (
  preload: any,
  setLoadedImg: any,
  loadedImg: { [key: string]: number }
) => {



  //convert into object
  const newPreload = preload.reduce((accumulator: any, value: any) => {
    return { ...accumulator, ...value };
  }, {});

  //loaded img info
  let newLoadedImg = {}


  //load images
  const ImgToCloudinary = (title: string, width: number, imgNum: number) => {
    
    newLoadedImg = {
      ...newLoadedImg,
      [imgNum]: {
         ...newPreload[imgNum],
      }      
    }
  };

  (preload as []).map(imgInfo => {
    const imgNumberOnList = Object.keys(imgInfo)[0];
    ImgToCloudinary(
      imgInfo[imgNumberOnList]["title"],
      imgInfo[imgNumberOnList]["imgWidth"],
      Number(imgNumberOnList)
    );
  })

  //add loaded images to the list of loaded images
  setLoadedImg({
    ...loadedImg,
    ...newLoadedImg,
  });

};

export default preloadImgs;
