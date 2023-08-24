import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedis from "../../../hooks/useRedis";
import { retrieveAllOrderThunk, selectAllOrders } from "../../../feature/orderSlice/orderSlice";
import SubHeaderNav from "../SubHeaderNav";
import Directions from "../Directions";
import AdminTable from "../Table";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { controlOptionMenu,
    storePageListingArray,
    selectPageListingController,
    selectSlideMultiplier } from "../../../feature/generalComponents/generalComponentSlice";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/Orders/Orders.module.css";


const AdminOrders = (props) => {
    const { allOrders } = props;
    const dispatch = useDispatch();
    const allTheOrders = useSelector(selectAllOrders);

    // const allOrders = useSelector(selectAllOrders);
    const pageListing = useSelector(selectPageListingController);
    const slideNumber = useSelector(selectSlideMultiplier);

    useEffect(() => {
        dispatch(retrieveAllOrderThunk( { refreshed_token: props.refT } ));
    }, []);

    const slidesRef = useRef(null);
    const arrayObjects = [{ keyStr: "all_orders", usingKey: allTheOrders }, { noKey: "empty", evaluationKey: props.allOrders }];
    const [ redisState ] = useRedis(arrayObjects, props.allOrders, allTheOrders, true);

    useEffect(() => {
        if (redisState) {
            props.setAllOrders(redisState);
        }
    }, [redisState]);

    useEffect(() => {
        if (!props.allOrders && allTheOrders.length > 0) {
            props.setAllOrders(allTheOrders);
        }
    }, [allTheOrders]);



    useEffect(() => {
        if (allOrders) {
            if (allOrders.length > 0) {
                dispatch(storePageListingArray(directionSequence(allOrders.length, pageListing, 1)));
            }
        }
    }, [allOrders]);
    

    return (
        <section className={[styles.admin_many_pages_main_section, "unselectable"].join(" ")}>
            <header className={styles.admin_many_pages_header}>
                <h1>Orders</h1>
                <SubHeaderNav />
            </header>

            <article onClick={() => dispatch(controlOptionMenu(false))} className={styles.admin_orders_content}>
                <ul className={styles.a}>
                    <li><p className={styles.underline}>All Orders</p></li>
                    <li><p className={""}>Fulfilled</p></li>
                    <li><p className={""}>Abandonded Carts</p></li>
                    <li><p className={""}>Risky</p></li>
                </ul>

                <div className={styles.admin_filter_search}>
                    <div>
                        <p className={styles.filter_order}>Filter Orders</p>
                        <IoIosArrowDown />
                    </div>

                    <div>
                        <div>
                            <BiSearchAlt />
                        </div>
                        <input type="text" placeholder="Search by typing the Order ID Number" />
                    </div>
                </div>


            {
                allOrders &&
                    <AdminTable 
                        header={["Order", "Date", "Customer", "Fullfilment Status", "Tracking ID", "Total"]}
                        tableData={allOrders}
                        pageListing={pageListing}
                        slideNumber={slideNumber}
                        pageType={"Order"}
                    />
            }

            </article>

            <div className={"admin_directions_and_submit_button"}>
                {
                    allOrders &&
                        <Directions 
                            max={allOrders.length}
                            pageListing={pageListing}
                            slideNumber={slideNumber}

                            option={1}
                            slidesRef={slidesRef}
                            products={allOrders}
                        />
                }
                <button>New Order</button>
            </div>
        </section>
    )
}

export default AdminOrders;