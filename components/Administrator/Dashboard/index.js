import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import SlideShow from "./SlideShow";
import BarChart from "./BarChart";
import RecentOrders from "./RecentOrders";
import Calendar from "./Calendar";
import BestSeller from "./BestSeller";
import { retrieveAllOrderThunk } from "../../../feature/orderSlice/orderSlice";
import styles from "../../../styles/Administrator/AdminDashboard.module.css";

const AdminDashboard = (props) => {


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(retrieveAllOrderThunk());
    }, []);

    return (
        <section className={styles.dashboard_main_section}>
            <header className={styles.dashboard_header}>
                <h1>Dashboard</h1>
            </header>
            

            <section className={styles.dashboard_section_container}>


                <div className={styles.slideshow_container}>

                    <SlideShow
                        styles={styles}
                    />
                </div>
                {/* div containing articles of pending orders, completed orders refunds etc slideshow */}

                <article className={styles.sales_graph}>
                    <BarChart />
                </article>
                <article className={styles.recent_orders}>
                    <RecentOrders />
                </article>
                


                <article className={styles.calendar}>
                    <Calendar />
                </article>
                <article className={styles.best_sellers}>
                    <BestSeller />
                </article>


            </section>
        </section>
    )
}

export default AdminDashboard;