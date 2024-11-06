import { createSlice } from "@reduxjs/toolkit";

const redirectFlagSlice = createSlice({
    name: 'redirectFlag',
    initialState: localStorage.getItem('redirectFlag') ? JSON.parse(localStorage.getItem('redirectFlag')) : false,
    reducers: {
        toggleRedirectFlag: (state) =>{
            localStorage.setItem('redirectFlag', !state)
            return !state
        }
    }
})

export const { toggleRedirectFlag } = redirectFlagSlice.actions

export default redirectFlagSlice.reducer