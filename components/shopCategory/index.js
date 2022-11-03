import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/ShopCategory.module.css";

const ShopCategory = () => {
    return (
        <section className={styles.shop_category_section}>
            <h2>Shop</h2>
            <div>
                <Link href="/shop/men" className={styles.shop_category_link}>
                    <Image src="/assets/man_standing_LED.jpg" width={410} height={249} className={styles.shop_category_img} alt="men's shopping" />
                    <h3>Men's</h3>
                </Link>
                <Link href="/shop/women" className={styles.shop_category_link}>
                    <Image src="/assets/woman-touching-hair.jpg" width={410} height={249} className={styles.shop_category_img} alt="women's shopping"/>
                    <h3>Women's</h3>
                </Link>
            </div>
        </section>
    );
};

export default ShopCategory;