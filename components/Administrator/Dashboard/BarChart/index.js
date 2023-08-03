import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { options, monthLabels, weekdayLabels } from "../../../../utils/barChartHelper";
import { selectAllOrders } from "../../../../feature/orderSlice/orderSlice";
import styles from "../../../../styles/Administrator/Dashboard/BarChart.module.css";

const BarChart = (props) => {
    const { allOrders } = props;
    const [chart, setChart] = useState({
        labels: monthLabels,
        datasets: []
    });
    const [clientOption, setClientOption] = useState("Month");
    const weekRef = useRef(null);
    const monthRef = useRef(null);
    // const allOrders = useSelector(selectAllOrders);
    

    const totalSales = (inputType) => {

        if (inputType === "Week") {
            return weekdayLabels.map(day => {
                const theWeekdayTotal = allOrders.map((order) => {
                    const purchaseDate = order.created_at.replace(/[a-zA-Z].+$/, "");

                    if (day === new Date(purchaseDate).toLocaleString("en-UK", { weekday: "long" } )) {
                        return parseFloat(order.final_price);
                    } else {
                        return 0;
                    }

                });

                return parseFloat(theWeekdayTotal.reduce((acc, curr) => acc + curr, 0).toFixed(2));
            });

        } else {
            return monthLabels.map((month) => {
                const theMonthTotal = allOrders.map((order) => {
                    const purchaseDate = order.created_at.replace(/[a-zA-Z].+$/, "");
    
                    if (month === new Date(purchaseDate).toLocaleString("en-UK", { month: "long" } )) {
                        return parseFloat(order.final_price);
                    } else {
                        return 0;
                    }
    
                });
    
                return parseFloat(theMonthTotal.reduce((acc, curr) => acc + curr, 0).toFixed(2));
            })
        }
    };


    const handleWeek = () => {
        setClientOption("Week");
        totalSales("Week");
        weekRef.current.classList.add(styles.chart_selected_option);
        monthRef.current.classList.remove(styles.chart_selected_option);
    }

    const handleMonth = () => {
        setClientOption("Month");
        totalSales("Month");
        monthRef.current.classList.add(styles.chart_selected_option);
        weekRef.current.classList.remove(styles.chart_selected_option);
    }

    useEffect(() => {
        monthRef.current.classList.add(styles.chart_selected_option);
    }, []);

    useEffect(() => {
        setChart(pre => ({
            labels: clientOption === "Month" ? monthLabels : weekdayLabels,
            datasets: [
                {
                    label: clientOption === "Month" ? "Monthly Sales ($)" : "Weekly Sales ($)",
                    data: totalSales(clientOption),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    borderWidth: 2
                }
            ]
        }));
    }, [clientOption]);

    return (
        <div className={styles.chart_inner_container}>
            <div className={styles.chart_option_element}>
                <h4 ref={weekRef} onClick={handleWeek}>Weekly</h4>
                <h4 ref={monthRef} onClick={handleMonth}>Monthly</h4>
            </div>
            <Bar options={options} data={chart} />;
        </div> 
    )
}

export default BarChart;