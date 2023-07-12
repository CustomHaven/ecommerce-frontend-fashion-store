import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/AdminDirection.module.css";

const Directions = (props) => {
    const [slides, setSlides] = useState([]);

    const handleSlide = (slide) => {
        props.setSlideNumber(slide);
    }

    const handleLeftClick = () => {
        if (props.slideNumber <= 1) {
            return;
        }
        props.setSlideNumber(props.slideNumber - 1);
    }

    const handleRightClick = () => {
        if (props.slideNumber >= slides.length) {
            return;
        }
        props.setSlideNumber(props.slideNumber + 1);
    }

    useEffect(() => {
        setSlides(directionSequence(props.max, props.pageListing));
    }, [props.max]);

    return (
        <div className={styles.direction_container}>
            <div
                className={styles.arrow_directions}
                onClick={handleLeftClick}
            >
                <BsFillArrowLeftCircleFill />
            </div>
            <div>
                {slides.map((s, i) => 
                    <p 
                        key={s}
                        className={[styles.page_number_element, props.slideNumber === i+1 && styles.page_selected].join(" ")}
                        onClick={() => handleSlide(i+1)}
                    >{i+1}</p>
                )}
            </div>
            <div
                className={styles.arrow_directions}
                onClick={handleRightClick}
            >
                <BsFillArrowRightCircleFill />
            </div>
        </div>
    )
}

export default Directions;