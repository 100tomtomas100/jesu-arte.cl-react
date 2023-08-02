import styles from "../../assets/styles/ReviewsText.module.scss"

const ReviewsText = ({ className} : {className: string}): JSX.Element => {

  return (
    <div className={styles.textWrapper}>
      <p className={`${styles.text} ${className}`}>
        El arte siempre fue un misterio para mi, hasta que comencé a pintar como
        una forma de terapia. Desde entonces siento una conexión especial con el
        arte y hace poco plasmé esa conexión en un proyecto tangible: Jesu.Arte.
        <br />
        <br />
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
    </div>
  );
};

export default ReviewsText;
