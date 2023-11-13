import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const fetchLegalThunk = createAsyncThunk(
    "legal/fetchLegalThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const {  } = args;
            const legals = await Promise.resolve(haven.legalFetch());
            return fulfillWithValue(legals);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

const legalSlice = createSlice({
    name: "legal",
    initialState: {
        legal: {
        },
        legalLoading: false,
        legalError: false,

        legalErrorName: "",
        legalErrorStatusMessage: "",
        legalErrorStatusCode: 0,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLegalThunk.pending, (state) => {
                state.legalLoading = true;
                state.legalError = false;
            })
            .addCase(fetchLegalThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.legalLoading = false;
                state.legalError = false;

                console.log("the action payloooad of legal", action.payload);

                state.legal = action.payload.data;

                state.legalErrorName = "";
                // state.legalErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.legalErrorStatusMessage = "";
                state.legalErrorStatusCode = 0;

            })
            .addCase(fetchLegalThunk.rejected, (state, action) => {
                state.legalLoading = false;
                state.legalError = true;

                console.log("the action payloooad of legal REJECTED!!!!?!!", action.payload);

                state.legal = {};

                state.legalErrorName = action.payload.name;
                state.legalErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                // state.legalErrorStatusMessage = "Something went wrong.";
                state.legalErrorStatusCode = action.payload.statusCode;
            })

    }
});

export const {} = legalSlice.actions;

export const selectLegal = state => state.legal.legal;
export const selectLegalLoading = state => state.legal.legalLoading;
export const selectLegalError = state => state.legal.legalError;
export const selectLegalErrorName = state => state.legal.legalErrorName;
export const selectLegalErrorStatusMessage = state => state.legal.legalErrorStatusMessage;
export const selectLegalErrorStatusCode = state => state.legal.legalErrorStatusCode;

export default legalSlice.reducer;