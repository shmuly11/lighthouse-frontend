import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import requestsReducer from './requestsSlice'


export default configureStore({
  reducer: {
      user: userReducer,
      requests: requestsReducer
  }
})