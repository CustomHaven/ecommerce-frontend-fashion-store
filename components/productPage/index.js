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
    // if (!props.product) {
    //     return;
    // }
    console.log("props.product in the begining of ProductPage!!", props.product);
    console.log("checking the start is do we have prodId", props.prodId);
    const dispatch = useDispatch();
    const singleProduct = useSelector(selectSingleProduct);
    const isError = useSelector(selectSingleProductErrors);
    const statusCode = useSelector(selectSingleProductStatusCode);
    const statusText = useSelector(selectSingleProductStatusText);

    const [fetchProduct, setFetchProduct] = useState();

    const [theSingleProduct, setTheSingleProduct] = useState({});

    const [imgIdContainer, setImgIdContainer] = useState([]);

    const [imgIdContainerLength, setImgIdContainerLength] = useState(0);

    // Does something similar but used in two different places
    const [initialFour, setInitialFour] = useState([]);
    const [forClick, setForClick] = useState([]);
    const [displaySmallerImages, setDisplaySmallerImages] = useState([]);
    const [currentSelectedImage, setCurrentSelectedImage] = useState("");
    const [currentImage, setCurrentImage] = useState({});

    const fetcher = async (input) => {
        console.log("FETCHER IS HIT!")
        const response = await fetch("/api/redis", {
            method: "POST",
            body: JSON.stringify(input)
        });
        if (!response.ok) {
            setFetchProduct(null);
            return;
        } else {
            const jsonRespons = await response.json();

            // setMonitorCaching(allTheProducts);
            // props.setUsingProducts(jsonRespons.usingKey);
            setFetchProduct(jsonRespons.usingKey);
            return;
        }
    }

    console.log("props.product what is it?", props.product);

    console.log("theSingleProduct we have it?", theSingleProduct);
    console.log("imgIdContainer we have it?", imgIdContainer);
    console.log("imgIdContainerLength we have it?", imgIdContainerLength);
    console.log("initialFour we have it?", initialFour);
    console.log("forClick we have it?", forClick);
    console.log("currentSelectedImage we have it?", currentSelectedImage);
    console.log("currentImage we have it?", currentImage);
    console.log("displaySmallerImages we have it?", displaySmallerImages);

    // const [largeImageSelected, setLargeImageSelected] = useState(false);
    const { windowWidth } = useWindowDimensions();

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
        // if (props.product) {
            // console.log("props.product in the begining what is it common tell me?!", props.product);
            // console.log("props.prodId in the begining what is it common tell me?!", props.prodId);
            dispatch(singleProductThunk(props.prodId));
        // }
    }, []);

    useEffect(() => {
        if (props.product) {
            if (props.product.id && singleProduct.id) {
                console.log("are in the comparison place?");
                if (JSON.stringify(singleProduct) !== JSON.stringify(props.product)) {
                    console.log("it is not the same the JSON STRINGIFY!");
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
                console.log("JSON STRINGIFY is the same WHAT IS IN REDIS AND IN OUR DB!")
            }
        }
    }, [singleProduct]);

    useEffect(() => {
        if (fetchProduct) {
            console.log("we are in fetch product!");
            props.setProduct(fetchProduct);
        }
    }, [fetchProduct]);

    useEffect(() => {
        if (!props.product) {
            if (singleProduct) {
                console.log("we have singleProduct values apparently", singleProduct);
                if (singleProduct.id) {
                    console.log("props.product is empty!", props.product);
                    console.log("singleProduct should not be empty!", singleProduct);
                    props.setProduct(singleProduct);
                } 
                if (isError) {
                    props.setError(isError);
                    props.setStatusText(statusText);
                    props.setStatusCode(statusCode);
                    console.log("isError we have error", isError);
                    console.log("statusText is", statusText);
                    console.log("statusCode is", statusCode);
                }
            }
        }
    }, [singleProduct]);


    useEffect(() => {
        console.log("outside the props.products");
        if (props.product) {
            if (props.product.id) {
                console.log("Are we in here in the props.product? listing?", props.product);
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
        console.log("are we even entering here?", theSingleProduct);
        if (theSingleProduct.id) {
            console.log("are we entering the if statement for setImgId etc?")
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

    // return;

    console.log("singleProduct redux came back?", singleProduct);

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