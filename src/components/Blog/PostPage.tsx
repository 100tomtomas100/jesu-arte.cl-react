import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBlogStore } from "../../hooks/useStore";
import axios from "axios";
import parse from "html-react-parser";
import styles from "../../assets/styles/PostPage.module.scss";
import AnimContext from "../../context/AnimContext";
import usePostPageAnim from "../../hooks/usePostPageAnim";

const PostPage = () => {
  const [postData, setPostData] = useState<{ [key: string]: any }>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const { footerTimeline } = useContext(AnimContext);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  //store
  const blogData = useBlogStore((state) => state.postData);

  const params = useParams();
  const blogId = params.blogId?.charAt(params.blogId.length - 1);

  const postPageAnimProps = {
    containerWrapperRef: containerWrapperRef,
    containerClass: `.${styles.container}`,
    loaded: loaded,
  };

  usePostPageAnim({ ...postPageAnimProps });

  useEffect(() => {
    if (!blogData.items && !postData.title) {
      const postId = params.blogId?.split("-")[0];
      (async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/blogger/v3/blogs/${process.env.REACT_APP_BLOGGER_BLOG_ID}/posts/${postId}?&key=${process.env.REACT_APP_BLOGGER_API_KEY}`
          );
          setPostData(response.data);
          setLoaded(true);
        } catch (err) {
          console.log(err);
        }
      })();
    } else if (!postData.title) {
      setPostData(blogData.items[`${blogId}`]);
      setLoaded(true);
    }

    if (postData.title) {
      footerTimeline?.scrollTrigger.refresh();
    }
    // footerTimeline?.scrollTrigger.refresh();
  }, [postData]);

  return (
    <div className={styles.containerWrapper} ref={containerWrapperRef}>
      <div className={styles.container}>
        {loaded ? (
          <>
            <div className={styles.title}>
              <h1>{postData.title}</h1>
              <div className={styles.date}>
                <p>{`${new Date(postData.published).getDate()}/`}</p>
                <p>{`${new Date(postData.published).getMonth()}/`}</p>
                <p>{`${new Date(postData.published).getFullYear()}`}</p>
              </div>
            </div>
            <div>{parse(`${postData.content}`)}</div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostPage;
