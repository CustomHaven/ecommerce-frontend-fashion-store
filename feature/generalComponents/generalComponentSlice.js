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
        asideSwitch: true
    },
    reducers: {
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
    saveCheckOutContactDetailDiv } = componentSlice.actions;

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