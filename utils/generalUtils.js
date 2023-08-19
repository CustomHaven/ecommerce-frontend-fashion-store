export const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

export const bufferImg = (imgData) => {
    console.log("imgData INSIDE BUFFERIMG!", imgData);
    const buff = Buffer.from(imgData, "base64"); //.toString("utf-8");

    const bannerImg = buff.toString("utf-8");
    return bannerImg;
}

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

export const sortArrayObjectForString = (a, b, key) => {
    // Converting to uppercase to have case-insensitive comparison
    const name1 = a[key].toUpperCase();
    const name2 = b[key].toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
        comparison = 1;
    } else if (name1 < name2) {
        comparison = -1;
    }
    return comparison;
}

export const directionSequence = (num, sequence, option) => {
    const arr = [];
    const numberSequence = parseInt(num / sequence);
    for (let i = option; i <= numberSequence; i++) { // option 1 or 0 
      arr.push(i * sequence);
    }
    if (arr[arr.length - 1] === num) {
        return arr;
    } else {
        arr.push(num);
        return arr;
    }
}

export const capitalizeWords = (str) => {
    const reg = /\b([a-zA-Z]{3,})/g;
    return str.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

export const fetchMethod = async (url, method, headers, body, credentials) => {
    const res = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        credentials: !credentials ? "same-origin" : "include"
    });
    const jsonResponse = await res.json();
    return jsonResponse;
}

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

export const adminHeaders = (token, loginStage) => {
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Login-Stage": loginStage
    }
};

export const customError = (statusCode, message) => {
    const error = new Error(message);
    error.status = statusCode;
    return error;
}