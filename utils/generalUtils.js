export const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

export const bufferImg = (imgData) => {
    const buff = Buffer.from(imgData, "base64"); //.toString("utf-8");

    const bannerImg = buff.toString("utf-8");
    return bannerImg;
}






let array1 = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o"];

export const fillDisplayArray = (array, size, idIndex) => {
    let arr = [];

    let pIndex = array.indexOf(idIndex);
    let pReached = false;
    
    //console.log(pIndex);

    while (arr.length !== size) {
        //console.log(pIndex)
        if (pReached === false) {
            if (pIndex < array.length) {
                arr.push(array[pIndex]);
                pIndex++
                if (pIndex === array.length) {
                    pReached = true;
                    pIndex = 0;
                    continue;
                }
            }
        }
    
        if (pReached === true) {
            arr.push(array[pIndex]);
            pIndex++;
        }
    
    }

    return arr;
}

export const clickHelper = (direction, smallArray, largeArray) => {

    const index = smallArray.indexOf(smallArray[direction === "right" ? smallArray.length -1 : 0]);
    const obj = {}
    largeArray.filter((img, i) => {
        if (img.idImage === smallArray[index]) {
            return obj[i] = img.idImage;
        }
    });

    return parseInt(Object.keys(obj));
}

export const helperArrayNewSetOfFours = (oldFour, fullArraySize) => {
    const arrayTemp = [];
    oldFour.forEach((val, ind) => {
        fullArraySize.forEach(img => {
            if (val === img.idImage) {
                arrayTemp.push({
                    id: ind++,
                    idImage: img.idImage,
                    imgName: img.imgName,
                    imgData: img.imgData
                });
            }
        });
    });
    return arrayTemp;
}