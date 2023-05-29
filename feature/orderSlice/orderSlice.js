import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

// COMEBACK TO THIS FIX WHEN CART ITEMS IS UPDATED THE CART ITEM LIST TABLE FOR THE DB NEEDS TO UPDATE AS WELL!!! BACK IN THE BACKEND

export const newOrderThunk = createAsyncThunk(
    "order/newOrderThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { user_id, cart_id, body } = args;
            // console.log("is this even called?!")
            // console.log("what is the ID?", id);
            // console.log("what is abandonded?", abandonded);
            const order = await Promise.resolve(haven.newOrder(user_id, cart_id, body));
            // console.log("CARTTT CALLED IN THUNK!", order);
            return fulfillWithValue(order);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);


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
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(newOrderThunk.pending, (state) => {
                state.orderLoading = true;
                state.orderError = false;
            })
            .addCase(newOrderThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

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

                state.orderStatusCode = action.payload.statusCode;
                state.orderStatusText = action.payload.statusText;
                state.orderStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
            })
    }
});
// removeOrderItemThunk
export const {
} = orderSlice.actions;

export const selectOrder = state => state.order.order;
export const selectOrderLoading = state => state.order.orderLoading;
export const selectOrderError = state => state.order.orderError;
export const selectOrderStatusCode = state => state.order.orderStatusCode;
export const selectOrderStatusText = state => state.order.orderStatusText;
export const selectOrderStatusMessage = state => state.order.orderStatusMessage;


// export const selectOrderListStatusCode = state => state.order.OrderListStatusCode;
// export const selectOrderListStatusText = state => state.order.OrderListStatusText;
// export const selectOrderListStatusMessage = state => state.order.OrderListStatusMessage;


export default orderSlice.reducer;