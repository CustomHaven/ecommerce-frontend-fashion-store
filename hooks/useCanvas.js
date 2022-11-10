import { useEffect } from "react";
// Removes white background from image transparency. Only works with white background this code!!

const useCanvas = (canvaRef, width, height, src, className) => {

    useEffect(() => {
        const image = new Image();
        image.onload = ({target}) => {
            const w = width;
            const h = height;
            
            const canvas = canvaRef.current;
            canvas.className = className ? className : "nothing";
            // willReadFrequently removes a warning not so serious but this warning
            // Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true.
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            // contextRef.current = ctx;
        
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(image, 0, 0, target.width, target.height, 0, 0, w, h);
            
            const imageData = ctx.getImageData(0, 0, width, height);
            
            
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
    }, [width, height]);

    return {
        canvaRef,
        width,
        height
    }
}

export default useCanvas;