import styles from "./Header.module.scss";
import StickyBox from "react-sticky-box";
import Cloudify from "./common/Cloudify";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  type cloudifyTypes = {
    imgTitle: string;
  };

  const cloudifyProps: cloudifyTypes = {
    imgTitle: "Jesu-Arte/logo_ip2pfc",
  };

  return (
    <StickyBox>
      <div className={styles.header}>
        <Link to="./">
          <div className={styles.logo}>
            <Cloudify {...cloudifyProps} />
          </div>
        </Link>
        <NavBar />
      </div>
    </StickyBox>
  );
};

export default Header;
