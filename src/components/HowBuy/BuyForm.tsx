import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "../../assets/styles/BuyForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import placeholder from "../../assets/images/placeholder.webp";
import prices from "../../utils/prices";
import { useBuyStore } from "../../hooks/useStore";
import AnimContext from "../../context/AnimContext";

type Inputs = {
  technique: string;
  size: string;
  image: {};
};

const BuyForm = () => {
  const [uploadedImg, setUploadedImg] = useState<string>();
  const [chosenTech, setChosenTech] = useState<string>();
  const [chosenSize, setChosenSize] = useState<string>();

  //store
  const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
  const setFormOpen = useBuyStore((state) => state.setFormOpen);

  const { footerTimeline } = useContext(AnimContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useLayoutEffect(() => {
    //recalculate footer scrollTrigger start and finish
    footerTimeline?.scrollTrigger.refresh();
  },[])

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files?.[0]);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setUploadedImg(reader.result as string);
        console.log(reader.result);
    });
    reader.readAsDataURL(e.target.files?.[0] as Blob);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setChosenSize(e.target.value);
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setChosenTech(e.target.value);
  };

  const onSubmit = (data: Inputs) => {
    const item = {
      ...data,
        price: chosenTech && chosenSize ? prices[chosenTech][chosenSize] : 0,
      image: uploadedImg
    };
    setShoppingCart(item);
    setFormOpen(false)
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.cart}>Cart</div> */}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.leftForm}>
          <div className={`${styles.inputContainer} ${styles.inputAnim}`}>
            <label htmlFor="technique">Technique</label>
            <select
              id="technique"
              defaultValue={""}
              {...register("technique", {
                required: true,
                onChange: (e) => handleTechChange(e),
              })}
              aria-invalid={errors.technique ? "true" : "false"}
            >
              <option value="" disabled>
                Please select...
              </option>
              <option value="aquarelle">Aquarelle</option>
              <option value="pencil">Pencil</option>
              <option value="marker">Marker</option>
            </select>
            {errors.technique && (
              <p className={styles.inputError} role="alert">
                Please choose one
              </p>
            )}
          </div>
          <div className={`${styles.inputContainer} ${styles.inputAnim}`}>
            <label htmlFor="size">Size</label>
            <select
              id="size"
              defaultValue={""}
              {...register("size", {
                required: true,
                onChange: (e) => handleSizeChange(e),
              })}
              aria-invalid={errors.size ? "true" : "false"}
            >
              <option value="" disabled>
                Please select...
              </option>
              <option value="s12cm_x_12cm">12cm x 12cm</option>
              <option value="s24cm_x_24cm">24cm x 24cm</option>
              <option value="s50cm_x_50cm">50cm x 50cm</option>
            </select>
            {errors.size && (
              <p className={styles.inputError} role="alert">
                Please choose one
              </p>
            )}
          </div>
          <div className={styles.price}>
            <p>Price</p>
            <p>
              {chosenTech && chosenSize
                ? "$" + prices[chosenTech][chosenSize]
                : "$" + 0}
              {/* {prices["pencil"]["cm50_x_cm50"]} */}
            </p>
          </div>
        </div>
        <div className={styles.rightForm}>
          <div className={styles.imageContainer}>
            <div className={`${styles.inputContainer} ${styles.inputAnim}`}>
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                type="file"
                accept="image/png, image/jpeg, image/webp, image/avif"
                {...register("image", {
                  required: true,
                  onChange: (e) => handleImgChange(e),
                })}
                aria-invalid={errors.image ? "true" : "false"}
              />
              {errors.image && (
                <p className={styles.inputError} role="alert">
                  Please upload an image
                </p>
              )}
            </div>

            <div className={styles.uploadedImg}>
              {uploadedImg ? (
                <img
                  src={uploadedImg}
                  alt="uploaded image"
                  className={styles.imgUploaded}
                />
              ) : (
                <img
                  src={placeholder}
                  alt="placeholder for image"
                  className={styles.imgPlaceHolder}
                />
              )}
            </div>
          </div>
          <div className={styles.button}>
            <button type="submit">Add To Cart</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyForm;
