import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    zId: null,
    username: null,
    status: null,
    is_api_key_valid: null,
    user: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login: (state, action) => {
            state.zId = action.payload.zId
            state.username = action.payload.username
            state.status = action.payload.status
            state.is_api_key_valid = action.payload.is_api_key_valid
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.zId = null
            state.username = null
            state.status = null
            state.is_api_key_valid = null
            localStorage.clear()
        }
    }
})

export const { logout, login, setUser } = authSlice.actions
export default authSlice.reducer
