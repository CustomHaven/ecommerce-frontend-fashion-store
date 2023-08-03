import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const loginUserAuth = createAsyncThunk(
    "auth/loginUserAuth",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { email, password } = args;
            console.log("we have the args?", args);
            console.log("email came through as well as in putted email: ", email);
            const user = await Promise.resolve(haven.loginUser(email, password));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
)

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

export const logoutUserAuth = createAsyncThunk(
    "auth/logoutUserAuth",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            // const { } = args;
            const token = await Promise.resolve(haven.logoutUser());
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
    reducers: {
        loginPerson(state, action) {
            state.loginProfile = action.payload;
        },
        logoutPerson(state, action) {
            state.loginProfile = action.payload;
        },
        errorInLogin(state, action) {
            state.loginError = action.payload;
        },
        loadingLogin(state, action) {
            state.loginLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUserAuth.pending, (state) => {
                state.loginLoading = true;
                state.loginError = false;
            })
            .addCase(loginUserAuth.fulfilled, (state, action) => {

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
            .addCase(loginUserAuth.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = true;

                console.log("the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.loginProfile = {};

                state.loginErrorName = action.payload.name;
                state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                // state.loginErrorStatusMessage = "Something went wrong.";
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

                state.token_id = action.payload.data.refresh_token;

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
                state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                // state.loginErrorStatusMessage = "Something went wrong.";
                state.loginErrorStatusCode = action.payload.statusCode;
            })





            .addCase(logoutUserAuth.pending, (state) => {
                state.loginLoading = true;
                state.loginError = false;
            })
            .addCase(logoutUserAuth.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.loginLoading = false;
                state.loginError = false;

                console.log("LOGOUT the action payloooad of user profile!!?!!", action.payload);

                state.loginProfile = {};

                state.token_id = action.payload.data.refresh_token

                state.loginErrorName = "";
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "";
                state.loginErrorStatusCode = 0;

            })
            .addCase(logoutUserAuth.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = true;

                console.log("LOGOUT the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.loginProfile = {};

                state.loginErrorName = action.payload.name;
                // state.loginErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.loginErrorStatusMessage = "Something went wrong.";
                state.loginErrorStatusCode = action.payload.statusCode;
            })

            .addCase(HYDRATE, (state, action) => {
                console.log("HYDRATE LOGIN AUTH;", action.payload.auth);
                if (!action.payload.auth.loginProfile) {
                    return state;
                }
                state.loginProfile = action.payload.auth.loginProfile;
            })
    }
});

export const {
    loginPerson,
    logoutPerson,
    errorInLogin,
    loadingLogin
} = authSlice.actions;


export const selectLoginProfile = state => state.auth.loginProfile;
export const selectLoginLoading = state => state.auth.loginLoading;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginErrorName = state => state.auth.loginErrorName;
export const selectLoginErrorStatusMessage = state => state.auth.loginErrorStatusMessage;
export const selectLoginErrorStatusCode = state => state.auth.loginErrorStatusCode;


export default authSlice.reducer;