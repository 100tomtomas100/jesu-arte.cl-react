import { useEffect} from "react";
import axios from "axios";
import { useBlogStore } from "./useStore";

const useBlog = () => {

  //store
  const postsToLoad = useBlogStore((state) => state.postsToLoad)
  const setPostData = useBlogStore((state) => state.setPostData)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/blogger/v3/blogs/${process.env.REACT_APP_BLOGGER_BLOG_ID}/posts?maxResults=${postsToLoad}&key=${process.env.REACT_APP_BLOGGER_API_KEY}`
        );
        setPostData(response.data)
      } catch (er) {
        console.log(er);
      }
    })();
  }, [postsToLoad]);
};

export default useBlog;
