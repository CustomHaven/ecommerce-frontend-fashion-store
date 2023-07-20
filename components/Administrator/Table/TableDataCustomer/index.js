import RowCheckbox from "../RowCheckbox";
import { capitalizeWords } from "../../../../utils/generalUtils";

const TableDataCustomers = (props) => {
    return (
        <tr className={props.styles.data_rows}>

            {
                !props.media &&
                    <RowCheckbox styles={props.styles} />
            }

            <td className={[props.styles.td, props.styles.logo_color].join(" ")}>
                {props.data.id} <hr style={{ width: "100%" }}/>
            </td>
            <td className={[props.styles.td, props.styles.gray].join(" ")}>
                {props.data.names ? capitalizeWords(props.data.names.first_name) + " " + capitalizeWords(props.data.names.last_name) : "Not Available"} <hr style={{ width: "100%" }}/>
            </td>

            <td className={[props.styles.td, parseInt(props.data.totalOrders) > 0 ? props.styles.green : props.styles.red].join(" ")}>
                {parseInt(props.data.totalOrders) === 1 ? props.data.totalOrders + " Order" : props.data.totalOrders + " Orders"} 
                <hr style={{ width: "100%" }}/>
            </td>


            <td className={[props.styles.td, props.data.email_campaign ? props.styles.green : props.styles.red].join(" ")}>
                {props.data.email_campaign ? "Yes" : "No"} <hr style={{ width: "100%" }}/>
            </td>


            <td className={[props.styles.td, props.data.totalSpent ? props.styles.green : props.styles.red].join(" ")}>
                {props.data.totalSpent ? "$ " + props.data.totalSpent : "0"} 
                <hr style={{ width: "100%" }}/>
            </td>

        </tr>
    )
}

export default TableDataCustomers;