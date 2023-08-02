import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

interface cloudifyTypes {
  imgTitle: string;
  imgWidth?: number;
  imgFormat?: string;
  // hasLoaded? : React.Dispatch<React.SetStateAction<boolean>>
  hasLoaded?: any
}

const Cloudify = ({ ...props }: cloudifyTypes) => {
  // Create a Cloudinary instance and set your cloud name.
  const cld: Cloudinary = new Cloudinary({
    cloud: {
      cloudName: "retratos-de-mascotas",
    },
    url: {
      secure: true,
      analytics: false
    },
  });
  
  const myImage: CloudinaryImage = cld.image(props.imgTitle);

  //settings to request an image
  myImage
    .format(`${props.imgFormat ? props.imgFormat : "auto"}`)
    .quality(100)
  if (props.imgWidth) {
      myImage.resize(scale().width(props.imgWidth))
  }
  
   const loaded = () => {
     if (props.hasLoaded) {
       props.hasLoaded();
     }
   };
  const plugins = props.imgWidth?[]: [responsive({ steps: 100 })]
 
  return (
    <AdvancedImage
      onLoad={loaded}
      plugins={
        plugins
        // [
        // // lazyload(),
        // // responsive({ steps: 100 }),
        // //  placeholder({ mode: "vectorize" })
        // ]
      }
      style={{ maxWidth: "100%" }}
      cldImg={myImage}
    />
  );
};

export default Cloudify;
