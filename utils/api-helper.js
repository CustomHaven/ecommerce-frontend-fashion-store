const finalResponse = async (response, removeDeleteMethod) => {
    if (response.ok) {
        const jsonResponse = {
            statusCode: response.status,
            statusText: response.statusText,
            data: !removeDeleteMethod ? await response.json() : "nothing"
        }
        if (removeDeleteMethod) {
            delete jsonResponse.data;
        }
        return jsonResponse;
    }
    throw {
        name: response.statusText,
        statusCode: response.status,
        message: await response.text(),
    }
}

export default finalResponse;