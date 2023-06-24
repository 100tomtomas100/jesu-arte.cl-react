import useBlog from "../hooks/useBlog";
import parse from "html-react-parser";
import styles from "../assets/styles/Blog.module.scss";
import variables from "../assets/styles/variablesReact.module.scss";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useBlogStore } from "../hooks/useStore";
import AnimContext from "../context/AnimContext";
import useBlogAnim from "../hooks/useBlogAnim";
import { Link } from "react-router-dom";

export const Blog = () => {
  const [blogNum, setBlogNum] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const containerWrapperRef = useRef<HTMLDivElement | null>(null);
  const { footerTimeline } = useContext(AnimContext);

  //store
  const setPostsToLoad = useBlogStore((state) => state.setPostsToLoad);
  const blogData = useBlogStore((state) => state.postData);

  useBlog();

  const blogAnimProps = {
    containerWrapperRef: containerWrapperRef,
    postClass: `.${styles.post}`,
    loaded: loaded,
    setLoaded: setLoaded,
  };

  useBlogAnim({ ...blogAnimProps });

  useLayoutEffect(() => {
    if (blogData.items && blogData.items.length !== blogNum) {
      setLoaded(true);
      const handleEnter = () => {
        setPostsToLoad();
        setBlogNum(blogData.items?.length);
      };

      let ctx: gsap.Context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: `.${styles.container}`,
          start: "bottom bottom+=50px",
          onEnter: () => handleEnter(),
        });
      }, containerWrapperRef);

      //recalculate footer scrollTrigger start and finish
      footerTimeline?.scrollTrigger.refresh();

      return () => ctx.revert();
    }
  }, [blogData]);

  return (
    <div className={styles.containerWrapper} ref={containerWrapperRef}>
      <div className={styles.container}>
        {blogData.items?.map((item: { [key: string]: any }, i: number) => {
          const contentNewBGColor = item.content.replaceAll(
            "background-color: white",
            `background-color: ${variables.bgColor}`
          );
          const publishedDate = new Date(item.published);
          const titleString = item.title.replace(" ", "-");
          return (
            <div className={`${styles.post} ${styles.post}${i}`} key={item.id}>
              <div className={styles.title}>
                <div></div>
                <h1>{item.title}</h1>
                <div className={`${styles.date}`}>
                  <p>{`${publishedDate.getDate()}/`}</p>
                  <p>{`${publishedDate.getMonth()}/`}</p>
                  <p>{`${publishedDate.getFullYear()}`}</p>
                </div>
              </div>
              <div className={styles.content}>{parse(contentNewBGColor)}</div>
              <Link
                to={`/blog/${item.id}-${titleString}-${i}`}
                style={{ textDecoration: "none" }}
              >
                <button className={styles.continueRead}>
                  <h2> Continue reading</h2>
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
