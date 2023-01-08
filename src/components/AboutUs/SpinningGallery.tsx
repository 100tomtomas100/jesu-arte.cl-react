import styles from "./SpinningGallery.module.scss";
import axios, { all } from "axios";
import Cloudify from "../common/Cloudify";
import { useEffect, useState } from "react";

const SpinningGallery = (): JSX.Element => {
  const [availImg, SetAvailImg] = useState<{ [key: string]: any }>({});
  const [randomNum, SetRandomNum] = useState<number[]>([])

  useEffect(() => {
    axios
      .get(
        "https://res.cloudinary.com/retratos-de-mascotas/image/list/gallery.json"
      )
      .then(function (response) {
        // console.log(response.data);
        
        SetAvailImg(response.data);
        randomNum(response.data)
      });
   const randomNum = (data:{ [key: string]: any }) => {
    let allNum: string[] = Object.keys(data.resources)
    let choices: number[] = []
    let random: Function = (): number => Math.floor(Math.random()*(allNum.length))
    for(let i = 0; 8 > i; i++){
      const randomNr = random()
      choices.push(Number(allNum[randomNr]))
      allNum.splice(randomNr, 1)     
    }    
    SetRandomNum(choices)    
  }
  }, []);

  return (
  <section className={styles.spinningGallery}>
    <div className={styles.allSpinningImages}>
    {
    randomNum.map(num => {
      const props: {imgTitle: string} = {
        imgTitle: availImg.resources[num].public_id
      }
      
      return(
        <span style={{ "--i": randomNum.indexOf(num)} as React.CSSProperties} className={styles.spinningImg} key={num}>
        <Cloudify {...props} />
        </span>
      )
    })
    }
    </div>
    </section>)
};

export default SpinningGallery;
