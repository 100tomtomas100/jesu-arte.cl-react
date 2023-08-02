import styles from "../assets/styles/Footer.module.scss";
import instagram from "../assets/images/instagram.png";
import linkedin from "../assets/images/linkedin.png";
import { useRef, useState } from "react";
import useFooterAnim from "../hooks/useFooterAnim";

const Footer = (): JSX.Element => {
  const [year] = useState<number>(new Date().getFullYear());
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const classes = {
    // wrapper: styles.footer,
    credits: styles.footerCredits,
    designedBy: styles.designedBy,
    tomas: styles.tomas,
    year: styles.year,
    cooperation: styles.footerCooperation,
    marcia: styles.marcia,
    socialize: styles.footerSocialize,
    socialLinks: styles.socialLinks,
    container: styles.container
  };

  const animProps = {
    wrapper: wrapperRef as unknown,
    container: classes.container as string,
    animate: styles.animate as string,
  };

  useFooterAnim(animProps);

  return (
    <div ref={wrapperRef}>
      <div className={classes.container}>
        <div className={classes.credits}>
          <h5 className={`${classes.designedBy} ${animProps.animate}`}>
            DESIGNED BY
          </h5>
          <h2 className={`${classes.tomas} ${animProps.animate}`}>
            Tomas Pocius
          </h2>
          <h4
            className={`${classes.year} ${animProps.animate}`}
          >{`© 2022 - ${year}`}</h4>
        </div>
        <div className={classes.cooperation}>
          <h4 className={`${classes.marcia} ${animProps.animate}`}>
            In cooperation with &nbsp;
            <a
              target={"_blank"}
              rel="noopener noreferrer"
              href="https://www.digitalmarcia.com"
            >
              Digital Marcia
            </a>
          </h4>
          <div className={classes.socialize}>
            <h5 className={`${animProps.animate}`}>SOCIALIZE</h5>
            <div className={classes.socialLinks}>
              <h6 className={`${animProps.animate}`}>
                <a
                  target={"_blank"}
                  rel="noopener noreferrer"
                  href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fdigital.marcia%2F%3Fhl%3Des-la%26fbclid%3DIwAR2LkTWVqALiwD8QsTAGf9lSvXeAN6mqUP5KM1jOfh7HBlR6PF6KzeO0gQo&h=AT0-PeOcns0Ai_q-vUS5fNApa25BGCxetDHzg0Uks3w-mLfa6BOqAP1JHJJHU5-aErNp5SfOaDaHciGcizae4_oHXsUgwKWDNHIYqIGQhBb4JYi95Uwrx6pU5izkQNm3D-FlwGcCMhc"
                >
                  <img src={instagram} alt="instagram logo" />
                </a>
              </h6>
              <h6 className={`${animProps.animate}`}>
                <a
                  target={"_blank"}
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/digital-marcia/"
                >
                  <img src={linkedin} alt="linkedin logo" />
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
