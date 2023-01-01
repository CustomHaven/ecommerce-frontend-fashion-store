import Image from "next/image";
import styles from "../../../styles/Product.module.css";
import { bufferImg } from "../../../utils/generalUtils";

const ProductImages = (props) => {
    const { img, currentSelectedImage, handleSelectedSmallimg } = props;
    return (
        <li 
            key={img.idImage}
            className={
                [
                    styles.smaller_images_list, 
                    currentSelectedImage === img.idImage && styles.currentImage
                ].join(" ")
            }
            onClick={() => handleSelectedSmallimg(img)}
        >
            <Image 
                key={img.idImage}
                fill src={bufferImg(img.imgData)} alt={img.imgName}
            />
        </li>
    )
}

export default ProductImages;