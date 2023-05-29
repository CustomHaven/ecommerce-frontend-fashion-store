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
    },
    reducers: {
        saveEmailAddress(state, action) {
            state.email = action.payload;
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
    }
});

export const {
    saveEmailAddress
} = userSlice.actions;


export const selectEmail = state => state.user.email;
export const selectAdmin = state => state.user.is_admin;
export const selectGuest = state => state.user.is_guest;

export const selectUserProfile = state => state.user.userProfile;
export const selectUserLoading = state => state.user.userLoading;
export const selectUserFindEmailError = state => state.user.userFindEmailError;

export default userSlice.reducer;