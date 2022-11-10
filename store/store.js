import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "../feature/generalComponents/generalComponentSlice";

export default configureStore({
    reducer: {
        components: componentReducer
    },
});