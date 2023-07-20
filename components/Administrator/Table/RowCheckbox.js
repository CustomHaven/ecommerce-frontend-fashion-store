const RowCheckbox = (props) => {
    return (
        <td className={props.styles.td}>
            <div className={props.styles.admin_checks_container}>
                <label className={props.styles.admin_checkbox_styling}>
                    <input type="checkbox" />
                    <span className={props.styles.admin_checkmark}></span>
                </label>
            </div>
        </td>
    )
}

export default RowCheckbox;