import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
// import { applyMiddleware } from 'redux'; 
// import thunk from 'redux-thunk'; 

export default configureStore({
    reducer: {
        user: userReducer,
    },
})