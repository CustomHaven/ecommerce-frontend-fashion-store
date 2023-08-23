import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import haven from "../../utils/haven-api";

export const saveContactDetailThunk = createAsyncThunk(
    "contactDetail/saveContactDetailThunk",
    async (args, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const { userId, bodyObj, refreshed_token, loginStage } = args;
            console.log("ARGS FOR saveContactDetailThunk ARGS! we have the args?", args);
            const user = await Promise.resolve(haven.saveContactDetails(userId, {
                first_name: bodyObj.firstName,
                last_name: bodyObj.lastName,
                address_line1: bodyObj.addressLine1,
                address_line2: bodyObj.addressLine2,
                town_city: bodyObj.townCity,
                zip_code: bodyObj.postcode,
                country: bodyObj.country,
                phone_number: bodyObj.phoneNumber
            }, refreshed_token, loginStage));
            return fulfillWithValue(user);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

const contactDetailSlice = createSlice({
    name: "contactDetail",
    initialState: {
        contactLoading: false,
        contactError: false,
        contactErrorName: "",
        contactErrorStatusMessage: "",
        contactErrorStatusCode: 0,
        contactDetail: {
        },
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        townCity: "",
        postcode: "",
        country: "",
        countryCode: "",
        phoneNumber: "",
        fullPhoneNumber: "",
        deliverTo: ""
    },
    reducers: {
        fullResetContactDetails(state) {
            state.contactDetail = {};
            state.firstName = "";
            state.lastName = "";
            state.addressLine1 = "";
            state.addressLine2 = "";
            state.townCity = "";
            state.postcode = "";
            state.country = "";
            state.countryCode = "";
            state.phoneNumber = "";
            state.fullPhoneNumber = "";
            state.deliverTo = "";
        },
        saveFirstName(state, action) {
            state.firstName = action.payload;
        },
        saveLastName(state, action) {
            state.lastName = action.payload;
        },
        saveAddressLine1(state, action) {
            state.addressLine1 = action.payload;
        },
        saveAddressLine2(state, action) {
            state.addressLine2 = action.payload;
        },
        saveTownCity(state, action) {
            state.townCity = action.payload;
        },
        savePostcode(state, action) {
            state.postcode = action.payload;
        },
        saveCountry(state, action) {
            state.country = action.payload;
        },
        saveCountryCode(state, action) {
            state.countryCode = action.payload;
        },
        savePhoneNumber(state, action) {
            state.phoneNumber = action.payload;
        },
        saveDeliverTo(state, action) {
            state.deliverTo = action.payload;
        },
        saveFullPhoneNumber(state, action) {
            state.fullPhoneNumber = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(saveContactDetailThunk.pending, (state) => {
                state.contactLoading = true;
                state.contactError = false;
            })
            .addCase(saveContactDetailThunk.fulfilled, (state, action) => {

            // console.log("the fulfilled payload??", action);

                state.contactLoading = false;
                state.contactError = false;

                console.log("the action payloooad of CONTACT DETAILS!!?!!", action.payload);

                state.contactDetail = action.payload.data;

                state.contactErrorName = "";
                // state.contactErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.contactErrorStatusMessage = "";
                state.contactErrorStatusCode = 0;

            })  
            .addCase(saveContactDetailThunk.rejected, (state, action) => {
                state.contactLoading = false;
                state.contactError = true;

                console.log("the action payloooad of CONTACT DETAIL BEIN REJECTED!!!!?!!", action.payload);

                state.contactDetail = {};

                state.contactErrorName = action.payload.name;
                // state.contactErrorStatusMessage = action.payload.message.split(":")[1].replace(/["'{}\\\/]/g, "");
                state.contactErrorStatusMessage = "Something went wrong.";
                state.contactErrorStatusCode = action.payload.statusCode;
            })
    }
});

export const {
    fullResetContactDetails,
    saveFirstName,
    saveLastName,
    saveAddressLine1,
    saveAddressLine2,
    saveTownCity,
    savePostcode,
    saveCountry,
    saveCountryCode,
    savePhoneNumber,
    saveFullPhoneNumber,
    saveDeliverTo
} = contactDetailSlice.actions;


export const selectFirstName = state => state.contactDetail.firstName;
export const selectLastName = state => state.contactDetail.lastName;
export const selectAddressLine1 = state => state.contactDetail.addressLine1;
export const selectAddressLine2 = state => state.contactDetail.addressLine2;
export const selectTownCity = state => state.contactDetail.townCity;
export const selectPostcode = state => state.contactDetail.postcode;
export const selectCountry = state => state.contactDetail.country;
export const selectCountryCode = state => state.contactDetail.countryCode;
export const selectPhoneNumber = state => state.contactDetail.phoneNumber;
export const selectFullPhoneNumber = state => state.contactDetail.fullPhoneNumber;
export const selectDeliverTo = state => state.contactDetail.deliverTo;


export const selectContactDetail = state => state.contactDetail.contactDetail;
export const selectContactLoading = state => state.contactDetail.contactLoading;
export const selectContactError = state => state.contactDetail.contactError;
export const selectContactErrorName = state => state.contactDetail.contactErrorName;
export const selectContactErrorStatusMessage = state => state.contactDetail.contactErrorStatusMessage;
export const selectContactErrorStatusCode = state => state.contactDetail.contactErrorStatusCode;

export default contactDetailSlice.reducer;