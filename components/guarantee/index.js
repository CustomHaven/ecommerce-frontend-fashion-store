import Image from "next/image";
import styles from "../../styles/Guarantee.module.css";

const Guarantee = () => {

    return (
        <>
            <article className={styles.article_guarantee}>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Beep-Beep-Fast-Delivery.png" width={172} height={131} className={styles.guarantee_img} />
                    </figure>
                    <p>Free Shipping</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/The-Little-Things-Business-Planning.png" width={172} height={131} className={styles.guarantee_img} />
                    </figure>
                    <p>Online Order</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Wavy-Buddies-Dollar.png" width={172} height={131} className={styles.guarantee_img} />
                    </figure>
                    <p>Save Money</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Lifesavers-Videocall.png" width={172} height={131} className={styles.guarantee_img} />
                    </figure>
                    <p>24/7 Support</p>
                </div>
            </article>
        </>
    )
}

export default Guarantee;