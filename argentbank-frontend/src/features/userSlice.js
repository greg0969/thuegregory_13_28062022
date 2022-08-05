import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        token: null,
        currentUser: {}
    },
    reducers: {
        logIn: (state, token, payload) => {
            state.loggedIn = true
            state.token = token.payload
            
        },
        setUser: (state, user) => {
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

export const {logIn, setUser, updateInfo, logOut} = userSlice.actions

export default userSlice.reducer