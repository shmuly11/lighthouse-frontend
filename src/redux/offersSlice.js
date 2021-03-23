import {  createSlice } from "@reduxjs/toolkit";

const offersSlice = createSlice({
    name: 'requests',
  initialState: [],
  reducers: {
    setOffers: (state, action) =>{
        // console.log("state", state, action)
       return action.payload
        // console.log(state)
    },
    addOffer: (state, action) => {
        state.push(action.payload)
    },
    removeOffer: (state, action) => {
        
        const updated = state.filter(project => project.id !== action.payload.id)
        return updated
    },
    updateRequest: (state, action)=> {
      const request = state.find(request => request.id === action.payload.id)
      
    }
  }
})

export const {setOffers, addOffer, removeOffer} = offersSlice.actions
export default offersSlice.reducer