import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import componentReducer from "../feature/generalComponents/generalComponentSlice";
import productReducer from "../feature/productSlice/productSlice";
import errorReducer from "../feature/errorSlice/errorSlice";

const makeStore = () => configureStore({
    reducer: {
        components: componentReducer,
        products: productReducer,
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