import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:  JSON.parse(localStorage.getItem("user")) || null,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload)
        state = JSON.parse(JSON.stringify(action.payload));
        localStorage.setItem("user", JSON.stringify(action.payload));
        },
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;