import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice.js'
import userReducer from './user-slice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
});

export default store;