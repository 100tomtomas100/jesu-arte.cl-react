import home from "../assets/images/about-us.svg";
import blog from "../assets/images/blog.svg";
import contact from "../assets/images/contact-us.svg";
import buy from "../assets/images/how-buy.svg";
import portfolio from "../assets/images/portfolio.svg";
import homeMin from "../assets/images/about-us-min.svg";
import blogMin from "../assets/images/blog-min.svg";
import contactMin from "../assets/images/contact-us-min.svg";
import buyMin from "../assets/images/how-buy-min.svg";
import portfolioMin from "../assets/images/portfolio-min.svg";

const useNavLinkInfo = (nav: string):{ [key: string]: {[key:string]: string} } => {

    const navImg: { [key: string]: { [key: string]: string } } = {
      topNav: {
        aboutUs: home,
        blog: blog,
        portfolio: portfolio,
        howBuy: buy,
        contactUs: contact,
      },
      sideNav: {
        aboutUs: homeMin,
        blog: blogMin,
        portfolio: portfolioMin,
        howBuy: buyMin,
        contactUs: contactMin,
      },
    };

    interface navLinkIn {
      src:string,
      to:string,
      alt:string
    }
    
    const navLink = (name: string, to:string, alt:string="Navigation button"):navLinkIn => {
      return{src:navImg[nav][name], to:to, alt:alt}
    }
   
    const navLinks: { [key: string]: { src: string; to: string; alt: string } } = {     
      aboutUs: {
        ...navLink("aboutUs", "/")
      },
      portfolio: {
        ...navLink("portfolio", "/gallery")
      },
      howBuy: {
        ...navLink("howBuy", "/how-buy")
      },
      contactUs: {
        ...navLink("contactUs", "/contact-us")
      },
      Blog: {
        ...navLink("blog", "/blog")
      }
  };

  return navLinks
}



  export default useNavLinkInfo

