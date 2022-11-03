import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null); // no idea why I have this for ctx??


    useEffect(() => {
        const image = new Image();
        image.onload = ({target}) => {
            const w = props.width;
            const h = props.height;
            
            const canvas = canvasRef.current;
            canvas.className = props.className;
            // willReadFrequently removes a warning not so serious but this warning
            // Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true.
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            contextRef.current = ctx;
        
            canvas.width = props.width;
            canvas.height = props.height;
            
            ctx.drawImage(image, 0, 0, target.width, target.height, 0, 0, w, h);
            
            const imageData = ctx.getImageData(0, 0, props.width, props.height);
            
            
            for (let index = 0, dataLength = imageData.data.length; index < dataLength; index += 4) {
                const r = imageData.data[index];
                const g = imageData.data[index + 1];
                const b = imageData.data[index + 2];
            
                if ([r, g, b].every((item) => item > 230))
                    imageData.data[index + 3] = 0;
            }
        
            target.width = props.width;
            target.height = props.height;
        
            ctx.putImageData(imageData, 0, 0);
        }
        image.crossOrigin = "";
        image.src = props.src;
    }, []);

    return <canvas ref={canvasRef} width={props.width} height={props.height} />

}

export default Canvas;