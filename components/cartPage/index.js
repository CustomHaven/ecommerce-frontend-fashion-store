import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Cart.module.css";

const CartPage = (props) => {
    console.log(props.randomProducts);
    const img = "https://images.unsplash.com/photo-1601762603339-fd61e28b698a";
    const ArrayData = new Array(3).fill({
        id: 0,
        img,
        name: "prison jumper",
        price: 39.99,
        quantity: 1,
    }).map((a, i) => ({...a, id: i+1}));


    const changleInputValues = (e, arrayOld, data) => {
        const newArray = [...arrayOld];

        const foundIndex = newArray.findIndex((item) => {
            if (item.id === data.id) {
                return item;
            }
        });

        newArray[foundIndex].quantity = e.target.value;
        const firstPart = newArray.slice(0, foundIndex);
        const secondPart = newArray.slice(foundIndex + 1, newArray.length);
        return [].concat(firstPart).concat(newArray[foundIndex]).concat(secondPart);
    }


    const [arrayDummy, setArrayDummy] = useState(ArrayData);


    const handleInput = (e, data) => {
        const reg = new RegExp(/^\d*$/)
        if (!reg.test(e.target.value)) {
            return;
        }

        const array = changleInputValues(e, arrayDummy, data);
        setArrayDummy(array);
    }


    return (
        <>
        <section data-white className={styles.cart_section}>
            <h1>Cart</h1>
            <div data-cartContent>
                <table className={styles.cart_table} >
                    <thead className={styles.cart_table_header}>
                        <tr className={[styles.tr_data, styles.tr_data_upper].join(" ")}>
                            <th colSpan={2} className={styles.cart_header_items}>Cart Items</th>
                            <th className={styles.cart_header_price}>Price</th>
                            <th className={styles.cart_header_quantity}>Quantity</th>
                            <th className={styles.cart_header_subtotal}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className={styles.cart_table_body}>
                        {
                            // LOOK HERE!! CHANGE DUMMY TO REAL VALUES!


                            arrayDummy.map((data, index, array) => 
                                <tr key={data.id} className={[styles.tr_data, array[index] === arrayDummy[array.length -1] && styles.tr_data_lower].join(" ")}>
                                    <td className={styles.cart_data_image}>
                                        <div>
                                            <figure>
                                                <Image src={data.img} fill />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className={styles.cart_data_name}>
                                        <div>
                                            <p>{data.name}</p>
                                        </div>
                                    </td>
                                    <td className={styles.cart_data_price}>
                                        <p>${data.price}</p>
                                    </td>
                                    <td className={styles.cart_data_quantity}>
                                        <div>
                                            <input
                                                onChange={(e) => handleInput(e, data)}
                                                className={styles.cart_data_quantity_input} 
                                                pattern="[0-9]" 
                                                value={data.quantity} />
                                            <div className={styles.cart_data_quantity_button_wrapper}>
                                                <button>+</button>
                                                <button>-</button>
                                            </div>
                                        </div>
                                        {/* {data.quantity} */}
                                    </td>
                                    <td className={styles.cart_data_subtotal}>
                                        <div>
                                            <p>${data.price * data.quantity}</p>
                                            <p className={styles.cart_cancel}>X</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            
        </section>
        {/* <img src={img} style={{width: "100%", height: "100%", position: "absolute", top: "0", bottom: "0", zIndex: "10000"}}/> */}
        </>
    )
}

export default CartPage;

// https://dibruno.com/cart.php