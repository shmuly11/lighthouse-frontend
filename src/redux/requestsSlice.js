import {  createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
  initialState: [],
  reducers: {
    setRequests: (state, action) =>{
        // console.log("state", state, action)
       return action.payload
        // console.log(state)
    },
    addRequest: (state, action) => {
        state.push(action.payload)
    },
    removeRequest: (state, action) => {
        
        const updated = state.filter(project => project.id !== action.payload.id)
        return updated
    },
    updateRequest: (state, action)=> {
      const request = state.find(request => request.id === action.payload.id)

    }
  }
})

export const {setRequests, addRequest, removeRequest} = requestsSlice.actions
export default requestsSlice.reducer