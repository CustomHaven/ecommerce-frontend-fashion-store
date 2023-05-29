import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useQuerySelector from "../../hooks/useQuerySelector";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { selectCart, updateQuantity, removeCartItemThunk, removeCartThunk } from "../../feature/cartSlice/cartSlice";
import SubTotal from "./subTotal";
import { bufferImg } from "../../utils/generalUtils";
import { handleInput, handlePlus, handleMinus, handleRemove, handleProductName } from "../../utils/cartFormHelper";
import styles from "../../styles/cartpage/Cart.module.css";

const CartPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const root = useQuerySelector(":root");
    const { windowWidth } = useWindowDimensions();
    const cartList = cart.cartList;
    const [fireOnce, setFireOnce] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {
        if (fireOnce === true) {
            dispatch(removeCartThunk({ cartId: cart.id }));
            setFireOnce(false);
        }
    }, [cartList]);

    return (
        <>
        <section data-white className={styles.cart_section}>
            <h1>Cart</h1>
            {cartList.length > 0 ?
            <div id="table-container" ref={tableRef} data-cartContent>
                <table className={styles.cart_table} >
                    <thead className={styles.cart_table_header}>
                        <tr className={[styles.tr_data, styles.tr_data_upper].join(" ")}>
                            <th colSpan={windowWidth > 700 ? 2 : 1} className={[styles.cart_header_items, styles.cart_table_headers].join(" ")}>
                                <p className={styles.cart_table_th_right_margin}>Cart Items</p>
                            </th>
                            <th className={[styles.cart_header_price, styles.cart_table_headers].join(" ")}>
                                <p className={styles.cart_table_th_right_margin}>Price</p>
                            </th>
                            <th className={[styles.cart_header_quantity, styles.cart_table_headers].join(" ")}>
                                <p className={styles.cart_table_th_right_margin}>Quantity</p>
                            </th>
                            <th className={[styles.cart_header_subtotal, styles.cart_table_headers].join(" ")}>
                                <p>Subtotal</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.cart_table_body}>
                        {
                            cartList.map((data, index, array) => 
                                <tr key={data.id} className={[styles.tr_data, array[index] === cartList[array.length -1] && styles.tr_data_lower].join(" ")}>
                                    {
                                        windowWidth > 700 ?
                                        <td className={styles.cart_data_image}>
                                            <div>
                                                <figure>
                                                    <Image 
                                                        src={bufferImg(data.product.ProductBannerImage.banner_image_data)} 
                                                        alt={data.product.ProductBannerImage.banner_image_name} 
                                                        fill />
                                                </figure>
                                            </div>
                                        </td> : null
                                    }
                                    <td className={styles.cart_data_name}>
                                        <div>
                                            <span onClick={(e) => handleProductName(e, data, router)}>{data.product.product_name}</span>
                                        </div>
                                    </td>
                                    <td className={styles.cart_data_price}>
                                        <p>${data.product.price}</p>
                                    </td>
                                    <td className={styles.cart_data_quantity}>
                                        <div className={styles.cart_input_quantities}>
                                            <input
                                                onChange={(e) => handleInput(e, data, updateQuantity, dispatch)}
                                                className={[styles.cart_data_quantity_input, styles.input_heights].join(" ")} 
                                                pattern="[0-9]" 
                                                value={data.quantity} />
                                            <div className={styles.cart_data_quantity_button_wrapper}>
                                                <button 
                                                    className={styles.button_heights}
                                                    onClick={(e) => handlePlus(e, data, updateQuantity, dispatch)}>+</button>
                                                <button 
                                                    className={styles.button_heights}
                                                    onClick={(e) => handleMinus(e, data, updateQuantity, "cart", cartList, removeCartItemThunk, setFireOnce, dispatch)}>-</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.cart_data_subtotal}>
                                        <div>
                                            <p>${(data.product.price * data.quantity).toFixed(2)}</p>
                                            <button 
                                                onClick={(e) => handleRemove(e, data, cartList, setFireOnce, removeCartItemThunk, dispatch, tableRef, index, root, windowWidth)}
                                                className={styles.cart_cancel}><span>X</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div> : null}
            { cartList.length > 0 ? <SubTotal tableRef={tableRef.current} cartList={cartList} /> : null }
        </section>
        </>
    )
}

export default CartPage;