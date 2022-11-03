// DELETE FILE!

import React from "react";

const CanvasElement = (image, width, height) => {
    console.log("WE ARE IN CANVAS ELEMENT!!")
    const canvas = React.createElement("canvas", {
        width: width,
        height: height
    });

    // canvas.width = width;
    // canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);

    for (let index = 0, dataLength = imageData.data.length; index < dataLength; index += 4) {
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];

        if ([r, g, b].every((item) => item > 230)) imageData.data[index + 3] = 0;
    }

    ctx.putImageData(imageData, 0, 0);

    // image.crossOrigin = "";
    return canvas;
}

export default CanvasElement;