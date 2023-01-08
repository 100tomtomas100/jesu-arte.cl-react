import styles from "./TextBox.module.scss";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

const TextBox = (): JSX.Element => {
  const [textExpanded, SetTextExpanded] = useState<boolean>(false);
  const [textExpHeight, SetTextExpHeight] = useState<number | string>(0);
  const [textExpStyle, SetTextExpStyle] = useState({});
  const textExpRef = useRef<HTMLParagraphElement | null>(null);

  //get the expendable text box height and then set it to 0 so it loads closed
  useLayoutEffect(() => {
    SetTextExpHeight(
      textExpRef.current ? textExpRef.current["clientHeight"] : 0
    );
    SetTextExpStyle({
      height: 0,
      visibility: "visible",
    });
  }, []);

  //reset the event listener and adjust the height of the expandable text box
  useEffect(() => {
    const handleResize = (): void => {
      if (textExpanded) {
        SetTextExpStyle({ ...textExpStyle, height: "fit-content" });
        SetTextExpHeight(
          textExpRef.current ? textExpRef.current["clientHeight"] : 0
        );
      }
      if (!textExpanded) {
        SetTextExpHeight("fit-content");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [textExpanded]);

  const handleClick = (): void => {
    if (textExpanded) {
      if (textExpHeight === "fit-content") {
        SetTextExpHeight(
          textExpRef.current ? textExpRef.current["clientHeight"] : 0
        );
      }
      SetTextExpStyle({ ...textExpStyle, height: 0 });
    } else {
      SetTextExpStyle({ ...textExpStyle, height: textExpHeight });
    }
    SetTextExpanded(!textExpanded);
  };

  return (
    <div className={styles.textBox}>
      <p className={styles.textVisible}>
        ¡Hola! mi nombre es Jesu, soy artista autodidacta de la región del
        Biobío, Chile.
        <br />
        <br />
        El arte siempre fue un misterio para mi, hasta que comencé a pintar como
        una forma de terapia. Desde entonces siento una conexión especial con el
        arte y hace poco plasmé esa conexión en un proyecto tangible: Jesu.Arte.
        <br />
        <br />
      </p>
      <p
        ref={textExpRef}
        style={textExpStyle}
        className={styles.textExpandable}
      >
        Jesu.Arte es un espacio en el que me dedico a pintar retratos por
        encargo de animales y personas, a partir de fotografías. También he
        incursionado en otras técanicas, como la ilustración digital y pintura
        sobre objetos cotidianos.
        <br />
        <br />
        La naturaleza es mi gran inspiración, especialmente los rostros y las
        miradas de los seres vivos. Veo una belleza particular y un mundo de
        sensaciones en cada rostro, y son estas características las que busco
        reflejar en mi obra.
        <br />
        <br />
        ¡Procuraré pintar cuidadosamente a tus seres queridos y que sientas el
        retrato lleno de vida! Te invito a conocer mi trabajo y espero recibir
        tu encargo muy pronto.
        <br />
        <br />
        ¡BIENVENIDO!
      </p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleClick}>
          {textExpanded ? "Leer menos" : "Leer más"}
        </button>
      </div>
    </div>
  );
};

export default TextBox;
