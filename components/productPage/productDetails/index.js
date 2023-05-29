import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { selectCart, newCartThunk, addProductToCartThunk, updateQuantity } from "../../../feature/cartSlice/cartSlice";
import styles from "../../../styles/Product.module.css";

const ProductDetails = (props) => {
    const { product } = props;
    const [productCount, setProductCount] = useState(1);
    const [fireOnce, setFireOnce] = useState(false);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const router = useRouter();
    const minusRef = useRef(null);
    const plusRef = useRef(null);

    const filteredProduct = cart.cartList.filter(item => item.product.id === product.id)[0];

    const ProductBannerImage = Object.assign({}, product.images.find(img => /^banner-id/.test(img.idImage)));

    ProductBannerImage.id = ProductBannerImage.idImage;
    ProductBannerImage.banner_image_name = ProductBannerImage.imgName;
    ProductBannerImage.banner_image_data = ProductBannerImage.imgData;

    delete ProductBannerImage["idImage"];
    delete ProductBannerImage["imgName"];
    delete ProductBannerImage["imgData"];

    const ProductImages = product.images.filter(img => /^image-id/.test(img.idImage));
    ProductImages.map(image => {
        image.id = image.idImage;
        image.image_name = image.imgName;
        image.image_data = image.imgData;

        return image;
    });

    const removeUnwantedProperties = ProductImages.map(({idImage, imgName, imgData, ...rest}) => rest);

    const productClone = Object.assign({}, product);

    productClone.ProductBannerImage = ProductBannerImage;
    productClone.ProductImages = removeUnwantedProperties;

    delete productClone["images"];


    const handleInput = (e) => {
        const reg = new RegExp(/^\d*$/)
        if (!reg.test(e.target.value)) {
            return;
        }
        const numberInput = parseInt(e.target.value);
        let quantity;
        if (numberInput > product.quantity) {
            quantity = product.quantity;
        } else if (numberInput <= 0) {
            quantity = 1;
        } else {
            quantity = e.target.value;
        }

        setProductCount(quantity);
    }


    const handleSubtraction = () => {
        if (!filteredProduct) {
            if (productCount <= 1) {
                return;
            }
            setProductCount(productCount - 1);
        } else {
            return;
        }
    }
    const handleAddition = () => {
        if (!filteredProduct) {
            if (productCount >= props.product.quantity) {
                return;
            }
            setProductCount(productCount + 1);
        } else {
            return;
        }
    }

    const handleAddToCart = () => {
        if (!cart.id) {
            dispatch(newCartThunk({ id: "", abandonded: "true"}));
            setFireOnce(true);
        } else {
            if (filteredProduct) {
                const obj = {
                    cartItemId: filteredProduct.cartItemId,
                    quantity: productCount
                }
                dispatch(updateQuantity(obj));
            } else {
                const body = {
                    quantity: productCount,
                    product_id: product.id
                }
                dispatch(addProductToCartThunk({cartId: cart.id, body: body, product: productClone}));
            }
        }
    }

    const fetchCartListItem = () => {
        if (cart.id) {
            const body = {
                quantity: productCount,
                product_id: product.id
            }
            dispatch(addProductToCartThunk({cartId: cart.id, body: body, product: productClone}));
        }
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        router.push("/cart");
    }

    useEffect(() => {
        if (fireOnce === true) {
            if (cart.id) {
                fetchCartListItem();
                setFireOnce(false);
            }
        }
        if (!cart.id) {
            setFireOnce(true); // ?
        }
    }, [cart.id]);

    useEffect(() => {
        if (filteredProduct) {
            if (minusRef.current !== null && plusRef.current !== null) {
                minusRef.current.style.cursor = "not-allowed";
                plusRef.current.style.cursor = "not-allowed";
            }
        } else {
            if (minusRef.current !== null && plusRef.current !== null) {
                plusRef.current.style.cursor = "pointer";
                minusRef.current.style.cursor = "pointer";
            }
        }
    }, [filteredProduct, minusRef, plusRef]);

    return (
        <div className={styles.product_details}>
            <h1>{product.product_name}</h1>
            <div>
                <h2>$1{product.price}</h2>
                <h2>${product.price}</h2>
            </div>
            <p>
                <span>Category:</span> 
                <span>
                    <Link href={"/products/" + product.type.split("s ").join("/").toLowerCase()}>
                        {product.type.replace(/[s]/, "'s")}
                    </Link>
                </span>
            </p>

            <div className={styles.product_detail_ca}>
                <div className={styles.product_detail_ca_count}>
                    <div ref={minusRef} onClick={handleSubtraction}>
                        <AiOutlineMinus />
                    </div>
                    {
                        !filteredProduct ?
                        <input onChange={(e) => handleInput(e, filteredProduct, updateQuantity, dispatch)} value={productCount} /> :
                        <input className={styles.item_in_cart_cross} onChange={(e) => handleInput(e, filteredProduct, updateQuantity, dispatch)} value="X" />
                    }
                    {/* <input value={productCount}/> */}
                    <div ref={plusRef} onClick={handleAddition}>
                        <AiOutlinePlus />
                    </div>
                </div>

                {
                !filteredProduct ?
                <button onClick={handleAddToCart} className={styles.product_detail_ca_button}>Add to cart</button> :
                <button onClick={handleRedirect} className={styles.product_detail_ca_button}>Go to cart</button>
                }

            </div>
            <p>Description</p>
            <p>
                {product.description}
            </p>
        </div>
    )
}

export default ProductDetails;