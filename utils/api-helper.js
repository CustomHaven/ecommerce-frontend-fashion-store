const finalResponse = async (response) => {
    if (response.ok) {
        return {
            statusCode: response.status,
            data: await response.json()
        }
    }
    throw {
        name: response.statusText,
        statusCode: response.status,
        message: await response.text(),
    }
}

export default finalResponse;