import Image from "next/image";
import {  useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedis from "../../../hooks/useRedis";
import { allProductsThunk, selectAllProducts } from "../../../feature/productSlice/productSlice";
import { storePageListingArray, selectPageListingController, selectSlideMultiplier, controlOptionMenu } from "../../../feature/generalComponents/generalComponentSlice";
import SubHeaderNav from "../SubHeaderNav";
import Directions from "../Directions";
import { bufferImg } from "../../../utils/generalUtils";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/ProductListingPage/ProductListing.module.css";

const AdminProductListing = (props) => {

    const slideNumber = useSelector(selectSlideMultiplier);
    const slidesRef = useRef(null);

    const allTheProducts = useSelector(selectAllProducts);
    const pageListing = useSelector(selectPageListingController);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allProductsThunk());
    }, []);

    const arrayObj = [ { keyStr: "all_products", usingKey: allTheProducts }, { noKey: "empty", evaluationKey: props.allProducts } ];

    const [ redisState ] = useRedis(arrayObj, props.allProducts, allTheProducts, false);

    useEffect(() => {
        if (redisState) {
            props.setAllProducts(redisState);
        }
    }, [redisState]);

    useEffect(() => {
        if (!props.allProducts && allTheProducts.length > 0) {
            props.setAllProducts(allTheProducts);
        }
    }, [allTheProducts]);

    useEffect(() => {
        if (props.allProducts) {
            if (props.allProducts.length > 0) {
                dispatch(storePageListingArray(directionSequence(props.allProducts.length, pageListing, 1)));
            }
        }
    }, [props.allProducts]);

    return (
        <section className={[styles.admin_products_main_section, "unselectable"].join(" ")}>
            <header className={styles.admin_products_header}>
                <h1>Products</h1>
                <SubHeaderNav />
            </header>

            <section onClick={() => dispatch(controlOptionMenu(false))} className={styles.admin_products_content}>
                <article ref={slidesRef}>
                    {
                        props.allProducts &&
                        props.allProducts.slice(pageListing * (slideNumber - 1), pageListing * slideNumber).map(product => 
                            <article key={product.id} className={styles.admin_product_unit}>
                                <div className={styles.admin_products_image_container}>
                                    <Image
                                        fill 
                                        src={product.ProductBannerImage.banner_image_data ? bufferImg(product.ProductBannerImage.banner_image_data) : ""} 
                                        alt={product.ProductBannerImage.banner_image_name}
                                    />
                                </div>
                                <p className={styles.admin_products_product_name}>{product.product_name}</p>
                                <p className={styles.admin_products_type}>{product.type}</p>
                                <p className={styles.admin_products_created_at}>{product.created_at.replace(/[-]/g, "/").replace(/^(\d+)\/(\d+)\/(\d+)T.+$/, "$3/$2/$1")}</p>
                                <p className={styles.admin_products_updated_at}>{product.updated_at.replace(/[-]/g, "/").replace(/^(\d+)\/(\d+)\/(\d+)T.+$/, "$3/$2/$1")}</p>
                                <p className={styles.admin_products_quantity}>{product.quantity} stock{parseInt(product.quantity) > 1 ? "s" : ""} available</p>
                            </article>
                        )
                    }
                </article>
            </section>
            <div className={"admin_directions_and_submit_button"}>
                {
                    props.allProducts &&
                        <Directions 
                            max={props.allProducts.length}
                            pageListing={pageListing}
                            slideNumber={slideNumber}
                            option={1}
                            slidesRef={slidesRef}
                            products={props.allProducts}
                        />
                }
                <button>New Product</button>
            </div>
        </section>
    )
}

export default AdminProductListing;