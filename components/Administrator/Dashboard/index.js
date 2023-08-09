import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SlideShow from "./SlideShow";
import BarChart from "./BarChart";
import RecentOrders from "./RecentOrders";
import Calendar from "./Calendar";
import BestSeller from "./BestSeller";
import { retrieveAllOrderThunk } from "../../../feature/orderSlice/orderSlice";
import styles from "../../../styles/Administrator/Dashboard/AdminDashboard.module.css";

const AdminDashboard = (props) => {

    const dispatch = useDispatch();

    console.log("refT", props.refT);

    useEffect(() => {
        dispatch(retrieveAllOrderThunk( { refreshed_token: props.refT } ));
    }, []);

    return (
        <section className={[styles.dashboard_main_section, "unselectable"].join(" ")}>
            <header className={styles.dashboard_header}>
                <h1>Dashboard</h1>
            </header>
            <section className={styles.dashboard_section_container}>
                <article className={styles.slideshow_container}>
                    <SlideShow
                        // styles={styles}
                    />
                </article>
                <article className={styles.sales_graph}>
                    <BarChart 
                        allOrders={props.allOrders}
                    />
                </article>
                <article className={styles.recent_orders}>
                    <RecentOrders 
                        allOrders={props.allOrders}
                    />
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