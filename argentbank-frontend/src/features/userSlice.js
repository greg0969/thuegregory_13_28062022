import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        token: null,
        currentUser: {}
    },
    reducers: {
        getToken : (state, token) => {
            state.token = token.payload
        },

        logIn: (state) => {
            state.loggedIn = true
            
        },
        userInfo: (state, user) => {            
            state.currentUser = user.payload
        }
        ,
        updateInfo: (state, user) => {
            state.currentUser.firstName = user.payload.firstName
            state.currentUser.lastName = user.payload.lastName

        },

        logOut: (state) => {
            state.currentUser = {}
            state.loggedIn = false
            state.token = null
        }

    }
})

export const {logIn, userInfo, updateInfo, logOut, getToken} = userSlice.actions

export default userSlice.reducer