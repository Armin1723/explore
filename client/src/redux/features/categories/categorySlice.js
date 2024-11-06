import { createSlice } from "@reduxjs/toolkit";
import { categoriesBackup } from "../../../utils";

    const categoriesData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
    .then((res) => res.json())
    .then((data) => data.categories)
    .catch((err) => {
      console.log(err);
      return categoriesBackup;
    });

const categorySlice = createSlice({
  name: "categories",
  initialState: categoriesData,
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
