import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        game: {
            active: true,
            lives: 3
        },
        modal: false,
    },
    reducers: {
        playGame(state, action) {
            state.game.active = action.payload;
        },
        hitpoints(state, action) {
            state.game.lives = action.payload;
        },
        modalOptions(state, action) {
            state.modal = action.payload;
        }
    }
});

export const {
    playGame,
    hitpoints,
    modalOptions,
} = errorSlice.actions;

export const selectGameActive = state => state.error.game.active;
export const selectGameLives = state => state.error.game.lives;
export const selectModal = state => state.error.modal;

export default errorSlice.reducer;