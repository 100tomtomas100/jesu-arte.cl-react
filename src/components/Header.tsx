import styles from "./Header.module.scss";
import StickyBox from "react-sticky-box";
import Cloudify from "./common/Cloudify";
import NavBar from "./NavBar";

const Header = (): JSX.Element => {

  type cloudifyTypes = {
    imgTitle: string;
    imgWidth: string;
  };

  const cloudifyProps: cloudifyTypes = {
    imgTitle: "Jesu-Arte/logo_ip2pfc",
    imgWidth: "100",
  };

  return (
    <StickyBox>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Cloudify {...cloudifyProps} />
        </div>
        <NavBar />
      </div>
    </StickyBox>
  );
};

export default Header;
