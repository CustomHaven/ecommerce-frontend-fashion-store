import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const makePaymentThunk = createAsyncThunk(
    "auth/makePaymentThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { nameOnCard, cardType, cardNumber, expiryDate, cvv, amount, userId, paymentType, currency, refreshed_token, loginStage } = args;
            // const { email, password } = ;
            console.log("we have the args?", args);
            console.log("EXPIRY DATE!", expiryDate);
            const expiryStr = String(expiryDate);
            const expiryDateStr = expiryStr.slice(0, 4) + "-" + expiryStr.slice(4);
            // console.log("email came through as well as in putted email: ", email);
            const payment = await Promise.resolve(haven.makePayment(userId, { 
                name_on_card: nameOnCard, 
                card_type: cardType,
                card_number: cardNumber,
                expiry_date: expiryDateStr,
                cvv: cvv,
                amount: amount
            }, paymentType, currency, refreshed_token, loginStage));
            return fulfillWithValue(payment);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        paymentConfirmed: "",

        paymentTotal: 0,

        paymentLoading: false,
        paymentError: false,

        paymentErrorName: "",
        paymentErrorStatusMessage: "",
        paymentErrorStatusCode: 0,

    },
    reducers: {
        finalPaymentPrice(state, action) {
            state.paymentTotal = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(makePaymentThunk.pending, (state) => {
                state.paymentLoading = true;
                state.paymentError = false;
            })
            .addCase(makePaymentThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.paymentLoading = false;
                state.paymentError = false;

                console.log("the action payloooad of payment confirmed!!?!!", action.payload);

                state.paymentProfile = action.payload.data.payment_id;

                state.paymentConfirmed = action.payload.data.payment_id;

                state.paymentErrorName = "";
                // state.paymentErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.paymentErrorStatusMessage = "";
                state.paymentErrorStatusCode = 0;

            })
            .addCase(makePaymentThunk.rejected, (state, action) => {
                state.paymentLoading = false;
                state.paymentError = true;

                console.log("the action payloooad of payment REJECTED!!!!?!!", action.payload);

                state.paymentProfile = {};

                state.paymentConfirmed = "";

                state.paymentErrorName = action.payload.name;
                // state.paymentErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.paymentErrorStatusMessage = "Something went wrong.";
                state.paymentErrorStatusCode = action.payload.statusCode;
            })

    }
});


export const {
    finalPaymentPrice
} = paymentSlice.actions;

export const selectPaymentConfirmed = state => state.payment.paymentConfirmed;
export const selectPaymentTotal = state => state.payment.paymentTotal;
export const selectPaymentLoading = state => state.payment.paymentLoading;
export const selectPaymentError = state => state.payment.paymentError;
export const selectPaymentErrorName = state => state.payment.paymentErrorName;
export const selectPaymentErrorStatusMessage = state => state.payment.paymentErrorStatusMessage;
export const selectPaymentErrorStatusCode = state => state.payment.paymentErrorStatusCode;


export default paymentSlice.reducer;