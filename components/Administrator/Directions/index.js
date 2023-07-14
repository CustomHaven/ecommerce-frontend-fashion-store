import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPageListedArrayStorage,
    selectPageIndex,
    controlSlideMultiplier,
    selectSlideMultiplier,
    controlPageIndex,
    selectSlidesPagesIndex,
    controlFirstList,
    controlLastList,
    selectPageListingController,
    selectFirstList,
    selectLastList } from "../../../feature/generalComponents/generalComponentSlice";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { directionSequence } from "../../../utils/generalUtils";
import styles from "../../../styles/Administrator/AdminDirection.module.css";

const Directions = (props) => {

    const slides = useSelector(selectPageListedArrayStorage);
    const pageIndex = useSelector(selectPageIndex);
    const slideMultiplier = useSelector(selectSlideMultiplier);
    const pageNumbers = useSelector(selectSlidesPagesIndex);
    const pageListing = useSelector(selectPageListingController);
    const firstList = useSelector(selectFirstList);
    const lastList = useSelector(selectLastList);

    const dispatch = useDispatch()

    console.log({slides})

    const handleSlide = (slide, value) => {
        // props.setSlideNumber(slide);
        dispatch(controlSlideMultiplier(slide));
        dispatch(controlPageIndex(slide));

        const firstPart = slides[0];

        const remainder = firstPart - 1;


        dispatch(controlFirstList(value - remainder));
        dispatch(controlLastList(value));
    }

    const handleLeftClick = () => {
        if (slideMultiplier <= 1) {
            return;
        }
        const lastSlide = slides[slides.length-1];

        dispatch(controlSlideMultiplier(slideMultiplier - 1));
        dispatch(controlPageIndex(pageIndex - 1));
        dispatch(controlFirstList(firstList - pageListing));
        dispatch(controlLastList(lastSlide === lastList ? lastList - (lastList - firstList + 1): lastList - pageListing));
    }

    const handleRightClick = () => {
        if (slideMultiplier >= slides.length) {
            return;
        }

        const lastSlide = slides[slides.length-1];

        dispatch(controlFirstList(firstList + pageListing));
        dispatch(controlLastList(lastSlide < lastList + pageListing ? lastList + (lastSlide - lastList) : lastList + pageListing));


        dispatch(controlSlideMultiplier(slideMultiplier + 1));
        dispatch(controlPageIndex(pageIndex + 1));
        // props.setSlideNumber(props.slideNumber + 1);
    }

    // useEffect(() => {
    //     setSlides(directionSequence(props.max, props.pageListing, props.option));
    // }, [props.max]);

    return (
        <div className={styles.direction_container}>
            <div
                className={styles.arrow_directions}
                onClick={handleLeftClick}
            >
                <BsFillArrowLeftCircleFill />
            </div>
            <div>
                {slides.slice(0, pageNumbers === Infinity ? slides.length : pageNumbers).map((s, i, array) => { 
                    return (
                        props.option === 0 && array.length - 1 === i ? null : 
                            <p
                                onLoad={() => handleLoad(array)}
                                key={s}
                                className={[styles.page_number_element, slideMultiplier === i+1 && styles.page_selected].join(" ")}
                                onClick={() => handleSlide(i+1, s)}
                            >{i+1}</p>
                    )}
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