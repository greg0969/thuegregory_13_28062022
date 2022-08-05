import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 
import rootReducer from '../features/userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
    },
})