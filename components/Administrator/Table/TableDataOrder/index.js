import useMediaQuery from "../../../../hooks/useMediaQuery";
import RowCheckbox from "../RowCheckbox";
import { capitalizeWords } from "../../../../utils/generalUtils";

const TableDataOrder = (props) => {
    console.log("props.data.User.ContactDetails", props.data.User.ContactDetail);
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
                {props.data.updated_at.replace(/-/g, "/").replace(/^(\d+)\/(\d+)\/(\d+)T.+$/, "$3/$2/$1")} <hr style={{ width: "100%" }}/>
            </td>
            <td className={[props.styles.td, props.styles.gray].join(" ")}>
                {capitalizeWords(props.data.User.ContactDetail.first_name) + " " + capitalizeWords(props.data.User.ContactDetail.last_name)} 
                <hr style={{ width: "100%" }}/>
            </td>
            <td className={[props.styles.td, props.data.tracking_id !== "not available" ? props.styles.green : props.styles.red].join(" ")}>
                {props.data.tracking_id !== "not available" ? "Complete" : "Not Complete"} <hr style={{ width: "100%" }}/>
            </td>
            <td className={[props.styles.td, props.data.tracking_id !== "not available" ? props.styles.logo_color : props.styles.red].join(" ")}>
                {props.data.tracking_id !== "not available" ? props.data.tracking_id : capitalizeWords(props.data.tracking_id)} 
                <hr style={{ width: "100%" }}/>
            </td>
            <td className={[props.styles.td, props.styles.green].join(" ")}>
                $ {props.data.final_price} 
                <hr style={{ width: "100%" }}/>
            </td>

        </tr>
    )
}

export default TableDataOrder;