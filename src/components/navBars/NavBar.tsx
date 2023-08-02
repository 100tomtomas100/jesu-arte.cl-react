import styles from "../../assets/styles/NavBar.module.scss";
import { Link } from "react-router-dom";
import useNavLinkInfo from "../../hooks/useNavLinkInfo";
import useTopNavAnim from "../../hooks/useTopNavAnim";
import { useRef } from "react";

const NavBar = (): JSX.Element => {
  const navBarLinks: { [key: string]: { [key: string]: string } } =
    useNavLinkInfo("topNav");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  
  useTopNavAnim({
    navLink: `.${styles.navLink}` as string,
    navbar: `.${styles.navbar}` as string,
    wrapper: wrapperRef as unknown,
  });
 
  return (
    <div className={styles.navbarWrapper} ref={wrapperRef}>
      <nav className={styles.navbar}>
        {Object.keys(navBarLinks).map((link: string) => {
          return (
            <Link key={link} to={navBarLinks[link].to}>
              <div className={styles.navLink}>
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

export default NavBar;
