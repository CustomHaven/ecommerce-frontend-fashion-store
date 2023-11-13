import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRedis from "../../../../hooks/useRedis";
import { selectBestSeller, retrieveBestSellers } from "../../../../feature/orderSlice/orderSlice";
import { selectPageListingController,
    selectSlideMultiplier,
    storePageListingArray } from "../../../../feature/generalComponents/generalComponentSlice";
import { directionSequence } from "../../../../utils/generalUtils";
import Directions from "../../Directions"
import styles from "../../../../styles/Administrator/Dashboard/BestSeller.module.css";

const BestSeller = (props) => {

    const pageListing = useSelector(selectPageListingController);
    const slideNumber = useSelector(selectSlideMultiplier);

    const dispatch = useDispatch();
    const frequentOrders = useSelector(selectBestSeller);

    useEffect(() => {
        dispatch(retrieveBestSellers());
    }, []);

    useEffect(() => {
        if (!props.BestSellers && frequentOrders.length > 0) {
            props.setBestSellers(frequentOrders);
        }
    }, [frequentOrders]);

    const arrayObj = [ { keyStr: "best_sellers", usingKey: frequentOrders }, { noKey: "empty", evaluationKey: props.BestSellers } ];
    const [ redisState ] = useRedis(arrayObj, props.BestSeller, frequentOrders, true);

    useEffect(() => {
        if (redisState) {
            props.setBestSellers(redisState);
        }
    }, [redisState]);

    useEffect(() => {
        if (props.bestSellers) {
            if (props.bestSellers.length > 0) {
                dispatch(storePageListingArray(directionSequence(props.bestSellers.length, pageListing, 1)));
            }
        }
    }, [props.bestSellers]);

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
                                props.bestSellers &&
                                props.bestSellers.slice(pageListing * (slideNumber - 1), pageListing * slideNumber).map((order) =>
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
                {
                    props.bestSellers &&
                        <Directions 
                            max={props.bestSellers.length}
                            pageListing={pageListing}
                            slideNumber={slideNumber}
                            option={1}
                        />
                }
            </div>
        </div>
    )
}

export default BestSeller;