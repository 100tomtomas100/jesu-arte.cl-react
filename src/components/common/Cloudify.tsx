import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
// import {fill} from "@cloudinary/url-gen/actions/resize";
// import styles from "./Cloudify.module.scss";

interface cloudifyProps {
  imgTitle: string;
  imgWidth: string;
}

const Cloudify = ({ ...props }: cloudifyProps) => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "retratos-de-mascotas",
    },
  });

  const myImage = cld.image(props.imgTitle);

  //settings to request an image
  myImage.format("auto").quality("auto:best");

  return (
      <AdvancedImage
        style={{ maxWidth: "100%" }}
        cldImg={myImage}
        plugins={[responsive(),
            //  placeholder({ mode: "vectorize" })
            ]}
      />    
  );
};

export default Cloudify;
