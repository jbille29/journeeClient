import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false, username: null, userId: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { username, userId, accessToken } = action.payload;
            state.isAuthenticated = true;
            state.username = username;
            state.userId = userId;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.userId = null;
            state.token = null;
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.userId; 

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
