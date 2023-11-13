import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedis from "../../../hooks/useRedis";
import SlideShow from "./SlideShow";
import BarChart from "./BarChart";
import RecentOrders from "./RecentOrders";
import Calendar from "./Calendar";
import BestSeller from "./BestSeller";
import { retrieveAllOrderThunk, selectAllOrders } from "../../../feature/orderSlice/orderSlice";
import styles from "../../../styles/Administrator/Dashboard/AdminDashboard.module.css";

const AdminDashboard = (props) => {

    const dispatch = useDispatch();
    const allTheOrders = useSelector(selectAllOrders);

    const arrayObjects = [ { keyStr: "all_orders", usingKey: allTheOrders }, { noKey: "empty", evaluationKey: props.allOrders } ];

    useEffect(() => {
        dispatch(retrieveAllOrderThunk( { refreshed_token: props.refT } ));
    }, []);

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
                    {
                        props.allOrders &&
                            <BarChart 
                                allOrders={props.allOrders}
                            />
                    }
                </article>
                <article className={styles.recent_orders}>
                    {
                        props.allOrders &&
                            <RecentOrders 
                                allOrders={props.allOrders}
                                setAllOrders={props.setAllOrders}
                                refT={props.refT}
                            />
                    }
                </article>
                <article className={styles.calendar}>
                    <Calendar />
                </article>
                <article className={styles.best_sellers}>
                    <BestSeller 
                        bestSellers={props.bestSellers}
                        setBestSellers={props.setBestSellers}
                    />
                </article>
            </section>
        </section>
    )
}

export default AdminDashboard;