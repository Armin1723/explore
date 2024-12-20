import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("user")) ;

const userSlice = createSlice({
    name: "user",
    initialState:  (userData && userData?.profilePic ) ? userData : {},
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload || {}; 
        },
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;