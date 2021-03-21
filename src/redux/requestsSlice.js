import {  createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
  initialState: [],
  reducers: {
    setRequests(state, action){
        // console.log("state", state, action)
       state.push(...action.payload)
        // console.log(state)
    },
  }
})

export const {setRequests} = requestsSlice.actions
export default requestsSlice.reducer