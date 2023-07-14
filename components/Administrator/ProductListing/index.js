import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductsThunk, selectAllProducts } from "../../../feature/productSlice/productSlice";
import { storePageListingArray, selectPageListingController, selectSlideMultiplier, controlOptionMenu } from "../../../feature/generalComponents/generalComponentSlice";
import SubHeaderNav from "../SubHeaderNav";
import Directions from "../Directions";
import { bufferImg } from "../../../utils/generalUtils";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/ProductListingPage/ProductListing.module.css";

const AdminProductListing = () => {

    // const [slideNumber, setSlideNumber] = useState(1);
    // const [pageListing] = useState(4);
    const slideNumber = useSelector(selectSlideMultiplier);
    const slidesRef = useRef(null);

    const allProducts = useSelector(selectAllProducts);
    const pageListing = useSelector(selectPageListingController);


    const dispatch = useDispatch();

    const handleOptionMenu = () => {
        dispatch(controlOptionMenu(false));
    }

    useEffect(() => {
        dispatch(allProductsThunk());
    }, []);

    useEffect(() => {
        dispatch(storePageListingArray(directionSequence(allProducts.length, pageListing, 1)));
    }, [allProducts]);

    console.log({allProducts});

    return (
        <section className={styles.admin_products_main_section}>
            <header className={styles.admin_products_header}>
                <h1>Products</h1>
                <SubHeaderNav />
            </header>

            <section onClick={handleOptionMenu} className={styles.admin_products_content}>
                <article ref={slidesRef}>
                    {
                        allProducts.slice(pageListing * (slideNumber - 1), pageListing * slideNumber).map(product => 
                            <article key={product.id} className={styles.admin_product_unit}>
                                <div className={styles.admin_products_image_container}>
                                    <Image
                                        fill 
                                        src={product.ProductBannerImage.banner_image_data ? bufferImg(product.ProductBannerImage.banner_image_data) : ""} 
                                        alt={product.ProductBannerImage.banner_image_name}
                                    />
                                </div>
                                <span className={styles.admin_products_product_name}>{product.product_name}</span>
                                <span className={styles.admin_products_type}>{product.type}</span>
                                <span className={styles.admin_products_created_at}>{product.created_at.replace(/[T].+$/, "").replace(/[-]/g, "/")}</span>
                                <span className={styles.admin_products_updated_at}>{product.updated_at.replace(/[T].+$/, "").replace(/[-]/g, "/")}</span>
                                <span className={styles.admin_products_quantity}>{product.quantity} stock{parseInt(product.quantity) > 1 ? "s" : ""} available</span>
                            </article>
                        )
                    }
                </article>
            </section>
            <div className={"admin_directions_and_submit_button"}>
                <Directions 
                    max={allProducts.length}
                    pageListing={pageListing}
                    slideNumber={slideNumber}
                    // setSlideNumber={setSlideNumber}
                    option={1}
                    slidesRef={slidesRef}
                    products={allProducts}
                />
                <button>New Product</button>
            </div>
        </section>
    )
}

export default AdminProductListing;