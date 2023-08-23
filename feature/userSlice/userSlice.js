import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const findUserByEmailThunk = createAsyncThunk(
    "user/findUserByEmailThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { email } = args;
            console.log("email came through as well as in putted email: ", email);
            const user = await Promise.resolve(haven.findUserByEmail(email));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const saveNewGuestThunk = createAsyncThunk(
    "user/saveNewGuestThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { email } = args;
            console.log("email came through as well as in putted email: ", email);
            const user = await Promise.resolve(haven.saveNewGuest(email));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const saveNewUserThunk = createAsyncThunk(
    "user/saveNewUserThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { email, password, confirmPassword, emailCampaign } = args;
            console.log("email came through as well as in putted email: ", email);
            console.log(args);
            const user = await Promise.resolve(haven.registerUser(email, password, confirmPassword, emailCampaign));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const allUsersOrdersThunk = createAsyncThunk(
    "user/allUsersOrdersThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        const { refreshed_token } = args;
        try {
            // const { } = args;
            const user = await Promise.resolve(haven.findAllUsersOrders(refreshed_token));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userProfile: {
        },
        userLoading: false,
        userFindEmailError: false,
        email: "",
        is_admin: false,
        is_guest: false,

        userProfileErrorName: "",
        userProfileErrorStatusMessage: "",
        userProfileErrorStatusCode: 0,


        emailErrorName: "",
        emailErrorStatusMessage: "",
        emailErrorStatusCode: 0,

        allUsersOrdersLoading: false,
        allUsersOrdersError: false,
        allUsersOrders: [],
        allUsersOrdersStatusCode: 200,
        allUsersOrdersStatusText: "",
        allUsersOrdersStatusMessage: "",
    },
    reducers: {
        completeResetUserStates(state) {
            state.userProfile = {};
            state.email = "";
        },
        saveEmailAddress(state, action) {
            state.email = action.payload;
        },
        userLogedout(state, action) {
            state.userProfile = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(findUserByEmailThunk.pending, (state) => {
                state.userLoading = true;
                state.userFindEmailError = false;
            })
            .addCase(findUserByEmailThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.userLoading = false;
                state.userFindEmailError = false;

                console.log("the action payloooad of user profile!!?!!", action.payload);

                state.userProfile = action.payload.data;

            })
            .addCase(findUserByEmailThunk.rejected, (state, action) => {
                state.userLoading = false;
                state.userFindEmailError = true;

                console.log("the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.userProfile = {};

                state.emailErrorName = action.payload.name;
                state.emailErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.emailErrorStatusCode = action.payload.statusCode;
            })

            // ---------------------------------- SAVE NEW GUEST USER! --------------------------------- //

            .addCase(saveNewGuestThunk.pending, (state) => {
                state.userLoading = true;
                state.userFindEmailError = false;
            })
            .addCase(saveNewGuestThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.userFindEmailError = false;

                state.emailErrorName = ""; 
                state.emailErrorStatusMessage = "";
                state.emailErrorStatusCode = 0; 

                state.userLoading = false;
                state.userFindEmailError = false;

                console.log("the action payloooad of user profile!!?!!", action.payload);

                state.userProfile = action.payload.data;

            })
            .addCase(saveNewGuestThunk.rejected, (state, action) => {
                state.userLoading = false;
                state.userFindEmailError = true;

                console.log("the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.userProfile = {};

                state.userProfileErrorName = action.payload.name;

                // look up how the rejected message is being sent up here!
                state.userProfileErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.userProfileErrorStatusCode = action.payload.statusCode;
            })


            // ---------------------------------- SAVE NEW USER! --------------------------------- //

            .addCase(saveNewUserThunk.pending, (state) => {
                state.userLoading = true;
                state.userFindEmailError = false;
            })
            .addCase(saveNewUserThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.userFindEmailError = false;

                state.emailErrorName = ""; 
                state.emailErrorStatusMessage = "";
                state.emailErrorStatusCode = 0; 

                state.userLoading = false;
                state.userFindEmailError = false;

                console.log("the action payloooad of user profile!!?!!", action.payload);

                state.userProfile = action.payload.data;

            })
            .addCase(saveNewUserThunk.rejected, (state, action) => {
                state.userLoading = false;
                state.userFindEmailError = true;

                console.log("the action payloooad of user REJECTED!!!!?!!", action.payload);

                state.userProfile = {};

                state.userProfileErrorName = action.payload.name;

                // look up how the rejected message is being sent up here!
                state.userProfileErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.userProfileErrorStatusCode = action.payload.statusCode;
            })

            .addCase(allUsersOrdersThunk.pending, (state) => {
                state.allUsersOrdersLoading = true;
                state.allUsersOrdersError = false;
            })
            .addCase(allUsersOrdersThunk.fulfilled, (state, action) => {

                // console.log("the fulfilled payload??", action);

                state.allUsersOrdersLoading = false;
                state.allUsersOrdersError = false;

                state.allUsersOrders = action.payload.data;

                state.allUsersOrdersStatusCode = action.payload.statusCode;
                state.allUsersOrdersStatusText = action.payload.statusText;
                state.allUsersOrdersStatusMessage = "";
            })
            .addCase(allUsersOrdersThunk.rejected, (state, action) => {
                state.allUsersOrdersLoading = false;
                state.allUsersOrdersError = true;

                state.allUsersOrders = [];

                state.allUsersOrdersStatusCode = action.payload.statusCode;
                state.allUsersOrdersStatusText = action.payload.statusText;
                // state.bestSellerStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
                state.allUsersOrdersStatusMessage = action.payload.message //.split(":")[1].replace(/["'{}]/g, "");
            })
    }
});

export const {
    completeResetUserStates,
    saveEmailAddress,
    userLogedout
} = userSlice.actions;


export const selectEmail = state => state.user.email;
export const selectAdmin = state => state.user.is_admin;
export const selectGuest = state => state.user.is_guest;

export const selectUserProfile = state => state.user.userProfile;
export const selectUserLoading = state => state.user.userLoading;
export const selectUserFindEmailError = state => state.user.userFindEmailError;


export const selectUsersOrdersLoading = state => state.user.allUsersOrdersLoading;
export const selectUsersOrdersError = state => state.user.allUsersOrdersError;
export const selectUsersOrders = state => state.user.allUsersOrders;
export const selectUsersOrdersStatusCode = state => state.user.allUsersOrdersStatusCode;
export const selectUsersOrdersStatusText = state => state.user.allUsersOrdersStatusText;
export const selectUsersOrdersStatusMessage = state => state.user.allUsersOrdersStatusMessage;





export default userSlice.reducer;