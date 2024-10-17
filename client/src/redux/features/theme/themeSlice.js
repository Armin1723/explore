import { createSlice } from '@reduxjs/toolkit'

const localValue = localStorage.getItem('theme') || 'light'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: localValue,
  },
  reducers: { 
    toggleTheme : (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', JSON.parse(JSON.stringify(state.value)))
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer