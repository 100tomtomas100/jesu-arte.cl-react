import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "../../assets/styles/Loading.module.scss"

const Loading = ({visible}:{visible: boolean}) => {
    return (
      <div
        className={styles.loading}
        style={visible ? { display: "unset" } : { display: "none" }}
      >
        <AiOutlineLoading3Quarters />
      </div>
    );
}

export default Loading