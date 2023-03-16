import getWindowHeight from "./getWindowHeight";

interface PropsTypes {
  clickedImgInfo: { [key: string]: string | number };
}

const getImgLargeGallerySize = (props: PropsTypes) => {
  if (props.clickedImgInfo) {
    let resultWidth;

    //get window dimensions
    const windowHeight = getWindowHeight() * 0.8;

    // get image dimensions
    const imgWidth: number = props.clickedImgInfo.width as number;
    const imgHeight: number = props.clickedImgInfo.height as number;

    // calculate new image width
    const heightRatioDiff = imgHeight / windowHeight;
    resultWidth = imgWidth / heightRatioDiff;

    return Math.floor(resultWidth as number);
  }
};

export default getImgLargeGallerySize;
