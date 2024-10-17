import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'
import userReducer from './features/user/userSlice'

export default configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
})