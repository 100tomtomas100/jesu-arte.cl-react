import styles from "./NavBar.module.scss";
import Cloudify from "./common/Cloudify";

const NavBar = (): JSX.Element => {
  const navLinks = {
    aboutUs: {
      img: "Jesu-Arte/about-us_jng6rt",
      to: "/about-us",
    },
    portfolio: {
      img: "Jesu-Arte/portfolio_kvbla4",
      to: "/portfolio",
    },
    howBuy: {
      img: "Jesu-Arte/how-buy_tnlcru",
      to: "/how-buy",
    },
    contactUs: {
      img: "Jesu-Arte/contact-us_gyttog",
      to: "/contact-us",
    },
    blog: {
      img: "Jesu-Arte/blog_vh38ro",
      to: "/blog",
    },
  };

  return (
    <nav className={styles.navbar}>
      {Object.keys(navLinks).map((link) => {
        type cloudifyTypes = {
          imgTitle: string;
          imgWidth: string;
        };

        const cloudifyProps: cloudifyTypes = {
          imgTitle: `${navLinks[link as keyof typeof navLinks].img}`,
          imgWidth: "100",
        };

        return (
          <div key={link} className={styles.navLink}>
            <Cloudify {...cloudifyProps} />
          </div>
        );
      })}
    </nav>
  );
};

export default NavBar;
