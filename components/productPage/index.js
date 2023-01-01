import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import ProductImages from "./productImages";
import DisplayMainImage from "./displayMainImage";
import ProductDetails from "./productDetails";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { fillDisplayArray, clickHelper, helperArrayNewSetOfFours } from "../../utils/generalUtils";
import styles from "../../styles/Product.module.css";


const ProductPage = (props) => {
    const [imgIdContainer] = useState(props.product.images.map(img => img.idImage));
    const [imgIdContainerLength] = useState(imgIdContainer.length >= 4 ? 4 : imgIdContainer.length);

    // Does something similar but used in two different places
    const [initialFour, setInitialFour] = useState(fillDisplayArray(imgIdContainer, imgIdContainerLength, props.product.images[0].idImage));
    const [forClick, setForClick] = useState(fillDisplayArray(imgIdContainer, imgIdContainerLength, props.product.images[0].idImage));
    const [displaySmallerImages, setDisplaySmallerImages] = useState(props.product.images.filter(img => {
        if (initialFour.includes(img.idImage)) {
            return img;
        }
    }));
    const [currentSelectedImage, setCurrentSelectedImage] = useState(props.product.images[0].idImage);
    const [currentImage, setCurrentImage] = useState(props.product.images[0]);
    // const [largeImageSelected, setLargeImageSelected] = useState(false);
    const [productCount, setProductCount] = useState(1);
    const { windowWidth } = useWindowDimensions();

    const handleLeftClick = () => {
        const theFoursLastIndex = clickHelper("left", forClick, props.product.images);
        let newIDImg, tempArray, tempFour = [];
        if (props.product.images[theFoursLastIndex - 1] !== undefined) {
            newIDImg = props.product.images[theFoursLastIndex - 1].idImage;
            tempFour = [newIDImg, ...forClick.slice(0, forClick.length - 1)];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, props.product.images);
            setDisplaySmallerImages(tempArray);
        } else {
            newIDImg = props.product.images[props.product.images.length -1].idImage;
            tempFour = [newIDImg, ...forClick.slice(0, forClick.length - 1)];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, props.product.images);
            setDisplaySmallerImages(tempArray);
        }
    }

    const handleRightClick = async () => {
        const theFoursLastIndex = clickHelper("right", forClick, props.product.images);
        let newIDImg, tempArray, tempFour = [];
        if (props.product.images[theFoursLastIndex + 1] !== undefined) {
            newIDImg = await props.product.images[theFoursLastIndex + 1].idImage;
            tempFour = [...forClick.slice(1, forClick.length), newIDImg];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, props.product.images);
            setDisplaySmallerImages(tempArray);
        } else {
            newIDImg = props.product.images[0].idImage;
            tempFour = [...forClick.slice(1, forClick.length), newIDImg];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, props.product.images);
            setDisplaySmallerImages(tempArray);
        }
    }

    const handleSelectedSmallimg = (img) => {
        setCurrentSelectedImage(img.idImage);
        setCurrentImage(img);

        if (imgIdContainerLength < 4) {
            return;
        }
        
        const idIMAGE = fillDisplayArray(imgIdContainer, 4, img.idImage);
        setInitialFour(idIMAGE);
    }

    const handleSubtraction = () => {
        if (productCount <= 1) {
            return;
        }
        setProductCount(productCount - 1);
    }
    const handleAddition = () => {
        if (productCount >= props.product.quantity) {
            return;
        }
        setProductCount(productCount + 1);
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            const tempArray = helperArrayNewSetOfFours(initialFour, props.product.images);
            setDisplaySmallerImages(tempArray);
        });
    }, [windowWidth]);

    return (
        <>
            <section data-white key={props.product.id} className={styles.single_product_section}>

                {/* List all small images section */}
                <ul className={styles.ul_smaller_images}>
                    { windowWidth <= 760 && props.product.images.length > 4 ? 
                        <li key={"click-left-small-images"}>
                            <BsFillArrowLeftCircleFill
                                onClick={handleLeftClick}
                                className={styles.small_images_direction}
                            />
                        </li>
                        : null
                    }

                    {
                        windowWidth <= 760 ?
                        displaySmallerImages.map((img) => {
                            return <ProductImages 
                            img={img} 
                            currentSelectedImage={currentSelectedImage} 
                            handleSelectedSmallimg={handleSelectedSmallimg} />
                        }) :

                        props.product.images.map((img) => {
                            return <ProductImages 
                            img={img} 
                            currentSelectedImage={currentSelectedImage} 
                            handleSelectedSmallimg={handleSelectedSmallimg} />
                        })
                    }

                    { windowWidth <= 760 && props.product.images.length > 4 ?
                        <li key={"click-right-small-images"}>
                            <BsFillArrowRightCircleFill
                                onClick={handleRightClick}
                                className={styles.small_images_direction}
                            />
                        </li>
                        : null
                    }
                </ul>

                {/* Display Image section */}
                <DisplayMainImage currentImage={currentImage}/>

                {/* Product Details */}
                <ProductDetails
                    handleAddition={handleAddition}
                    handleSubtraction= {handleSubtraction}
                    product={props.product}
                    productCount={productCount}
                />
            </section>
        </>
    )
}

export default ProductPage;