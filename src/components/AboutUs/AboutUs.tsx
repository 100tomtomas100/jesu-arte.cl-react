import styles from "./AboutUs.module.scss"
import TextBox from "./TextBox"


const AboutUs = () => {

    

    return (
        
        <div className={styles.aboutus} >
            <div className={styles.intro}>
               <TextBox /> 
            </div>
            
        </div>
    )
}

export default AboutUs