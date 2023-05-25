import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authProfile } from "../redux-setup/api/auth"
import { projectData } from "../redux-setup/api/data"
import dataSlice from "../redux-setup/dataSlice"
import authSlice from "../redux-setup/authSlice"

const reducer = combineReducers({
    auth: authSlice,
    dataSlice,
    [authProfile.reducerPath]: authProfile.reducer,
    [projectData.reducerPath]: projectData.reducer
})
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(authProfile.middleware)
            .concat(projectData.middleware)
})
setupListeners(store.dispatch)
export default store
