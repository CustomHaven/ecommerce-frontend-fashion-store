import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubHeaderNav from "../SubHeaderNav";
import Directions from "../Directions";
import AdminTable from "../Table";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { controlOptionMenu,
    storePageListingArray,
    selectPageListingController,
    selectSlideMultiplier } from "../../../feature/generalComponents/generalComponentSlice";
import { allUsersOrdersThunk, selectUsersOrders } from "../../../feature/userSlice/userSlice";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/Orders/Orders.module.css";

const AdminCustomers = () => {
    const dispatch = useDispatch();

    const allUsersOrders = useSelector(selectUsersOrders);
    const pageListing = useSelector(selectPageListingController);
    const slideNumber = useSelector(selectSlideMultiplier);

    const slidesRef = useRef(null);

    console.log({allUsersOrders})

    useEffect(() => {
        dispatch(allUsersOrdersThunk());
    }, []);

    useEffect(() => {
        dispatch(storePageListingArray(directionSequence(allUsersOrders.length, pageListing, 1)));
    }, [allUsersOrders]);

    return (
        <section className={styles.admin_many_pages_main_section}>
            <header className={styles.admin_many_pages_header}>
                <h1>Customers</h1>
                <SubHeaderNav />
            </header>

            <article onClick={() => dispatch(controlOptionMenu(false))} className={styles.admin_orders_content}>
                <ul className={styles.a}>
                    <li><p className={styles.underline}>All</p></li>
                    <li><p className={""}>New</p></li>
                    <li><p className={""}>Returning</p></li>
                    {/* <li><p className={""}>Abandonded Checkout</p></li> */}
                    <li><p className={""}>Email Subscribers</p></li>
                </ul>

                <div className={styles.admin_filter_search}>
                    <div>
                        <p className={styles.filter_order}>Filter Customers</p>
                        <IoIosArrowDown />
                    </div>

                    <div>
                        <div>
                            <BiSearchAlt />
                        </div>
                        <input type="text" placeholder="Search by typing Customer Name or ID Number" />
                    </div>
                </div>


            <AdminTable 
                header={["Customer ID", "Customer", "Total Orders", "Email Subscriber", "Spent"]}
                tableData={allUsersOrders}
                pageListing={pageListing}
                slideNumber={slideNumber}
                pageType={"Customers"}
            />

            </article>

            <div className={"admin_directions_and_submit_button"}>
                <Directions 
                    max={allUsersOrders.length}
                    pageListing={pageListing}
                    slideNumber={slideNumber}

                    option={1}
                    slidesRef={slidesRef}
                    products={allUsersOrders}
                />
                <button>New Customer</button>
            </div>
        </section>
    )
}

export default AdminCustomers;