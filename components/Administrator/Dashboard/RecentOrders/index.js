import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { SlRefresh } from "react-icons/sl";
import { selectAllOrders, retrieveAllOrderThunk } from "../../../../feature/orderSlice/orderSlice";
import { bufferImg } from "../../../../utils/generalUtils";
import styles from "../../../../styles/Administrator/Dashboard/RecentOrder.module.css";

const RecentOrders = (props) => {
    const { allOrders } = props;
    const dispatch = useDispatch();
    const allTheOrders = useSelector(selectAllOrders);
    const [tempUpdate, setTempUpdate] = useState(0);
    // const allOrders = useSelector(selectAllOrders);
    const [sortedDates, setSortedDates] = useState([]);
    const [randoms, setRandoms] = useState([]);

    const handleRefresh = () => {
        dispatch(retrieveAllOrderThunk( { refreshed_token: props.refT } ));
        setTimeout(() => {
            setTempUpdate(tempUpdate + 1);
        }, 1500);
    }

    useEffect(() => {
        if (tempUpdate) {
            props.setAllOrders(allTheOrders);
        }
    }, [tempUpdate])

    useEffect(() => {
        if (allOrders) {
            if (allOrders.length > 0) {
                // const copyArray = [].concat(allOrders);
                // setSortedDates(copyArray.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
                setSortedDates([...allOrders].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
            }
        }
    }, []);

    useEffect(() => {
        if (allOrders) {
            if (allOrders.length > 0) {
                const tempRandoms = [];
                sortedDates.slice(0, 5).forEach(order => order.OrderLists.forEach(((cartItem, idx, array) => {
                    tempRandoms.push(Math.floor(Math.random() * array.length));
                })))
                
                setRandoms(tempRandoms.splice(0, 8));
            }
        }
    }, [allOrders]);

    return (
        <div className={styles.recent_order_outer_content}>
            <div className={styles.recent_order_inner_content}>
                <div className={styles.recent_order_header}>
                    <h4>Recent Orders</h4>
                    <SlRefresh 
                        onClick={handleRefresh}
                    />
                </div>
                <div className={styles.recent_order_content}>
                    {
                        sortedDates.length > 0 &&
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
                                    <p>{order.updated_at.replace(/[A-Z].+$/, "").replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</p>
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