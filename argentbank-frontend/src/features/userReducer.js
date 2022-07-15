import { produce } from "immer";

const initialState = {
    token: localStorage.getItem("token"),
    profile: {},
  };
  export const saveToken = (token) => ({ type: "saveToken", payload: token });
  export const deleteToken = () => ({ type: "deleteToken" });
  export const saveProfile = (profile) => ({ type: "saveProfile", payload: profile});
  export const resetProfile = () => ({type: "resetProfile"});
  
  export default function userReducer(state = initialState, action) {
    
    if (action.type === "saveToken") {
      localStorage.setItem("token", action.payload);
      return produce(state, (draft) => {
        draft.token = action.payload;
      });
    }
  
    if (action.type === "deleteToken") {
      localStorage.removeItem("token");
      return produce(state, (draft) => {
        draft.token = "";
      });
    }
  
    if (action.type === "saveProfile") {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    }
  
    if (action.type === "resetProfile") {
      return produce(state, (draft) => {
        draft.profile = "";
      });
    }
    return state;
  }
  