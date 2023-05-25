import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { login, setUser, logout } from "../../redux-setup/authSlice"
import { CircularProgress, Box } from "@mui/material"
import { CheckAuthentication, GetLocalStorageAuth } from "../../helper"
import {
    useGetProfileQuery,
    useLazyGetProfileQuery
} from "../../redux-setup/api/auth"

const Auth = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const state = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const username = localStorage?.getItem("username")
    const [usertrigger] = useLazyGetProfileQuery()
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_APP_ENV === "development") {
            localStorage.setItem("username", "egula1")
            localStorage.setItem("status", "authenticated")
        }
        // setting User from  API data
        if (username) {
            usertrigger(username)
                .unwrap()
                .then((res) => dispatch(setUser(res)))
                .catch((err) => {
                    dispatch(logout())
                    window.location.href =
                        process.env.NEXT_PUBLIC_NCR_BASE_URL + "/login"
                })
        }
        checkUserAuth()
    }, [username])
    const checkUserAuth = async () => {
        const authenticated = await CheckAuthentication()
        if (authenticated) {
            dispatch(login(GetLocalStorageAuth()))
            setLoading(false)
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
            // router.push("/login")
            window.location.href =
                process.env.NEXT_PUBLIC_NCR_BASE_URL + "/login"
            setLoading(false)
        }
    }

    if (authenticated) {
        return <>{children} </>
    } else {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minHeight: "100vh"
                    }}
                >
                    <CircularProgress />
                </Box>{" "}
            </>
        )
    }
}

export default Auth
