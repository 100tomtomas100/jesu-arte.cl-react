import styles from "../../assets/styles/MobileNav.module.scss";
import Cloudify from "../../utils/Cloudify";
import MobileNavBar from "../../utils/svg/MobileNavBar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useRef } from "react";

const MobileNav = () => {
  const navigation: NavigateFunction = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  //get the id of clicked nav button and open that page
  const handleClick = (e: React.MouseEvent) => {
    const clickId: string[] = (e.target as HTMLInputElement).id.split("_");
    navigation(`./${clickId[1]}`);
  };

  const handleLogoClick = (): void => {
    navigation("./");
  };

  return (
    <div className={styles.mobileNav} ref={wrapperRef}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <Cloudify imgTitle={"Jesu-Arte/logo_ip2pfc"} />
      </div>
      <MobileNavBar
        className={styles.mobNavBar}
        navLink={styles.navSel}
        navScope={wrapperRef}
      />
      <div className={styles.nav}>
        <div onClick={handleClick} className={styles.navSel} id="mobNavLink_">
          Acerca de mi
        </div>
        <div
          onClick={handleClick}
          className={styles.navSel}
          id="mobNavLink_gallery"
        >
          Mis trabajos
        </div>
        <div
          onClick={handleClick}
          className={styles.navSel}
          id="mobNavLink_how-buy"
        >
          Cómo comprar?
        </div>
        <div
          onClick={handleClick}
          className={styles.navSel}
          id="mobNavLink_contact-us"
        >
          Contáctame
        </div>
        <div
          onClick={handleClick}
          className={styles.navSel}
          id="mobNavLink_blog"
        >
          Blog
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
