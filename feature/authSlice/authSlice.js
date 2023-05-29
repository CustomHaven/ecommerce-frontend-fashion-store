import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const loginGuestAuth = createAsyncThunk(
    "auth/loginGuestAuth",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { email, password } = args;
            console.log("we have the args?", args);
            console.log("email came through as well as in putted email: ", email);
            const user = await Promise.resolve(haven.loginGuestUser(email, password));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const refreshAuth = createAsyncThunk(
    "auth/refreshAuth",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { refresh_token } = args;
            console.log("we have the args?", args);
            const token = await Promise.resolve(haven.refreshUserAuth(refresh_token));
            return fulfillWithValue(token);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginProfile: {
        },
        loginLoading: false,
        loginError: false,

        loginErrorName: "",
        loginErrorStatusMessage: "",
        loginErrorStatusCode: 0,

        token_id: ""

    },
    extraReducers: builder => {
        builder
            .addCase(loginGuestAuth.pending, (state) => {
                state.loginLoading = true;
                state.loginError = false;
            })
            .addCase(loginGuestAuth.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.loginLoading = false;
                state.loginError = false;

                console.log("the action payloooad of user profile!!?!!", action.payload);

                state.loginProfile = action.payload.data;

                state.loginErrorName = "";
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "";
                state.loginErrorStatusCode = 0;

            })
            .addCase(loginGuestAuth.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = true;

                console.log("the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.loginProfile = {};

                state.loginErrorName = action.payload.name;
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "Something went wrong.";
                state.loginErrorStatusCode = action.payload.statusCode;
            })

            .addCase(refreshAuth.pending, (state) => {
                state.loginLoading = true;
                state.loginError = false;
            })
            .addCase(refreshAuth.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.loginLoading = false;
                state.loginError = false;

                console.log("REFRESHAUTH the action payloooad of user profile!!?!!", action.payload);

                state.loginProfile = action.payload.data;

                state.token_id = action.payload.data.refresh_token

                state.loginErrorName = "";
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "";
                state.loginErrorStatusCode = 0;

            })
            .addCase(refreshAuth.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = true;

                console.log("REFRESHAUTH the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.loginProfile = {};

                state.loginErrorName = action.payload.name;
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "Something went wrong.";
                state.loginErrorStatusCode = action.payload.statusCode;
            })
    }
});


export const selectLoginProfile = state => state.auth.loginProfile;
export const selectLoginLoading = state => state.auth.loginLoading;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginErrorName = state => state.auth.loginErrorName;
export const selectLoginErrorStatusMessage = state => state.auth.loginErrorStatusMessage;
export const selectLoginErrorStatusCode = state => state.auth.loginErrorStatusCode;


export default authSlice.reducer;