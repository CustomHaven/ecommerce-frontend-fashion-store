import { createSlice } from '@reduxjs/toolkit';

// Looks like will delete this entire slice all states proved useless

const componentSlice = createSlice({
    name: 'components',
    initialState: {
        main: "",
        mainCurrent: {},
        // mainMarginTop: 115,
        mainMarginTop: 0,
        navHeader: 115,
        navCanvaHeight: 110,
        heroRef: null,
        headerRef: null,
        checkOutContactDetailRef: null,
        asideSwitch: true,
        pageListingController: 4,
        pageListedArrayStorage: [],
        pageIndex: 1,
        slideMultiplier: 1,
        adminOptionMenu: false,
        slidesPagesIndex: Infinity,
        firstList: 1,
        lastList: 0,

        adminSideIndexing: 0,
        logoutBool: true,

        productsDirectionsHelper: 0,
        subCatPathLocation: "",
        featureProducts: 0,
        celebrateNewOrder: false
    },
    reducers: {
        toggleCelebrateNewOrder(state, action) {
            state.celebrateNewOrder = action.payload;
        },
        updateFeatureProducts(state, action) {
            state.featureProducts = action.payload;
        },
        changeSubCatPathLocation(state, action) {
            state.subCatPathLocation = action.payload;
        },
        controlProductDirectionHelper(state, action) {
            state.productsDirectionsHelper = action.payload;
        },
        defaultLogoutFeature(state, action) {
            state.logoutBool = action.payload;
        },
        controlAdminSideBar(state, action) {
            state.adminSideIndexing = action.payload;
        },
        controlFirstList(state, action) {
            state.firstList = action.payload;
        },
        controlLastList(state, action) {
            state.lastList = action.payload;
        },
        controlSlidePagesIndex(state, action) {
            state.slidesPagesIndex = action.payload;
        },
        controlOptionMenu(state, action) {
            state.adminOptionMenu = action.payload;
        },
        controlPageListing(state, action) {
            state.pageListingController = action.payload;
        },
        storePageListingArray(state, action) {
            state.pageListedArrayStorage = action.payload;
        },
        controlPageIndex(state, action) {
            state.pageIndex = action.payload;
        },
        controlSlideMultiplier(state, action) {
            state.slideMultiplier = action.payload;
        },
        adminHeaderController(state, action) {
            state.asideSwitch = action.payload;
        },
        saveCheckOutContactDetailDiv(state, action) {
            state.checkOutContactDetailRef = action.payload;
        },
        mainRef(state, action) {
            state.main = action.payload;
        },
        mainCurrent(state, action) {
            state.mainCurrent = action.payload;
        },
        fireMainMarginTop(state, action) {
            state.mainMarginTop = action.payload;
        },
        fireNavHeader(state, action) {
            state.navHeader = action.payload;
        },
        fireNavCanvaHeight(state, action) {
            state.navCanvaHeight = action.payload;
        },
        placeHeroRef(state, action) {
            state.heroRef = action.payload;
        },
        placeHeaderRef(state, action) {
            state.headerRef = action.payload;
        }
    },
    extraReducers: {
    }
});

export const { mainRef, 
    adminHeaderController,
    mainCurrent, 
    fireMainMarginTop, 
    fireNavHeader, 
    fireNavCanvaHeight, 
    placeHeroRef, 
    placeHeaderRef, 
    saveCheckOutContactDetailDiv,
    controlPageListing,
    storePageListingArray,
    controlPageIndex,
    controlSlideMultiplier,
    controlOptionMenu,
    controlSlidePagesIndex,
    controlFirstList,
    controlLastList,
    controlAdminSideBar,
    defaultLogoutFeature,
    controlProductDirectionHelper,
    changeSubCatPathLocation,
    updateFeatureProducts,
    toggleCelebrateNewOrder } = componentSlice.actions;


export const selectCelebrateNewOrder = state => state.components.celebrateNewOrder;
export const selectFeatureProducts = state => state.components.featureProducts;
export const selectSubCatPathLocation = state => state.components.subCatPathLocation;
export const selectProductsDirectionsHelper = state => state.components.productsDirectionsHelper;

export const selectPageListingController = state => state.components.pageListingController;
export const selectPageListedArrayStorage = state => state.components.pageListedArrayStorage;
export const selectPageIndex = state => state.components.pageIndex;
export const selectSlideMultiplier = state => state.components.slideMultiplier;
export const selectAdminOptionMenu = state => state.components.adminOptionMenu;
export const selectSlidesPagesIndex = state => state.components.slidesPagesIndex;

export const selectFirstList = state => state.components.firstList;
export const selectLastList = state => state.components.lastList;

export const selectAdminSideIndex = state => state.components.adminSideIndexing;
export const selectLogoutBool = state => state.components.logoutBool;



export const selectMain = state => state.components.main;
export const selectMainCurrent = state => state.components.mainCurrent;
export const selectMainMarginTop = state => state.components.mainMarginTop;
export const selectNavHeader = state => state.components.navHeader;
export const selectNavCanvaHeight = state => state.components.navCanvaHeight;
export const selectHeroRef = state => state.components.heroRef;
export const selectHeaderRef = state => state.components.headerRef;
export const selectCheckOutContactDetailRef = state => state.components.checkOutContactDetailRef;
export const selectAsideSwitch = state => state.components.asideSwitch;

export default componentSlice.reducer;