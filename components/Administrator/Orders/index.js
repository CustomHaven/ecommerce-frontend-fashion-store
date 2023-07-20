import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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


const AdminOrders = () => {
    const dispatch = useDispatch();

    const allOrders = useSelector(selectAllOrders);
    const pageListing = useSelector(selectPageListingController);
    const slideNumber = useSelector(selectSlideMultiplier);

    const slidesRef = useRef(null);

    console.log({allOrders})

    useEffect(() => {
        dispatch(retrieveAllOrderThunk());
    }, []);

    useEffect(() => {
        dispatch(storePageListingArray(directionSequence(allOrders.length, pageListing, 1)));
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


            <AdminTable 
                header={["Order", "Date", "Customer", "Fullfilment Status", "Tracking ID", "Total"]}
                tableData={allOrders}
                pageListing={pageListing}
                slideNumber={slideNumber}
                pageType={"Order"}
            />

            </article>

            <div className={"admin_directions_and_submit_button"}>
                <Directions 
                    max={allOrders.length}
                    pageListing={pageListing}
                    slideNumber={slideNumber}

                    option={1}
                    slidesRef={slidesRef}
                    products={allOrders}
                />
                <button>New Order</button>
            </div>
        </section>
    )
}

export default AdminOrders;