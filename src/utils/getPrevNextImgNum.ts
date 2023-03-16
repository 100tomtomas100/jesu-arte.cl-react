interface PropsTypes {
  listLength: number;
  currentNum: number;
  imgShowing?: string;
  imgPrevCurrNext?: {
    [key: string]: number;
  };
}

const getPrevNextImgNum = ({ listLength, currentNum, imgShowing, imgPrevCurrNext }: PropsTypes) => {

    const prev = () => {
        if (currentNum > 0) {
            return currentNum - 1
        } else if (currentNum === 0){
            return listLength - 1
        }
    }
    const next = () => {
        if (currentNum < listLength - 1) {
            return currentNum + 1
        } else if (currentNum === listLength - 1) {
            return 0
        }
    }

    const prevCurrNext = {
      ...imgPrevCurrNext,
      prev: prev() as number,
      [imgShowing === "curr"? "curr2": "curr"]: currentNum,
    //     curr: currentNum,
    //  curr2: currentNum,
      next: next() as number,
    };
    console.log(prevCurrNext)
    return prevCurrNext
}

export default getPrevNextImgNum