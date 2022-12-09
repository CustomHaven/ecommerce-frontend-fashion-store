import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";

const HiddenHeader = (props) => {
    const navBar = useQuerySelector("#header-elem");
    const { blockSize } = useResizeObserver(navBar.current, "#header-elem");

    return (
        <div style={{ height: `${blockSize / props.divideBy}px` }}></div>
    )
}

export default HiddenHeader;