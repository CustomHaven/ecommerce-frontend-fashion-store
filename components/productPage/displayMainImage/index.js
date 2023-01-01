import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useResizeObserver from "../../../hooks/useResizeObserver";
import styles from "../../../styles/Product.module.css";
import { bufferImg } from "../../../utils/generalUtils";

const DisplayMainImage = (props) => {
    const { currentImage } = props;
    const [largeImageSelected, setLargeImageSelected] = useState(false);
    const headerRef = useQuerySelector("#header-elm");
    const headerSize = useResizeObserver(headerRef.current, "#header-elem");

    const imgDisplayStyles = [styles.img_on_display, styles.zoom_in].join(" ");
    const localModalStyles = {
        position: "absolute", 
        backgroundColor: "rgba(60, 60, 59, .9)",
        width: "100%", 
        right: 0,
        left: 0, 
        bottom: 0,
        top: 0,
        zIndex: 10,
        marginTop: headerSize.blockSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const innerModalStyle = {
        position: "relative",
        width: "70%",
        height: "70%",
    }

    const handleImgSelected = () => {
        console.log("image selected!!")
        setLargeImageSelected(!largeImageSelected);
    }

    return (
        <>
            <div className={styles.single_image_container}>
                <div onClick={handleImgSelected} className={imgDisplayStyles}>
                    <Image fill src={bufferImg(currentImage.imgData)} alt={currentImage.imgName} />
                </div> {/* should have the image as width 400 to height 500 about a 100 more roughly */}
                <div className={styles.zoom_in_element_info}>
                    <AiOutlinePlusCircle />
                    <p>Click image to zoom in</p>
                </div>
            </div>
            {
                largeImageSelected &&
                <div className={styles.zoom_out} onClick={handleImgSelected} style={localModalStyles}>
                    <div style={innerModalStyle}>
                        <Image 
                            fill
                            src={bufferImg(currentImage.imgData)} 
                            alt={currentImage.imgName}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default DisplayMainImage;