import { createSlice } from '@reduxjs/toolkit';


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
        headerRef: null
    },
    reducers: {
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

export const { mainRef, mainCurrent, fireMainMarginTop, fireNavHeader, fireNavCanvaHeight, placeHeroRef, placeHeaderRef } = componentSlice.actions;
export const selectMain = state => state.components.main;
export const selectMainCurrent = state => state.components.mainCurrent;
export const selectMainMarginTop = state => state.components.mainMarginTop;
export const selectNavHeader = state => state.components.navHeader;
export const selectNavCanvaHeight = state => state.components.navCanvaHeight;
export const selectHeroRef = state => state.components.heroRef;
export const selectHeaderRef = state => state.components.headerRef;
export default componentSlice.reducer;