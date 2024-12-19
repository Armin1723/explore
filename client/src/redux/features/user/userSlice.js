import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:  JSON.parse(localStorage.getItem("user")) || {},
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload || {}; 
        },
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;