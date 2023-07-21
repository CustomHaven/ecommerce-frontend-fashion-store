import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBestSeller, retrieveBestSellers } from "../../../../feature/orderSlice/orderSlice";
import { selectPageListingController,
    selectSlideMultiplier,
    storePageListingArray } from "../../../../feature/generalComponents/generalComponentSlice";
import { directionSequence } from "../../../../utils/generalUtils";
import Directions from "../../Directions"
import styles from "../../../../styles/Administrator/Dashboard/BestSeller.module.css";

const BestSeller = () => {

    const pageListing = useSelector(selectPageListingController);
    const slideNumber = useSelector(selectSlideMultiplier);

    const dispatch = useDispatch();
    const frequentOrders = useSelector(selectBestSeller);

    useEffect(() => {
        dispatch(retrieveBestSellers());
    }, []);

    useEffect(() => {
        dispatch(storePageListingArray(directionSequence(frequentOrders.length, pageListing, 1)));
    }, [frequentOrders]);

    return (
        <div className={styles.best_seller_outer_container}>
            <div className={styles.best_seller_inner_container}>
                <h4>Best Sellers</h4>
                <div>
                    <table className={styles.best_seller_table}>
                        <thead className={styles.best_seller_table_header}>
                            <tr>
                                <th>Name</th>
                                <th>Sales</th>
                            </tr>
                        </thead>
                        <tbody data-dummy="dummy_body_to_help_make_a_space_between_the_header_and_body">
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody className={styles.best_seller_table_body}>
                            {
                                frequentOrders.slice(pageListing * (slideNumber - 1), pageListing * slideNumber).map((order) =>
                                        <tr>
                                            <td>{order.Product_Name}</td>
                                            <td>{order.Sales}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Directions 
                    max={frequentOrders.length}
                    pageListing={pageListing}
                    slideNumber={slideNumber}
                    option={1}
                />
            </div>
        </div>
    )
}

export default BestSeller;