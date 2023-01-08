import styles from "./NavBar.module.scss";
// import Cloudify from "./common/Cloudify";
import { Link } from "react-router-dom";
import home from "../images/about-us.svg";
import blog from "../images/blog.svg";
import contact from "../images/contact-us.svg";
import buy from "../images/how-buy.svg";
import portfolio from "../images/portfolio.svg";

const NavBar = (): JSX.Element => {
  const navLinks: { [key: string]: { src: string; to: string; alt: string } } =
    {
      aboutUs: {
        src: home,
        to: "/",
        alt: "",
      },
      portfolio: {
        src: portfolio,
        to: "/portfolio",
        alt: "",
      },
      howBuy: {
        src: buy,
        to: "/how-buy",
        alt: "",
      },
      contactUs: {
        src: contact,
        to: "/contact-us",
        alt: "",
      },
      blog: {
        src: blog,
        to: "/blog",
        alt: "",
      },
    };

  //   const navLinks = {
  //     aboutUs: {
  //       img: "Jesu-Arte/about-us_jng6rt",
  //       to: "/",
  //     },
  //     portfolio: {
  //       img: "Jesu-Arte/portfolio_kvbla4",
  //       to: "/portfolio",
  //     },
  //     howBuy: {
  //       img: "Jesu-Arte/how-buy_tnlcru",
  //       to: "/how-buy",
  //     },
  //     contactUs: {
  //       img: "Jesu-Arte/contact-us_gyttog",
  //       to: "/contact-us",
  //     },
  //     blog: {
  //       img: "Jesu-Arte/blog_vh38ro",
  //       to: "/blog",
  //     },
  //   };

  return (
    <nav className={styles.navbar}>
      {Object.keys(navLinks).map((link) => {
        return (
          <Link key={link} to={navLinks[link as keyof typeof navLinks].to}>
            <div className={styles.navLink}>
              <img
                id={link}
                src={navLinks[link as keyof typeof navLinks].src}
                alt={navLinks[link as keyof typeof navLinks].alt}
              />
            </div>
          </Link>
        );
      })}

      {/* {Object.keys(navLinks).map((link) => {
        type cloudifyTypes = {
          imgTitle: string;
          imgWidth: string;
        };

        const cloudifyProps: cloudifyTypes = {
          imgTitle: `${navLinks[link as keyof typeof navLinks].img}`,
          imgWidth: "100",
        };

        return (
          <Link key={link} to={navLinks[link as keyof typeof navLinks].to}>
            <div  className={styles.navLink}>
              <Cloudify {...cloudifyProps} />
            </div>
          </Link>
        );
      })} */}
    </nav>
  );
};

export default NavBar;
