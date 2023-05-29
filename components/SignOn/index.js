import Image from "next/image";
import GainAccess from "./GainAccess";
import styles from "../../styles/SignOn.module.css";


// Can't say Sign in or Sign Up as this page renders either sign in or sign up based on what path extension the client is in
const SignOn = (props) => {

    return (
        <>
            <section data-white className={styles.sign_on_section}>
                <div style={{ backgroundImage: `url(${props.theBackgroundImage})` }} className={styles.blur_background}></div>
                <article className={styles.sign_on_article}>
                    <div className={styles.sign_on_image_container}>
                        <figure>
                            <Image 
                                className={styles.curved_image}
                                fill src={props.theBannerImage} alt={props.bannerALT}
                            />
                        </figure>
                    </div>

                    <div className={styles.sign_on_content_container}>
                        <GainAccess
                            header={props.header}
                            styles={styles}
                            pageType={props.pageType}
                        />
                    </div>
                </article>
            </section>
        </>
    )
}

export default SignOn