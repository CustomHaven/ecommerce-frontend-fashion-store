import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useResizeObserver from "../../../hooks/useResizeObserver";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { selectCart, selectTempCart, findCartThunk, updateCartItemThunk, removeTheTempCart } from "../../../feature/cartSlice/cartSlice";
import styles from "../../../styles/cartpage/SubTotal.module.css";

const SubTotal = (props) => {
    const root = useQuerySelector(":root");
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const tempCart = useSelector(selectTempCart);
    const { windowWidth } = useWindowDimensions();
    const [inputRange, setInputRange] = useState(0);
    const [money, setMoney] = useState(0);
    const subtotalRef = useRef(null);
    const ctaRef = useRef(null);

    console.log("cart SELECTOR", cart);

    const tableSize = useResizeObserver(props.tableRef, "#table-container");
    const subtotalDivSize = useResizeObserver(subtotalRef.current, "#subtotal-inner-div");
    const ctaSize = useResizeObserver(ctaRef.current, "#cta-container");

    let moneySum = 0;

    props.cartList.forEach(item => {
        moneySum += item.quantity * item.product.price;
    });

    const handleProceed = () => {
        dispatch(findCartThunk({ cartId: cart.id }));
    }

    useEffect(() => {
        if (moneySum > 0) {
            setMoney(moneySum);
            if (moneySum >= 100) {
                root.current.style.setProperty("--range-o-meter", "var(--range-o-meter-good)");
                setInputRange(100);
            } else {
                root.current.style.setProperty("--range-o-meter", "var(--range-o-meter-bad)");
                setInputRange(moneySum);
            }
        }
    }, [moneySum]);

    useEffect(() => {
        if (tempCart.id) {

            tempCart.CartLists.forEach(tempCartItem => {
                cart.cartList.forEach(cartItem => {
                    if (cartItem.cartItemId === tempCartItem.id) {
                        if (cartItem.quantity !== tempCartItem.quantity) {
                            dispatch(updateCartItemThunk({ cartItemId: tempCartItem.id, quantity: cartItem.quantity }));
                        }
                    }
                });
            });
            dispatch(removeTheTempCart({}));
        }
    }, [tempCart]);

    return (
        <aside style={{ height: subtotalDivSize.blockSize, margin: "25px 0" }} className={styles.aside_subtotal_container}>
            <div ref={subtotalRef} style={{width: windowWidth > 700 ? tableSize.inlineSize / 4 : tableSize.inlineSize / 2}}>
                <div className={styles.free_shipping_container}>
                    {
                        inputRange < 100 ?

                    <p style={{fontWeight: 600}}><span style={{fontWeight: "900 !important"}}>$ {Math.round(100 - inputRange)}</span> away from <span>FREE SHIPPING!</span> <div className={styles.italic_i}><span>i</span></div></p>
                    
                    :<p>You may qualify for <span>FREE SHIPPING!</span> <div className={styles.italic_i}><span>i</span></div></p>
                    }
                    <input className={styles.input_range} type="range" value={inputRange} max={100} />
                </div>



                <div className={styles.subtotal_prices}>
                    <h3><span>Subtotal:</span> <span>${money.toFixed(2)}</span></h3>
                    <h3><span>Grand total:</span> <span>${money.toFixed(2)}</span></h3>
                </div>

                <div style={{ height: ctaSize.blockSize, margin: "50px 0" }} className={styles.subtotal_cta_container}>
                    <div id="cta-container" ref={ctaRef} className={styles.subtotal_cta}>
                        <Link href="/checkouts">
                            <button onClick={handleProceed} className={styles.subtotal_cta_buttons}>
                                <p>Proceed to checkout</p>
                            </button>
                        </Link>
                        <p>Or</p>
                        <Link href="/products/all">
                            <button className={styles.subtotal_cta_buttons}>
                                <p>Continue Shopping</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SubTotal;