import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

// COMEBACK TO THIS FIX WHEN CART ITEMS IS UPDATED THE CART ITEM LIST TABLE FOR THE DB NEEDS TO UPDATE AS WELL!!! BACK IN THE BACKEND

export const newOrderThunk = createAsyncThunk(
    "order/newOrderThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { user_id, cart_id, body, refreshed_token, loginStage } = args;
            const order = await Promise.resolve(haven.newOrder(user_id, cart_id, body, refreshed_token, loginStage));

            return fulfillWithValue(order);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const retrieveAllOrderThunk = createAsyncThunk(
    "order/retrieveAllOrderThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { refreshed_token } = args;

            const allOrders = await Promise.resolve(haven.findAllOrders(refreshed_token));
            return fulfillWithValue(allOrders);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const retrieveBestSellers = createAsyncThunk(
    "order/retrieveBestSellers",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const bestSellers = await Promise.resolve(haven.bestSellers());
            return fulfillWithValue(bestSellers);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
)


const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderLoading: false,
        orderError: false,
        order: {

        },
        orderStatusCode: 201,
        orderStatusText: "",
        orderStatusMessage: "",


        allOrdersLoading: false,
        allOrdersError: false,
        allOrders: [],
        allOrdersStatusCode: 200,
        allOrdersStatusText: "",
        allOrdersStatusMessage: "",

        bestSellerLoading: false,
        bestSellerError: false,
        bestSellers: [],
        bestSellerStatusCode: 201,
        bestSellerStatusText: "",
        bestSellerStatusMessage: "",
    },
    reducers: {
        resetOrders(state) {
            state.order = {};
            state.allOrders = [];
        },
        fetchedOrders(state, action) {
            state.allOrders = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(newOrderThunk.pending, (state) => {
                state.orderLoading = true;
                state.orderError = false;
            })
            .addCase(newOrderThunk.fulfilled, (state, action) => {

                state.orderLoading = false;
                state.orderError = false;

                state.order = action.payload.data;

                state.orderStatusCode = action.payload.statusCode;
                state.orderStatusText = action.payload.statusText;
                state.orderStatusMessage = "";
            })
            .addCase(newOrderThunk.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = true;

                state.order = {};

                state.orderStatusCode = action.payload.statusCode;
                state.orderStatusText = action.payload.statusText;
                state.orderStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })




            .addCase(retrieveAllOrderThunk.pending, (state) => {
                state.allOrdersLoading = true;
                state.allOrdersError = false;
            })
            .addCase(retrieveAllOrderThunk.fulfilled, (state, action) => {



                state.allOrdersLoading = false;
                state.allOrdersError = false;

                state.allOrders = action.payload.data;

                state.allOrdersStatusCode = action.payload.statusCode;
                state.allOrdersStatusText = action.payload.statusText;
                state.allOrdersStatusMessage = "";
            })
            .addCase(retrieveAllOrderThunk.rejected, (state, action) => {
                state.allOrdersLoading = false;
                state.allOrdersError = true;

                state.allOrders = [];

                state.allOrdersStatusCode = action.payload.statusCode;
                // state.allOrdersStatusText = action.payload.message;
                state.allOrdersStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
                state.allOrdersStatusMessage = action.payload.message //.split(":")[1].replace(/["'{}]/g, "");
            })




            .addCase(retrieveBestSellers.pending, (state) => {
                state.bestSellerLoading = true;
                state.bestSellerError = false;
            })
            .addCase(retrieveBestSellers.fulfilled, (state, action) => {

                state.bestSellerLoading = false;
                state.bestSellerError = false;

                state.bestSellers = action.payload.data;

                state.bestSellerStatusCode = action.payload.statusCode;
                state.bestSellerStatusText = action.payload.statusText;
                state.bestSellerStatusMessage = "";
            })
            .addCase(retrieveBestSellers.rejected, (state, action) => {
                state.bestSellerLoading = false;
                state.bestSellerError = true;

                state.bestSellers = [];

                state.bestSellerStatusCode = action.payload.statusCode;
                state.bestSellerStatusText = action.payload.statusText;
                // state.bestSellerStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
                state.bestSellerStatusMessage = action.payload.message //.split(":")[1].replace(/["'{}]/g, "");
            })
    }
});
// removeOrderItemThunk
export const {
    resetOrders,
    fetchedOrders
} = orderSlice.actions;

export const selectOrder = state => state.order.order;
export const selectOrderLoading = state => state.order.orderLoading;
export const selectOrderError = state => state.order.orderError;
export const selectOrderStatusCode = state => state.order.orderStatusCode;
export const selectOrderStatusText = state => state.order.orderStatusText;
export const selectOrderStatusMessage = state => state.order.orderStatusMessage;



export const selectAllOrders = state => state.order.allOrders;
export const selectAllOrdersLoading = state => state.order.allOrdersLoading;
export const selectAllOrdersError = state => state.order.allOrdersError;
export const selectAllOrdersStatusCode = state => state.order.allOrdersStatusCode;
export const selectAllOrdersStatusText = state => state.order.allOrdersStatusText;
export const selectAllOrdersStatusMessage = state => state.order.allOrdersStatusMessage;



export const selectBestSeller = state => state.order.bestSellers;
export const selectBestSellerLoading = state => state.order.bestSellerLoading;
export const selectBestSellerError = state => state.order.bestSellerError;
export const selectBestSellerStatusCode = state => state.order.bestSellerStatusCode;
export const selectBestSellerStatusText = state => state.order.bestSellerStatusText;
export const selectBestSellerStatusMessage = state => state.order.bestSellerStatusMessage;





// export const selectOrderListStatusCode = state => state.order.OrderListStatusCode;
// export const selectOrderListStatusText = state => state.order.OrderListStatusText;
// export const selectOrderListStatusMessage = state => state.order.OrderListStatusMessage;


export default orderSlice.reducer;