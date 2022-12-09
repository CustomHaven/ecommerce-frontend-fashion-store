const finalResponse = async (response) => {
    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    throw new Error('Request Failed');
}

export default finalResponse;