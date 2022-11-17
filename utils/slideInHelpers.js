
export const directionHelper = (direction) => direction;

export const slides = (entries, observer) => {
    entries.forEach(entry => {
        const dataSet = entry.target.dataset;

        if (dataSet.hasOwnProperty("right")) {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add("slide-in-right");
                entry.target.style.animationDelay = entry.target.dataset.delay;
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove("slide-in-right");
            }
        } else if (dataSet.hasOwnProperty("left")) {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add("slide-in-left");
                entry.target.style.animationDelay = entry.target.dataset.delay;
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove("slide-in-left");
            }
        } else {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add("slide-up");
                entry.target.style.animationDelay = entry.target.dataset.delay;
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove("slide-up");
            }
        }
    });
}