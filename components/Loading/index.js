import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "../../styles/Loader.module.css";

const Loading = (props) => {
    if (props.loading === false) {
        return;
    }

    const { windowWidth } = useWindowDimensions();

    let width;
    if (windowWidth >= 1200) {
        console.log("windowWidth is more than 1.2k", windowWidth);
        width = "100%";
    } else if (windowWidth > 1000 && windowWidth < 1200) {
        console.log("windowWidth is between 1k and 1.2k", windowWidth);
        width = windowWidth;
    } else if (windowWidth <= 1000 && windowWidth > 600 ){
        console.log("windowWidth is less than 1k", windowWidth);
        width = props.sectionWidth.current.clientWidth;
    } else {
        width = windowWidth;
    }

    let size;
    if (windowWidth >= 1001) {
        size = 50;
    } else if (windowWidth <= 1000 && windowWidth > 900) {
        size = 40;
    } else if (windowWidth <= 900 && windowWidth > 700) {
        size = 30;
    } else if (windowWidth <= 700 && windowWidth > 500) {
        size = 20;
    } else {
        size = 10;
    }

    return (
        <div 
            className={styles.overlay} 
            style={{ 
                width: width,
                height: "100%"
            }}>
            <div className={styles.loading_container}>
                <ClimbingBoxLoader
                    loading={props.loading}
                    size={size}
                    color={"#65BAF7"}
                    aria-label="Climbing Box Loader"
                    data-loader="loader"
                />
                <p className={styles.text}>Loading...</p>
            </div>
        </div>
    )
}

export default Loading;