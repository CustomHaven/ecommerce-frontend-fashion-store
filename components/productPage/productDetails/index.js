import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "../../../styles/Product.module.css";

const ProductDetails = (props) => {
    const { handleSubtraction, handleAddition, productCount, product } = props;
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
                <button className={styles.product_detail_ca_count}>
                    <AiOutlineMinus
                        onClick={handleSubtraction}
                        // onMouseDown={handleSubtraction}
                    />
                    <p>{productCount}</p>
                    {/* <input value={productCount}/> */}
                    <AiOutlinePlus
                        onClick={handleAddition}
                        // onMouseDown={handleAddition}
                    />
                </button>

                <button className={styles.product_detail_ca_button}>Add to cart</button>
            </div>
            <p>Description</p>
            <p>
                {product.description}
            </p>
        </div>
    )
}

export default ProductDetails;