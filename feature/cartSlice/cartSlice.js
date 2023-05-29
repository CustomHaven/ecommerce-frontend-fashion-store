import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const newCartThunk = createAsyncThunk(
    "cart/newCartThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { id, abandonded } = args;
            // console.log("is this even called?!")
            // console.log("what is the ID?", id);
            // console.log("what is abandonded?", abandonded);
            const cart = await Promise.resolve(haven.newCart(id, abandonded));
            // console.log("CARTTT CALLED IN THUNK!", cart);
            return fulfillWithValue(cart);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const findCartThunk = createAsyncThunk(
    "cart/findCartThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartId } = args;
            console.log("cartID FINDING THE CART!!! ID TEST", cartId);
            const cart = await Promise.resolve(haven.getCart(cartId));
            return fulfillWithValue(cart);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
)

export const addUserThunk = createAsyncThunk(
    "cart/addUserThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartId, userId } = args;
            // console.log("cartId came through as well as userId: ", cartId, userId);
            const cart = await Promise.resolve(haven.updateUserCart(cartId, userId));
            return fulfillWithValue(cart);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const abandonedCartThunk = createAsyncThunk(
    "cart/purchaseCompleteThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { id, abandonded } = args;

            const cart = await Promise.resolve(haven.updateAbandondedCart(id, abandonded));
            return fulfillWithValue(cart);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const addProductToCartThunk = createAsyncThunk(
    "cart/addProductToCartThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartId, body } = args;
            // console.log("args!!", args);
            const cartList = await Promise.resolve(haven.addProductToCart(cartId, body));
            return fulfillWithValue(cartList);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const updateCartItemThunk = createAsyncThunk(
    "cart/updateCartItemThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartItemId, quantity } = args;
            return await Promise.resolve(haven.updateCartItem(cartItemId, quantity));
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
)

export const removeCartItemThunk = createAsyncThunk(
    "cart/removeCartItemThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartItemId } = args;
            return await Promise.resolve(haven.removeCartItem(cartItemId));
            // console.log("cartItem should be fullfiled???", cartList);
            // return fulfillWithValue(cartItemRemoved);
        } catch (error) {
            // console.log("cartItem WHY IS IT ERROR???", error);
            throw rejectWithValue(error);
        }
    }
)

export const removeCartThunk = createAsyncThunk(
    "cart/removeCartThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { cartId } = args;
            return await Promise.resolve(haven.removeCart(cartId));
            // console.log("cart should be fullfiled???", cartList);
            // return fulfillWithValue(cartRemoved);
        } catch (error) {
            // console.log("cart WHY IS IT ERROR???", error);
            throw rejectWithValue(error);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {
            cartList: []
        },
        tempCart: {},
        cartLoading: false,
        cartError: false,
        cartStatusCode: 201,
        cartStatusText: "",
        cartStatusMessage: "",

        cartListStatusCode: 201,
        cartListStatusText: "",
        cartListStatusMessage: "",

        cartEmpty: true,

        shippingMethod: "",
        shippingPrice: 0,
        cartDeliveryInformation: [],
        cartFullPrice: 0,
        cartFullPriceWithShipping: 0,
    },
    reducers: {
        removeTheTempCart(state, action) {
            state.tempCart = action.payload;
        },
        updateCartTotalPrice(state, action) {
            state.cartFullPrice = action.payload;
        },
        updateCartTotalPriceWithShipping(state, action) {
            state.cartFullPriceWithShipping = action.payload;
        },
        updateAbandondedCart(state, action) {
            state.cart.abandonded = action.payload; // boolean true or false!
        },
        pushItemToCart(state, action) {
            state.cartEmpty = action.payload;
        },
        updateQuantity(state, action) {
            state.cart.cartList.forEach(cart => {
                if (cart.cartItemId === action.payload.cartItemId) {
                    cart.quantity = action.payload.quantity;
                }
            });
        },
        updateShippingMethod(state, action) {
            state.shippingMethod = action.payload;
        },
        updateShippingPrice(state, action) {
            state.shippingPrice = action.payload;
        },
        updateCartDeliveryInformation(state, action) {
            if (state.cartDeliveryInformation.find(deliveryInfo => deliveryInfo.span === action.payload.span) === undefined) {
                state.cartDeliveryInformation = state.cartDeliveryInformation.concat(action.payload);
            } else {
                const tempCartDelivery = state.cartDeliveryInformation.map(deliveryInfo => deliveryInfo.span === action.payload.span ? action.payload : deliveryInfo);
                state.cartDeliveryInformation = tempCartDelivery;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(newCartThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(newCartThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.cartLoading = false;
                state.cartError = false;

                state.cart = action.payload.data;

                state.cart.cartList = [];


                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = "";
            })
            .addCase(newCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })

            .addCase(findCartThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })

            .addCase(findCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;

                state.tempCart = action.payload.data;
                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = "";
            })

            .addCase(findCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })

            /////////////////////  CART UPDATE! /////////////////////

            .addCase(addUserThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(addUserThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;

                console.log("state.cart.cart.user_id");
                console.log("state.cart.cart.user_id", state.cart.user_id);
                console.log("state.cart.cart.user_id");
                // state.cart.user_id = action.payload.data.user_id;

                state.cart.user_id = action.payload.data.user_id;
                
                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = "";
            })
            .addCase(addUserThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })

            .addCase(abandonedCartThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(abandonedCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;
                state.cart.abandoned = action.payload.data.abandoned; // changing to true?
                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = "";
            })
            .addCase(abandonedCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartStatusCode = action.payload.statusCode;
                state.cartStatusText = action.payload.statusText;
                state.cartStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })
        
            .addCase(addProductToCartThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(addProductToCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;

                // console.log("what is the action??", action);

                const product = action.meta.arg.product;
                const payload = action.payload.data;

                const obj = {
                    cartId: payload.cart_id,
                    quantity: payload.quantity,
                    cartItemId: payload.id,
                    product: product
                }

                // console.log("WE GOT THE PRODUCT INSIDE THE ADDCASE!!!", product);

                // state.cart.cartList.concat(action.payload.data);

                // console.log("cartlist array??", state.cart.cartList);

                state.cart.cartList.push(obj);

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = "";
            })
            .addCase(addProductToCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })


            .addCase(removeCartItemThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;

                // console.log("what is the action??", action);

                const cartItemId = action.meta.arg.cartItemId;
                

                // console.log("WE GOT THE CARTID INSIDE THE ADDCASE!!!", action);

                // state.cart.cartList.concat(action.payload.data);

                // console.log("cartlist array??", state.cart.cartList);

                const cloneState = state.cart.cartList.filter(cart => cart.cartItemId !== cartItemId);

                state.cart.cartList = cloneState;

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = "";
            })
            .addCase(removeCartItemThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })


            .addCase(removeCartThunk.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
            })
            .addCase(removeCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartError = false;

                state.cart = {
                    cartList: []
                };

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = "";
            })
            .addCase(removeCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = true;

                state.cartListStatusCode = action.payload.statusCode;
                state.cartListStatusText = action.payload.statusText;
                state.cartListStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })
    }
});
// removeCartItemThunk
export const {
    removeTheTempCart,
    updateCartTotalPrice,
    updateCartTotalPriceWithShipping,
    updateAbandondedCart,
    pushItemToCart,
    updateQuantity,
    updateShippingMethod,
    updateShippingPrice,
    updateCartDeliveryInformation
} = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectTempCart = state => state.cart.tempCart;

export const selectCartLoading = state => state.cart.cartLoading;
export const selectCartError = state => state.cart.cartError;
export const selectCartStatusCode = state => state.cart.cartStatusCode;
export const selectCartStatusText = state => state.cart.cartStatusText;
export const selectCartStatusMessage = state => state.cart.cartStatusMessage;


export const selectCartListStatusCode = state => state.cart.CartListStatusCode;
export const selectCartListStatusText = state => state.cart.CartListStatusText;
export const selectCartListStatusMessage = state => state.cart.CartListStatusMessage;

export const selectCartEmpty = state => state.cart.cartEmpty;

export const selectShippingMethod = state => state.cart.shippingMethod;
export const selectShippingPrice = state => state.cart.shippingPrice;
export const selectCartDeliveryInformation = state => state.cart.cartDeliveryInformation;

export const selectCartFullPrice = state => state.cart.cartFullPrice;
export const selectCartFullPriceWithShipping = state => state.cart.cartFullPriceWithShipping;


export default cartSlice.reducer;