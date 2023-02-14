import styles from "../assets/styles/Header.module.scss";
import Cloudify from "../utils/Cloudify";
import NavBar from "../components/navBars/NavBar";
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  const cloudifyProps = {
    imgTitle: "Jesu-Arte/logo_ip2pfc" as string,
  };

  return (
    <div className={styles.header}>
      <Link to="./">
        <div className={styles.logo}>
          <Cloudify {...cloudifyProps} />
        </div>
      </Link>
      <NavBar />
    </div>
  );
};

export default Header;
