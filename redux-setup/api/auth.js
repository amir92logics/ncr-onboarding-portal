import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const base = process.env.NEXT_PUBLIC_BASE_URL
export const authProfile = createApi({
    reducerPath: "authProfile",
    baseQuery: fetchBaseQuery({
        baseUrl: base,
        credentials: "include",
        // mode: "cors"
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (username) => `/ncr/user/profile/${username}`
        })
    })
})
export const { useLazyGetProfileQuery } = authProfile
