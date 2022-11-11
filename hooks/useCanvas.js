import { useState, useEffect } from "react";
// Removes white background from image transparency. Only works with white background this code!!

const useCanvas = (canvaRef, src) => {

    const [width, setWidth] = useState(canvaRef.current !== null || undefined ? canvaRef.current.width : 10); // forcing a fake 10 value so it doesn't throw error null or zero wont work cuz off
    const [height, setHeight] = useState(canvaRef.current !== null || undefined ? canvaRef.current.height : 10); // forcing a fake 10 value so it doesn't throw error null or zero wont work cuz off

    useEffect(() => {
        const image = new Image();
        image.onload = ({target}) => {
            
            const canvas = canvaRef.current;
            if (canvas === null) {
                return;
            }
            // willReadFrequently removes a warning not so serious but this warning
            // Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true.
            const ctx = canvas.getContext("2d");

            setWidth(canvaRef.current.width);
            setHeight(canvaRef.current.height);

            const w = width;
            const h = height;
            
            ctx.drawImage(image, 0, 0, target.width, target.height, 0, 0, w, h);
            
            const imageData = ctx.getImageData(0, 0, width, height); // cuz here the above explanation on useState;
            
            
            for (let index = 0, dataLength = imageData.data.length; index < dataLength; index += 4) {
                const r = imageData.data[index];
                const g = imageData.data[index + 1];
                const b = imageData.data[index + 2];
            
                if ([r, g, b].every((item) => item > 230)) {
                    imageData.data[index + 3] = 0;
                }
            }
        
            target.width = width;
            target.height = height;
        
            ctx.putImageData(imageData, 0, 0);
        }
        image.crossOrigin = "";
        image.src = src;
    }, [width, height, canvaRef]);

    return {
        canvaRef,
        width,
        height
    }
}

export default useCanvas;