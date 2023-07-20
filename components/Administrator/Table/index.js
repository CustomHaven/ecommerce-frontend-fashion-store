import { IoIosArrowDown } from "react-icons/io";
import useMediaQuery from "../../../hooks/useMediaQuery";
import TableDataOrder from "./TableDataOrder";
import TableDataCustomers from "./TableDataCustomer";
import { capitalizeWords } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/AdminTable.module.css";

const AdminTable = (props) => {

    const { media } = useMediaQuery(1100);

    return (
        <table className={[styles.admin_table, "unselectable"].join(" ")}>
            <thead>
                <tr>
                    {
                        !media &&
                            <th>
                                <div className={styles.admin_table_checkbox_container_outer}>
                                    <div className={styles.admin_table_checkbox_container_inner}>
                                        <label className={styles.admin_checkbox_styling}>
                                            <input type="checkbox" />
                                            <span className={styles.admin_checkmark}></span>
                                        </label>
                                        {/* <input type="checkbox" /> */}
                                        <IoIosArrowDown />
                                    </div>
                                </div>
                            </th>
                    }
                    {
                        props.header.map(val => (
                                <th>
                                    {val}
                                    <hr style={{ width: "100%" }}/>
                                </th>
                            )
                        )
                    }
                </tr>
                </thead>
                <tbody data-dummy="dummy_body_to_help_make_a_space_between_the_header_and_body">
                    <tr style={{height: "30px"}}>
                        <td></td>
                    </tr>
                </tbody>

                <tbody className={styles.admin_table_body}>
                    {
                        props.tableData.slice(props.pageListing * (props.slideNumber - 1), props.pageListing * props.slideNumber).map(data => (
                            props.pageType === "Order" ?
                                <TableDataOrder
                                    media={media}
                                    data={data}
                                    styles={styles}
                                /> :
                                <TableDataCustomers
                                    media={media}
                                    data={data}
                                    styles={styles}
                                />
                                
                        ))
                    }
                </tbody>

        </table>
    )
}

export default AdminTable;