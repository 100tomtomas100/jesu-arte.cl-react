import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive } from "@cloudinary/react";
// import {fill} from "@cloudinary/url-gen/actions/resize";
// import styles from "./Cloudify.module.scss";

interface cloudifyProps {
  imgTitle: string;
  imgWidth?: string;
  imgFormat?: string;
}

const Cloudify = ({ ...props }: cloudifyProps) => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "retratos-de-mascotas",
    },
    url: {
      secure: true,
    },
  });

  const myImage = cld.image(props.imgTitle);

  //settings to request an image
  myImage
    .format(`${props.imgFormat ? props.imgFormat : "auto"}`)
    .quality("100");
  //   console.log(myImage.toURL())
  return (
    <AdvancedImage
      style={{ maxWidth: "100%" }}
      cldImg={myImage}
      plugins={[
        responsive({ steps: 100 }),
        //  placeholder({ mode: "vectorize" })
      ]}
    />
  );
};

export default Cloudify;
