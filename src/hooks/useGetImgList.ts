import { useEffect, useState } from "react";
import axios from "axios";

interface listType {
  [key: string]: { [key: string]: string | number };
}

const useGetImgList = (): listType => {
  const [list, setList] = useState<listType>({});
    
  //get a list of images from cloudinary with gallery tag
  useEffect(() => {
    axios
      .get(
        "https://res.cloudinary.com/retratos-de-mascotas/image/list/gallery.json"
      )
      .then(function (response) {
        setList(response.data.resources);
      });
  }, []);

  return list;
};

export default useGetImgList;
