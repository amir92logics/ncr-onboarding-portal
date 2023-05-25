import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import { useSelector, useDispatch } from "react-redux"
import { toggleRightBar } from "../../redux-setup/dataSlice"
import { Divider, Typography } from "@mui/material"
import { useState } from "react"
import theme from "../../src/theme"
import { logout } from "../../redux-setup/authSlice"
import { useRouter } from "next/router"
export default function LogoutRightBar() {
    const state = useSelector((gloablState) => gloablState)
    const [loggedIn, setLoggedIN] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 320,
                display: "flex",
                flexDirection: "column"
                // padding: "0px 24px"
            }}
            role="presentation"
            // onClick={() => {
            //     dispatch(toggleRightBar(false))
            // }}
            // onKeyDown={() => {
            //     dispatch(toggleRightBar(false))
            // }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 0px 0px 24px"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        lineHighlight: "32px",
                        fontWeight: "700",
                        color: "inherit"
                    }}
                >
                    Your Account
                </Typography>
                <Button
                
                onClick={() => {
                    dispatch(toggleRightBar(false))
                }}
                    sx={{
                        py:"16px",
                        m:"4px",
                        "&:hover": {
                            backgroundColor: "#eee",
                            borderRadius: "9999px"
                        },
                        transition: "all 300ms ease-in-out"
                    }}
                >
                    <svg
                        cursor={"pointer"}
                      
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is Your Account icon</title> 
                        <path
                            d="M19.0005 6.41L17.5905 5L12.0005 10.59L6.41049 5L5.00049 6.41L10.5905 12L5.00049 17.59L6.41049 19L12.0005 13.41L17.5905 19L19.0005 17.59L13.4105 12L19.0005 6.41Z"
                            fill="black"
                            fillOpacity="0.6"
                        />
                    </svg>
                </Button>
            </Box>

            <Divider className="divider-col" />
            <Box sx={{ marginY: "16px" }}>
                <Button
                    sx={{
                        borderRadius: "8px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        textTransform: "none",
                        marginX: "auto",
                        fontSize: "14px",
                        lineHeight: "32px",
                        fontWeight: "500",
                        paddingX: "8px",
                        paddingY: "6px",
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                        "&:hover": { background: "#f5f6ff" }
                    }}
                    onClick={() => {
                        dispatch(logout())
                        // router.push("/login")
                        window.location.href =
                            process.env.NEXT_PUBLIC_NCR_BASE_URL + "/login"
                    }}
                >
                    Log Out
                </Button>
            </Box>
        </Box>
    )

    return (
        <div>
            <Drawer
                className="drawer"
                anchor={"right"}
                open={state?.dataSlice?.rightPanelBar}
                onClose={() => {
                    dispatch(toggleRightBar(false))
                }}
            >
                {list("right")}
            </Drawer>
        </div>
    )
}
