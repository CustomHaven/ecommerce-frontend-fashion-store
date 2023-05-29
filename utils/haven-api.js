import finalResponse from "./api-helper";

const API_URL = "http://localhost:5000/api/v2";

let response, jsonResponse;
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

const haven = {
    async getAllProductsListed() {
        try {
            response = await fetch(`${API_URL}/products/all-products-with-all-images`);
            
            jsonResponse = await finalResponse(response);
            return jsonResponse
        } catch (error) {
            throw error;
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
            throw error;
        }
    },

    async getSingleProductWithImages(id) {
        try {
            // /products/single-product-and-all-images/
            response = await fetch(`${API_URL}/products/single-product-and-all-images/${id}`);
            jsonResponse = await finalResponse(response);
            // console.log("final response json bits", jsonResponse);
            return jsonResponse;
            // }
        } catch (error) {
            throw error;
        }
    },

    //////////////////////////////////////////// CART CALL! /////////////////////////////////////////////////
    async newCart(id, abandonded) {
        try {
            // abandonded is mandatory, id is not
            response = await fetch(`${API_URL}/carts/cart?user_id=${id}&abandonded=${abandonded}`, {
                method: "POST",
                // body: JSON.stringify({}), // empty object because all the request is done in the query
                headers: headers
            });
            // console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            // console.log("final response json bits", jsonResponse);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async getCart(id) {
        try {
            response = await fetch(`${API_URL}/carts/${id}`);
            // console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async updateAbandondedCart(id, abandonded) {
        try {
            response = await fetch(`${API_URL}/carts/abandoned/${id}`, { // CART ID!!
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ abandonded: abandonded })
            });
            // console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async updateUserCart(id, userId) {
        try {
            response = await fetch(`${API_URL}/carts/user/${id}`, { // CART ID!!
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ user_id: userId })
            });
            // console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async removeCart(id) {
        try {
            response = await fetch(`${API_URL}/carts/${id}`, {
                method: "DELETE",
                headers: headers
            });
            // console.log("RESPONSE DELETE! CART!!", response);
            jsonResponse = await finalResponse(response, true);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

// IMPLEMENT REMOVE CART!

    // Cart list

    async addProductToCart(cartId, body) {
        try {
            response = await fetch(`${API_URL}/cart-list/cart/brand-new/cart-item/${cartId}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async updateCartItem(cartItemId, quantity) {
        try {
            response = await fetch(`${API_URL}/cart-list/${cartItemId}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({quantity})
            });
            console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async removeCartItem(cartItemId) {
        try {
            response = await fetch(`${API_URL}/cart-list/${cartItemId}`, {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify({})
            });
            console.log("RESPONSE DELETE!!", response);
            jsonResponse = await finalResponse(response, true);
            return jsonResponse;
        } catch (error) {
            throw (error);
        }
    },


    // ////////////////////////////////////////////////// USER AND CONTACT DETAILS CALL ////////////////////////////////////////////////// //

    async findUserByEmail(email) {
        try {
            response = await fetch(`${API_URL}/users/email/${email}`, {
                method: "GET",
                headers: headers
            });
            console.log("RESPONSE GET BY EMAIL!!", response);
            jsonResponse = await finalResponse(response, false);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async saveNewGuest(email) {
        try {
            console.log("havenAPI guest email?", email);
            response = await fetch(`${API_URL}/users/register/guest`, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: headers
            });
            console.log("RESPONSE POST GUEST!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async loginGuestUser(email, password) {
        try {
            console.log("what is wrong is this called?", email, password);
            response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: headers,
                credentials: "include" // This here
            });
            console.log("RESPONSE POST LOGINGUEST!!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async saveContactDetails(userId, bodyObj) {
        try {
            response = await fetch(`${API_URL}/contact-details/${userId}`, {
                method: "POST",
                body: JSON.stringify(bodyObj),
                headers: headers,
                credentials: "include"
            });
            // console.log("RESPONSE FOR SAVE CONTACT DETAILS POST REQ IS!", response);
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    /////////////////// PAYMENT AND ORDER /////////////////////////////////

    async makePayment(userId, obj, paymentType, currency) {
        try {
            console.log("MAKEPAYMENT PAYMENTTYPE", paymentType);
            console.log("MAKEPAYMENT CURRENCY", currency);
            console.log("MAKEPAYMENT OBJ", obj);
            console.log("MAKEPAYMENT USERID", userId);
            response = await fetch(`${API_URL}/payment-details/${userId}?card_type=${paymentType}&currency=${currency}`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: headers,
                credentials: "include"
            });
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },
//
    async newOrder(user_id, cart_id, body) { // body.final_price body.payment_provider_id
        try {
            //  is mandatory, id is not
            response = await fetch(`${API_URL}/orders/order-fulfilled?user_id=${user_id}&cart_id=${cart_id}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers,
                credentials: "include"
            });
            // console.log("RESPONSE!!", response);
            jsonResponse = await finalResponse(response);
            // console.log("final response json bits", jsonResponse);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    },

    async refreshUserAuth(tokenId) {
        try {
            response = await fetch(`${API_URL}/auth/refresh`, {
                method: "POST",
                body: JSON.stringify({refresh_token: tokenId}),
                headers: headers,
                credentials: "include"
            });
            jsonResponse = await finalResponse(response);
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    }

    // async 

}

export default haven;


/*

breakdown cover number: 0344 809 9508

close brothers: 03333 218 566

*/