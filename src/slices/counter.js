// /slices/counter.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload
    },
    decrement: (state, action) => {
      state.value -= action.payload
    }
  },
  extraReducers: {

  }
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
