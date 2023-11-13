import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import componentReducer from "../feature/generalComponents/generalComponentSlice";
import productReducer from "../feature/productSlice/productSlice";
import cartReducer from "../feature/cartSlice/cartSlice";
import userReducer from "../feature/userSlice/userSlice";
import contactDetailReducer from "../feature/contactDetailSlice/contactDetailSlice";
import authReducer from "../feature/authSlice/authSlice";
import paymentReducer from "../feature/paymentSlice/paymentSlice";
import orderReducer from "../feature/orderSlice/orderSlice";
import errorReducer from "../feature/errorSlice/errorSlice";
import legalReducer from "../feature/legalSlice/legalSlice";

const makeStore = () => configureStore({
    reducer: {
        components: componentReducer,
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        contactDetail: contactDetailReducer,
        auth: authReducer,
        payment: paymentReducer,
        order: orderReducer,
        legal: legalReducer,
        error: errorReducer
    },
    devTools: true,
});

/* for typescript which I will use from now on!!

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
*/

export const wrapper = createWrapper(makeStore);