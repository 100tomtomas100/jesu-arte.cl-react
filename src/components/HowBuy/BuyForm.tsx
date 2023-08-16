import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../../assets/styles/BuyForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import placeholder from "../../assets/images/placeholder.webp";
import prices from "../../utils/prices";
import { useBuyStore } from "../../hooks/useStore";
import AnimContext from "../../context/AnimContext";
import useBuyFormAnim from "../../hooks/useBuyFormAnim";

type Inputs = {
  technique: string;
  size: string;
  image: {};
};

const BuyForm = () => {
  const [uploadedImg, setUploadedImg] = useState<string>();
  const [chosenTech, setChosenTech] = useState<string>();
  const [chosenSize, setChosenSize] = useState<string>();
  const [localStorageSize, setLocalStorageSize] = useState<number>(0);
  const [imgSize, setImgSize] = useState<number>(0);
  const [imgType, setImgType] = useState<string>("")

  //store
  const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
  const shoppingCart = useBuyStore((state) => state.shoppingCart);
  const setFormOpen = useBuyStore((state) => state.setFormOpen);

  const { footerTimeline } = useContext(AnimContext);

  const containerRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();



  useBuyFormAnim({
    container: containerRef,
    anim: `.${styles.anim2}`
  })

  useLayoutEffect(() => {
    //recalculate footer scrollTrigger start and finish
    footerTimeline?.scrollTrigger.refresh();

    //check how many mb are used in local storage
    function getUsedLocalStorageSpace() {
      if (window.localStorage.length > 0) {
        return Object.keys(window.localStorage)
          .map(function (key) {
            return localStorage[key].length;
          })
          .reduce(function (a, b) {
            return a + b;
          });
      } else {
        return  0
      }
    }
    setLocalStorageSize(getUsedLocalStorageSpace() / 1024 ** 2);
  }, []);

  //image change handling
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target.files?.length as number) > 0) {
      const reader = new FileReader();
      const size = (e.target.files?.[0].size as number) / 1024 ** 2;
      setImgSize(size);
      reader.addEventListener("load", () => {
        setUploadedImg(reader.result as string);
      });
      setImgType(e.target.files?.[0].type as string);
      reader.readAsDataURL(e.target.files?.[0] as Blob);
    } else {
      setUploadedImg("");
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setChosenSize(e.target.value);
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setChosenTech(e.target.value);
  };

  //add item to the shoppng cart
  const onSubmit = (data: Inputs) => {
    const item = {
      ...data,
      price: chosenTech && chosenSize ? prices[chosenTech][chosenSize] : 0,
      image: uploadedImg,
    };
    setShoppingCart(item);
    setFormOpen(false);
  };

  //close form for adding new item
  const onCancel = () => {
    setFormOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* <div className={styles.cart}>Cart</div> */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.anim2}`}
      >
        <div className={styles.leftForm}>
          <div className={`${styles.inputContainer}  ${styles.anim}`}>
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
          <div className={`${styles.inputContainer} ${styles.anim}`}>
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
          <div className={`${styles.price} ${styles.anim}`}>
            <p>Price</p>
            <p>
              {chosenTech && chosenSize
                ? "$" + prices[chosenTech][chosenSize]
                : "$" + 0}
            </p>
          </div>
        </div>
        <div className={styles.rightForm}>
          <div className={styles.imageContainer}>
            <div className={`${styles.inputContainer} ${styles.anim}`}>
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                type="file"
                // accept="image/png, image/jpeg, image/webp, image/avif"
                accept="image/*"
                {...register("image", {
                  required: true,
                  onChange: (e) => handleImgChange(e),
                  validate: {
                    willFit: () => 5 - imgSize - localStorageSize > 0,
                    notFolder: () => imgType !== "",
                  },
                })}
                aria-invalid={errors.image ? "true" : "false"}
              />
              {errors.image?.type === "required" && (
                <p className={styles.inputError} role="alert">
                  Please upload an image!
                </p>
              )}
              {errors.image?.type === "willFit" && (
                <p className={styles.inputError} role="alert">
                  All the images in the shopping cart can not exceed 5mb!
                </p>
              )}
              {errors.image?.type === "notFolder" && (
                <p className={styles.inputError} role="alert">
                  Please select a single image!
                </p>
              )}
            </div>
            <div className={`${styles.uploadedImg} ${styles.anim}`}>
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
            <button type="submit" className={`${styles.anim}`}>
              Add To Cart
            </button>
            {Object.keys(shoppingCart).length > 0 ? (
              <button
                type="button"
                onClick={onCancel}
                className={`${styles.anim}`}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyForm;
