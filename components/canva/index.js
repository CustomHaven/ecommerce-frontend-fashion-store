import React, { useRef } from 'react';
import useCanvas from '../../hooks/useCanvas';

const Canvas = (props) => {

    const canvasRef = useRef(null);

    const { canvaRef, width, height } = useCanvas(canvasRef, props.width, props.height, props.src, props.className);

    return <canvas ref={canvaRef} width={width} height={height} />

}

export default Canvas;