import {  createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
  initialState: JSON.parse(localStorage.getItem('currentUser')) || null,
  reducers: {
    setUser(state, action){
        // console.log("state", state, action)
       return state = action.payload
        // console.log(state)
    },
  }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer