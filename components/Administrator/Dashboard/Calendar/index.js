import { useState } from "react";
import { Calendar as CalendarPackage } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "../../../../styles/Administrator/Calendar.module.css";

const Calendar = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className={styles.calendar}>
            <CalendarPackage onChange={onChange} value={value} />
        </div>
    );
}

export default Calendar;