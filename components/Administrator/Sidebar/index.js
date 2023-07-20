import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlinePlusCircle, AiOutlineShop } from "react-icons/ai";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { FiPackage, FiSettings } from "react-icons/fi";
import { TbDiscount2, TbApps } from "react-icons/tb";
import { selectAdminSideIndex } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/Administrator/Sidebar.module.css";

const AdminSidebar = () => {
    const [storeAccordion, setStoreAccordion] = useState(false);
    const sideBarIndex = useSelector(selectAdminSideIndex);

    return (
        <aside id="admin__aside__id" className={[styles.admin__sidebar]. join(" ")}>
            <ul className={styles.admin__sidebar__list}>
                <li className={sideBarIndex === 0 && styles.logo_color}>
                    <Link href="/admin/dashboard">
                        <BiHomeAlt />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className={sideBarIndex === 1 && styles.logo_color}>
                    <Link href="/admin/orders">
                        <FiPackage />
                        <span>Orders</span>
                    </Link>
                </li>
                <li className={sideBarIndex === 2 && styles.logo_color}>
                    <Link href="/admin/products">
                        <BsTags />
                        <span>Products</span>
                    </Link>
                </li>
                <li className={sideBarIndex === 3 && styles.logo_color}>
                    <Link href="/admin/customers">
                        <BiUser />
                        <span>Customers</span>
                    </Link>
                </li>
                <li className={sideBarIndex === 4 && styles.logo_color}>
                    <Link href="/admin/discounts">
                        <TbDiscount2 />
                        <span>Discounts</span>
                    </Link>
                </li>
                <li className={sideBarIndex === 5 && styles.logo_color}>
                    <Link href="/admin/apps">
                        <TbApps />
                        <span>Apps</span>
                    </Link>
                </li>
                <li>
                    <div>
                        <div className={styles.admin__shop__window}>
                            <span>Sales Channels</span>
                            <AiOutlinePlusCircle style={{ cursor: "pointer" }} onClick={() => setStoreAccordion(!storeAccordion)} />
                        </div>
                        {
                            storeAccordion &&
                            <Link href="/" target="_blank" rel="noreferrer noopener" className={styles.admin__shop__window}>
                                <AiOutlineShop />
                                <span>Online Shop</span>
                                <AiOutlineEye />
                            </Link>
                        }
                    </div>
                </li>
            </ul>
            <div className={styles.admin__setting}>
                <FiSettings />
                <span>Settings</span>
            </div>
        </aside>
    )
}

export default AdminSidebar;