import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/ShopCategory.module.css";

const ShopCategory = () => {

    return (
        <section className={styles.shop_category_section}>
            <h2>Shop</h2>
            <div>
                <div>
                    <Link href="/shop/men" className={styles.shop_category_link}>
                        <div className={styles.shop_img_container}>
                            <Image src="/assets/man_standing_LED.jpg" fill contain="true" alt="men's shopping" />
                        </div>
                    </Link>
                    <Link href="/shop/men" className={styles.shop_category_link}>
                        <h3>Men's</h3>
                    </Link>
                </div>
                <div>
                    <Link href="/shop/women" className={styles.shop_category_link} >
                        <div className={styles.shop_img_container}>
                            <Image src="/assets/woman-touching-hair.jpg" fill contain="true" alt="women's shopping" />  
                        </div>
                        {/* <Image src="woman-touching-hair.jpg" width={410} height={249} alt="women's shopping"/> */}
                    </Link>  
                    <Link href="/shop/women" className={styles.shop_category_link}>

                        <h3>Women's</h3>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ShopCategory;