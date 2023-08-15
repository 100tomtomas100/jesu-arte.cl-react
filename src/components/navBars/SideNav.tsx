import styles from "../../assets/styles/SideNav.module.scss";
import useNavLinkInfo from "../../hooks/useNavLinkInfo";
import { Link } from "react-router-dom";
import useSideNavAnim from "../../hooks/useSideNavAnim";
import { useRef } from "react";
import { ScrollToPlugin, gsap } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin)

const SideNav = (): JSX.Element => {
  //store
  const navBarLinks: { [key: string]: { [key: string]: string } } =
    useNavLinkInfo("sideNav");
  const classes = {
    wrapper: styles.wrapper as string,
    nav: styles.sideNav as string,
    links: styles.navLinks as string,
  };
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useSideNavAnim({
    wrapper: wrapperRef,
    nav: classes.nav,
    links: classes.links,
  });

  return (
    <div className={`${classes.wrapper}`} ref={wrapperRef}>
      <nav className={classes.nav}>
        {Object.keys(navBarLinks).map((link: string) => {
          return (
            <Link key={link} to={navBarLinks[link].to}>
              <div className={classes.links}>
                <img
                  className={styles.images}
                  src={navBarLinks[link].src}
                  alt={navBarLinks[link].alt}
                />
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNav;
