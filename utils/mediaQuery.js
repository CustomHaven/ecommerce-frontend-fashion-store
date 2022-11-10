export const mediaQueryFunc = (windowWidth, dispatch, setHeightCanva, fireNavHeader, fireMainMarginTop) => {
    if (process?.title === "browser") {
        if (windowWidth > 1250) {
            setHeightCanva(110);
            dispatch(fireNavHeader(115));
            dispatch(fireMainMarginTop(115));
        } else if (windowWidth <= 1250 && windowWidth >= 1051) {
            setHeightCanva(80);
            dispatch(fireNavHeader(85));
            dispatch(fireMainMarginTop(85));
        } else if (windowWidth <= 1050) {
            setHeightCanva(60);
            dispatch(fireNavHeader(65));
            dispatch(fireMainMarginTop(65));
        }
    }
};

// export default mediaQueryFunc;

export const monitorMediaForCanvaWidth = (windowWidth, setCanvaWidth) => {
    if (process?.title === "browser") {
        if (windowWidth <= 400) {
            setCanvaWidth(200);
        } else if (windowWidth <= 300 && windowWidth < 400) {
            setCanvaWidth(150);
        } else if (windowWidth > 400 && windowWidth <= 700) {
            setCanvaWidth(250);
        }
    }
};