import { useState, useRef } from "react";
import { GiCash, GiReturnArrow } from "react-icons/gi";
import { GrAlarm } from "react-icons/gr";
import { LuMailWarning } from "react-icons/lu";
import styles from "../../../../styles/Administrator/Dashboard/AdminSlideShow.module.css";

const SlideShow = (props) => {
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const sliderRef = useRef(null);

    const turnOn = (e) => {
        setIsDown(true);
        sliderRef.current.classList.add(styles.active);
        // console.log(sliderRef.current.offsetLeft)
        // console.log(e.pageX);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);

        // console.log("startX", startX);
    }

    const turnOff = () => {
        setIsDown(false);
        sliderRef.current.classList.remove(styles.active);
    }

    const handleSliderMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        // console.count(isDown);
        const x = e.pageX - sliderRef.current.offsetLeft;

        const walk = x - startX;
        console.log("startX", startX);
        console.log("x", x);
        console.log("walk", walk);
        sliderRef.current.scrollLeft = scrollLeft - walk;
    }

    const fourOrderThings = [
        {
            icon: GrAlarm,
            info: "Pending Orders",
            count: 14
        }, 
        {
            icon: GiCash,
            info: "Completed Orders",
            count: 32
        },
        {
            icon: GiReturnArrow,
            info: "Refund Requested",
            count: 11
        },
        {
            icon: LuMailWarning,
            info: "New Comments",
            count: 9
        }
    ];

    return (
        <div 
            ref={sliderRef} 
            className={styles.orders_info_slideshow}
            onMouseDown={(e) => turnOn(e)}
            onMouseLeave={() => turnOff()}
            onMouseUp={() => turnOff()}
            onMouseMove={handleSliderMove}
        >
            <div className={styles.inner_slider}>
                {
                    fourOrderThings.map((item, i) => 
                        <article key={`${i + ". " + item.info}`} className={styles.slideshow_item}>
                            <item.icon className={styles.icon_img} />
                            <p>{item.info}</p>
                            <p>{item.count}</p>
                        </article>
                    )
                }
            </div>
        </div>
    )
}

export default SlideShow;