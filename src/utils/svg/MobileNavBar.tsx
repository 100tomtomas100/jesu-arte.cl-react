import { useRef, useState } from "react";
import useMobileNavBarAnim from "../../hooks/useMobileNavBarAnim";

const MobileNavBar = ({ className, navLink, navScope }: { className: string, navLink: string, navScope: string }): JSX.Element => {
  const barRef = useRef<SVGPathElement | null>(null);
  const [showNav, setShowNav] = useState<boolean>(false);
  useMobileNavBarAnim({
    barRef: barRef as unknown,
    showNav: showNav as boolean,
    navLink: navLink as string,
    navScope: navScope as string,
  });

  const handleClick = () => {
    setShowNav(!showNav);
  };

  return (
    <svg viewBox="0 0 640 640" className={className} onClick={handleClick}>
      <path
        ref={barRef}
        id="ImportedBarPath"
        fill="True"
        stroke="black"
        strokeWidth="1"
        d="M 67.50,456.50
           C 47.88,466.38 50.38,499.00 71.12,505.00
             74.12,506.00 116.75,506.25 202.63,506.00
             202.63,506.00 329.50,505.62 329.50,505.62
             329.50,505.62 334.75,502.12 334.75,502.12
             350.62,491.75 349.25,465.00 332.50,456.50
             332.50,456.50 327.00,453.75 327.00,453.75
             327.00,453.75 200.00,453.75 200.00,453.75
             200.00,453.75 73.00,453.75 73.00,453.75
             73.00,453.75 67.50,456.50 67.50,456.50 Z
           M 67.50,296.50
           C 47.88,306.37 50.38,339.12 71.12,345.00
             74.25,346.00 141.50,346.25 282.62,346.00
             282.62,346.00 489.50,345.62 489.50,345.62
             489.50,345.62 494.75,342.12 494.75,342.12
             510.62,331.75 509.25,305.00 492.50,296.50
             492.50,296.50 487.00,293.75 487.00,293.75
             487.00,293.75 280.00,293.75 280.00,293.75
             280.00,293.75 73.00,293.75 73.00,293.75
             73.00,293.75 67.50,296.50 67.50,296.50 Z
           M 67.50,136.50
           C 47.88,146.37 50.38,179.12 71.12,185.00
             74.25,186.00 153.75,186.25 322.62,186.00
             322.62,186.00 569.50,185.62 569.50,185.62
             569.50,185.62 574.75,182.12 574.75,182.12
             590.62,171.75 589.25,145.00 572.50,136.50
             572.50,136.50 567.00,133.75 567.00,133.75
             567.00,133.75 320.00,133.75 320.00,133.75
             320.00,133.75 73.00,133.75 73.00,133.75
             73.00,133.75 67.50,136.50 67.50,136.50 Z"
      />
    </svg>
  );
};
export default MobileNavBar;
