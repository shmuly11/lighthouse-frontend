import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import requestsReducer from './requestsSlice'
import offersReducer from './offersSlice'


export default configureStore({
  reducer: {
      user: userReducer,
      requests: requestsReducer,
      offers: offersReducer
  }
})