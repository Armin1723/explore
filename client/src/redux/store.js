import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'
import userReducer from './features/user/userSlice'
import categoryReducer from './features/categories/categorySlice'
import redirectFlagReducer from './features/redirectFlag/redirectFlagSlice'

export default configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    categories: categoryReducer,
    redirectFlag: redirectFlagReducer
  },
})