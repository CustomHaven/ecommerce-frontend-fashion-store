import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import Error from "../../pages/_error";
import ProductImages from "./productImages";
import DisplayMainImage from "./displayMainImage";
import ProductDetails from "./productDetails";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { singleProductThunk, selectSingleProduct, selectSingleProductStatusCode,
        selectSingleProductStatusText, selectSingleProductErrors } from "../../feature/productSlice/productSlice";
import { fillDisplayArray, clickHelper, helperArrayNewSetOfFours } from "../../utils/generalUtils";
import styles from "../../styles/Product.module.css";


const ProductPage = (props) => {

    const dispatch = useDispatch();
    const singleProduct = useSelector(selectSingleProduct);
    const isError = useSelector(selectSingleProductErrors);
    const statusCode = useSelector(selectSingleProductStatusCode);
    const statusText = useSelector(selectSingleProductStatusText);

    const [fetchProduct, setFetchProduct] = useState();

    const [theSingleProduct, setTheSingleProduct] = useState({});

    const [imgIdContainer, setImgIdContainer] = useState([]);

    const [imgIdContainerLength, setImgIdContainerLength] = useState(0);

    const [initialFour, setInitialFour] = useState([]);
    const [forClick, setForClick] = useState([]);
    const [displaySmallerImages, setDisplaySmallerImages] = useState([]);
    const [currentSelectedImage, setCurrentSelectedImage] = useState("");
    const [currentImage, setCurrentImage] = useState({});

    const { windowWidth } = useWindowDimensions();

    const fetcher = async (input) => {
        const response = await fetch("/api/redis", {
            method: "POST",
            body: JSON.stringify(input)
        });
        if (!response.ok) {
            setFetchProduct(null);
            return;
        } else {
            const jsonRespons = await response.json();

            setFetchProduct(jsonRespons.usingKey);
            return;
        }
    }

    const handleLeftClick = () => {
        const theFoursLastIndex = clickHelper("left", forClick, theSingleProduct.images);
        let newIDImg, tempArray, tempFour = [];
        if (theSingleProduct.images[theFoursLastIndex - 1] !== undefined) {
            newIDImg = theSingleProduct.images[theFoursLastIndex - 1].idImage;
            tempFour = [newIDImg, ...forClick.slice(0, forClick.length - 1)];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, theSingleProduct.images);
            setDisplaySmallerImages(tempArray);
        } else {
            newIDImg = theSingleProduct.images[theSingleProduct.images.length -1].idImage;
            tempFour = [newIDImg, ...forClick.slice(0, forClick.length - 1)];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, theSingleProduct.images);
            setDisplaySmallerImages(tempArray);
        }
    }

    const handleRightClick = async () => {
        const theFoursLastIndex = clickHelper("right", forClick, theSingleProduct.images);
        let newIDImg, tempArray, tempFour = [];
        if (theSingleProduct.images[theFoursLastIndex + 1]) {
            newIDImg = await theSingleProduct.images[theFoursLastIndex + 1].idImage;
            tempFour = [...forClick.slice(1, forClick.length), newIDImg];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, theSingleProduct.images);
            setDisplaySmallerImages(tempArray);
        } else {
            newIDImg = theSingleProduct.images[0].idImage;
            tempFour = [...forClick.slice(1, forClick.length), newIDImg];
            setForClick(tempFour);

            tempArray = helperArrayNewSetOfFours(tempFour, theSingleProduct.images);
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

    useEffect(() => {
        dispatch(singleProductThunk(props.prodId));
    }, []);

    useEffect(() => {
        if (props.product) {
            if (props.product.id && singleProduct.id) {
                if (JSON.stringify(singleProduct) !== JSON.stringify(props.product)) {
                    console.log("Not the same change needed!");
                    const obj = [
                        {
                            keyStr: props.prodId.replace(/-/, "_"),
                            usingKey: singleProduct
                        },
                        {
                            noKey: "empty",
                            evaluationKey: props.product
                        }
                    ]
                    fetcher(obj);
                }
            } else {
                console.log("Same values change not needed");
            }
        }
    }, [singleProduct]);

    useEffect(() => {
        if (fetchProduct) {
            props.setProduct(fetchProduct);
        }
    }, [fetchProduct]);

    useEffect(() => {
        if (!props.product) {
            if (singleProduct) {
                if (singleProduct.id) {
                    props.setProduct(singleProduct);
                } 
                if (isError) {
                    props.setError(isError);
                }
            }
        }
    }, [singleProduct]);


    useEffect(() => {
        if (props.product) {
            if (props.product.id) {
                const productImagesArray = [].concat(props.product.ProductImages.map(val => Object.assign({}, {
                    idImage: val.id.replace(/^(.+)$/, "image-id-$1"),
                    imgName: val.image_name,
                    imgData: val.image_data
                })));
        
                const productBannerImage = Object.assign({}, {
                    idImage: props.product.ProductBannerImage.id.replace(/^(.+)$/, "banner-id-$1"),
                    imgName: props.product.ProductBannerImage.banner_image_name,
                    imgData: props.product.ProductBannerImage.banner_image_data
                });
        
                productImagesArray.unshift(productBannerImage);
        
                const singleProductCopy = Object.assign({}, {...props.product, images: productImagesArray}) // work from here!
        
                delete singleProductCopy["ProductBannerImage"];
                delete singleProductCopy["ProductImages"];
    
                setTheSingleProduct(singleProductCopy);
            }
        }
    }, [props.product]);

    useEffect(() => {
        if (theSingleProduct.id) {
            setImgIdContainer(theSingleProduct.images.map(img => img.idImage));
            setCurrentSelectedImage(theSingleProduct.images[0].idImage);
            setCurrentImage(theSingleProduct.images[0]);
        }
    }, [theSingleProduct]);

    useEffect(() => {
        if (imgIdContainer.length > 0) {
            setImgIdContainerLength(imgIdContainer.length >= 4 ? 4 : imgIdContainer.length);
        }
    }, [imgIdContainer]);

    useEffect(() => {
        if (imgIdContainerLength > 0) {
            setInitialFour(fillDisplayArray(imgIdContainer, imgIdContainerLength, theSingleProduct.images[0].idImage));
            setForClick(fillDisplayArray(imgIdContainer, imgIdContainerLength, theSingleProduct.images[0].idImage));
        }
    }, [imgIdContainerLength]);

    useEffect(() => {
        if (initialFour.length > 0) {
            setDisplaySmallerImages(theSingleProduct.images.filter(img => {
                if (initialFour.includes(img.idImage)) {
                    return img;
                }
            }));
        }
    }, [initialFour]);    

    useEffect(() => {
        window.addEventListener("resize", () => {
            const tempArray = helperArrayNewSetOfFours(initialFour, theSingleProduct.images);
            setDisplaySmallerImages(tempArray);
        });
    }, [windowWidth]);

    if (isError) {
        return <Error statusCode={statusCode} statusText={statusText} resetValues={true} />
    }

    return (
        <>
            <section data-white key={theSingleProduct.id} className={styles.single_product_section}>

                {/* List all small images section */}
                <ul className={styles.ul_smaller_images}>
                    { windowWidth <= 760 && theSingleProduct.images.length > 4 ? 
                        <li key={"click-left-small-images"}>
                            <BsFillArrowLeftCircleFill
                                onClick={handleLeftClick}
                                className={styles.small_images_direction}
                            />
                        </li>
                        : null
                    }

                    {
                        windowWidth <= 760 && displaySmallerImages.length > 0 ?
                        displaySmallerImages.map((img) => {
                            return (
                                <ProductImages 
                                    img={img} 
                                    currentSelectedImage={currentSelectedImage} 
                                    handleSelectedSmallimg={handleSelectedSmallimg}
                                />
                            )
                        }) :

                        
                        theSingleProduct.id &&
                        theSingleProduct.images.map((img) => {
                            return (
                                <ProductImages 
                                    img={img} 
                                    currentSelectedImage={currentSelectedImage} 
                                    handleSelectedSmallimg={handleSelectedSmallimg}
                                />
                            );
                        })
                    }

                    { windowWidth <= 760 && theSingleProduct.images.length > 4 ?
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
                {
                    currentImage.idImage &&
                    <DisplayMainImage currentImage={currentImage}/>
                }

                {/* Product Details */}
                {
                    theSingleProduct.id &&
                    <ProductDetails product={theSingleProduct}/>
                }
            </section>
        </>
    )
}

export default ProductPage;