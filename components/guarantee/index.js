import Image from "next/image";
import styles from "../../styles/Guarantee.module.css";

const Guarantee = () => {

    return (
        <>
            <article className={styles.article_guarantee}>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Beep-Beep-Fast-Delivery.png" fill contain="true" alt="fast-delivery" />
                        {/* <Image src="Beep-Beep-Fast-Delivery.png" width={172} height={131} className={styles.guarantee_img} /> */}
                    </figure>
                    <p>Free Shipping</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/The-Little-Things-Business-Planning.png" fill contain="true" alt="buy-simple" />
                    </figure>
                    <p>Online Order</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Wavy-Buddies-Dollar.png" fill contain="true" alt="save-your-money" />
                    </figure>
                    <p>Save Money</p>
                </div>
                <div>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Lifesavers-Videocall.png" fill contain="true" alt="24/7 support" />
                    </figure>
                    <p>24/7 Support</p>
                </div>
            </article>
        </>
    )
}

export default Guarantee;