import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../utils/reducers/LoginReducer";
import userReducer from "../utils/reducers/UserReducer";

// creation du store et des reducer

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});
