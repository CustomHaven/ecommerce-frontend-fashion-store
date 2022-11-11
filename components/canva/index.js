import React, { useRef } from 'react';
import useCanvas from '../../hooks/useCanvas';

const Canvas = (props) => {

    const canvasRef = useRef(null);

    const { canvaRef, width, height } = useCanvas(canvasRef, props.src);

    return <canvas ref={canvaRef} className={props.className} />

}

export default Canvas;