import finalResponse from "./api-helper";

const API_URL = "http://localhost:5000/api/v2";

let response;

const haven = {
    async getAllProductsListed() {
        try {
            response = await fetch(`${API_URL}/products/all-products-with-all-images`);
            
            const jsonResponse = await finalResponse(response);
            return jsonResponse
        } catch (error) {
            console.log("oops something went wrong in api call", error);
        }
    },

    async addNewProductWithImages(product_body, banner_image_body, all_images_body) {
        try {
            const data = {
                product: product_body,
                banner_image: banner_image_body,
                all_images: all_images_body
            }
            response = await fetch(`${API_URL}/products/add-product-and-images-together`, {
                method: "POST",
                headers: {
                    "Content-Type": "application.json"
                },
                body: JSON.stringify(data)
            });
            return await finalResponse(response);
        } catch (error) {
            console.log("oops something went wrong in api call", error);
        }
    },

    async getSingleProductWithImages(id) {
        try {
            // /products/single-product-and-all-images/
            response = await fetch(`${API_URL}/products/single-product-and-all-images/${id}`);

            const jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            console.log("oops something went wrong in api call", error);
        }
    }
}

export default haven;


/*

breakdown cover number: 0344 809 9508

close brothers: 03333 218 566

*/