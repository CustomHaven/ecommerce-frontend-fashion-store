import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";

const HiddenHeader = () => {
    const navBar = useQuerySelector("#header-elem");
    const { blockSize } = useResizeObserver(navBar.current, "#header-elem");

    return (
        <div style={{ height: `${blockSize}px` }}></div>
    )
}

export default HiddenHeader;