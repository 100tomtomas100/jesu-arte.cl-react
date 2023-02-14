import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";

interface cloudifyTypes {
  imgTitle: string;
  imgWidth?: string;
  imgFormat?: string;
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
  
  return (
    <AdvancedImage
      
      plugins={[
        // lazyload(),
        responsive({ steps: 100 }),
        //  placeholder({ mode: "vectorize" })
      ]}
      style={{ maxWidth: "100%" }}
      cldImg={myImage}
    />
  );
};

export default Cloudify;
