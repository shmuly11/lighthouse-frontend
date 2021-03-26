import {  createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
    name: 'community',
  initialState: JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).communities[0] : {},
  reducers: {
    setCommunity(state, action){
        // console.log("state", state, action)
       return state = action.payload
        // console.log(state)
    },
  }
})

export const {setCommunity} = communitySlice.actions
export default communitySlice.reducer