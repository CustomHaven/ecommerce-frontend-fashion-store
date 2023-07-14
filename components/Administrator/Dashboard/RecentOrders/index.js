import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { SlRefresh } from "react-icons/sl";
import { selectAllOrders } from "../../../../feature/orderSlice/orderSlice";
import { bufferImg } from "../../../../utils/generalUtils";
import styles from "../../../../styles/Administrator/Dashboard/RecentOrder.module.css";

const RecentOrders = (props) => {
    const allOrders = useSelector(selectAllOrders);
    const [sortedDates, setSortedDates] = useState([]);
    const [randoms, setRandoms] = useState([]);

    useEffect(() => {
        if (allOrders) {
            // const copyArray = [].concat(allOrders);
            // setSortedDates(copyArray.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
            setSortedDates([...allOrders].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
        }
    }, [allOrders]);

    useEffect(() => {
        const tempRandoms = [];
        sortedDates.slice(0, 5).forEach(order => order.OrderLists.forEach(((cartItem, idx, array) => {
            tempRandoms.push(Math.floor(Math.random() * array.length));
        })))
        
        setRandoms(tempRandoms.splice(0, 8));
    }, [allOrders]);

    return (
        <div className={styles.recent_order_outer_content}>
            <div className={styles.recent_order_inner_content}>
                <div className={styles.recent_order_header}>
                    <h4>Recent Orders</h4>
                    <SlRefresh />
                </div>
                <div className={styles.recent_order_content}>
                    {
                        sortedDates.slice(0, 5).map((order, idx) => {
                            return (
                                <div>
                                    <div className={styles.recent_order_image_container}>
                                        <Image 
                                            fill 
                                            src={order.OrderLists[randoms[idx]]?.Product.ProductBannerImage.banner_image_data ? bufferImg(order.OrderLists[randoms[idx]]?.Product.ProductBannerImage.banner_image_data) : ""} 
                                            alt={order.OrderLists[randoms[idx]]?.Product.product_name}
                                        />
                                    </div>
                                    <p>{order.OrderLists[randoms[idx]]?.Product.product_name}</p>
                                    <p>{order.created_at.replace(/[A-Z].+$/, "").replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentOrders;