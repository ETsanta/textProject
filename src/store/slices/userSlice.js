// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Guest',
  age: 0,
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.name = action.payload.name || 'User'
      state.age = action.payload.age || 18
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.name = 'Guest'
      state.age = 0
    },
    updateProfile: (state, action) => {
      state.name = action.payload.name || state.name
      state.age = action.payload.age || state.age
    }
  }
})

export const { login, logout, updateProfile } = userSlice.actions
export default userSlice.reducer