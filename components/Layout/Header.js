import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    MenuItem,
    Popover,
    Skeleton,
    Typography
} from "@mui/material"
import theme from "../../src/theme"
import { useSelector, useDispatch } from "react-redux"
import { toggleRightBar } from "../../redux-setup/dataSlice"
import { toggleNotifications } from "../../redux-setup/dataSlice"
import { useRouter } from "next/router"

function Header() {
    const router = useRouter()
    const path = router.pathname
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const rightPanelBar = useSelector((state) => state.dataSlice.rightPanelBar)
    const rightNotificationBar = useSelector(
        (state) => state.dataSlice.rightNotificationBar
    )
    const notificationstate = useSelector(
        (state) => state?.dataSlice?.rightNotificationBar
    )
    const rightBar = useSelector((state) => state?.dataSlice?.rightPanelBar)
    const [userName, setUserName] = useState(null)
    useEffect(() => {
        if (user) {
            setUserName({
                firstName: user?.firstName,
                lastName: user?.lastname
            })
        }
    }, [user])
    const [showlogout, setShowlogout] = useState(false)
    const [anchorEl, setAnchorEl] = useState("")

    return (
        <Box className="md-header">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    backgroundColor: "#FFFFFF",
                    mr: (rightPanelBar || rightNotificationBar) && {
                        lg: "-17px !important"
                    },
                    pr: (rightPanelBar || rightNotificationBar) && {
                        xl: "17px !important"
                    },
                    borderBottom: "1px solid #E0E0E0"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: { md: "22px", xs: "10px" },
                        my: "7.5px",
                        columnGap: 3
                    }}
                >
                    <Box>
                        {path !== "/" &&
                            (userName ? (
                                <Box
                                    onClick={() =>
                                        router.push({
                                            pathname: `/`
                                        })
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        columnGap: 2,
                                        cursor: "pointer",
                                        px: { md: 2, xs: 2 },
                                        py: 1.7,
                                        "&:hover": {
                                            backgroundColor: "#eee",
                                            borderRadius: {
                                                md: "8px",
                                                xs: "9999px"
                                            }
                                        },
                                        transition: "all 300ms ease-in-out"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mt: 0.4,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                                borderRadius: "9999px"
                                            },
                                            transition: "all 300ms ease-in-out"
                                        }}
                                    >
                                        <svg
                                            width={32}
                                            height={32}
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>user name</title>
                                            <g clipPath="url(#clip0_566_126229)">
                                                <path
                                                    d="M15.9998 9.33333V4H2.6665V28H29.3332V9.33333H15.9998ZM7.99984 25.3333H5.33317V22.6667H7.99984V25.3333ZM7.99984 20H5.33317V17.3333H7.99984V20ZM7.99984 14.6667H5.33317V12H7.99984V14.6667ZM7.99984 9.33333H5.33317V6.66667H7.99984V9.33333ZM13.3332 25.3333H10.6665V22.6667H13.3332V25.3333ZM13.3332 20H10.6665V17.3333H13.3332V20ZM13.3332 14.6667H10.6665V12H13.3332V14.6667ZM13.3332 9.33333H10.6665V6.66667H13.3332V9.33333ZM26.6665 25.3333H15.9998V22.6667H18.6665V20H15.9998V17.3333H18.6665V14.6667H15.9998V12H26.6665V25.3333ZM23.9998 14.6667H21.3332V17.3333H23.9998V14.6667ZM23.9998 20H21.3332V22.6667H23.9998V20Z"
                                                    fill="#5C5C5C"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_566_126229">
                                                    <rect
                                                        width={32}
                                                        height={32}
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Box>

                                    <Box
                                        aria-label={"Go to onboarding page"}
                                        sx={{
                                            display: {
                                                md: "block",
                                                xs: "none",
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                letterSpacing: "-0.011em",
                                                color: "rgba(0, 0, 0, 0.6)"
                                            }
                                        }}
                                    >
                                        All Sites
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    display={"flex"}
                                    sx={{
                                        alignItems: "center",
                                        gap: 2,
                                        p: "6.8px 8px"
                                    }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{
                                            borderRadius: "4px",
                                            width: 32,
                                            height: 32
                                        }}
                                    />
                                    <Skeleton
                                        sx={{
                                            display: {
                                                md: "block",
                                                xs: "none"
                                            },

                                            height: 24,
                                            width: 66
                                        }}
                                    />
                                </Box>
                            ))}
                    </Box>
                    <Box
                        onClick={() => {
                            dispatch(toggleNotifications(!notificationstate))
                            dispatch(toggleRightBar(false))
                        }}
                        sx={{
                            width: "46px",
                            height: "46px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            position: "relative",
                            "&:hover": {
                                backgroundColor: "#eee",
                                borderRadius: "9999px"
                            },
                            transition: "all 300ms ease-in-out"
                        }}
                    >
                        <svg
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is notification toggle icon</title>
                            <g clipPath="url(#clip0_143_80751)">
                                <path
                                    d="M16 29.333C17.4666 29.333 18.6666 28.133 18.6666 26.6663H13.3333C13.3333 28.133 14.5333 29.333 16 29.333ZM24 21.333V14.6663C24 10.573 21.8266 7.14634 18 6.23967V5.33301C18 4.22634 17.1066 3.33301 16 3.33301C14.8933 3.33301 14 4.22634 14 5.33301V6.23967C10.1866 7.14634 7.99998 10.5597 7.99998 14.6663V21.333L5.33331 23.9997V25.333H26.6666V23.9997L24 21.333ZM21.3333 22.6663H10.6666V14.6663C10.6666 11.3597 12.68 8.66634 16 8.66634C19.32 8.66634 21.3333 11.3597 21.3333 14.6663V22.6663Z"
                                    fill="#5C5C5C"
                                />
                            </g>
                            <defs>
                                <clipPath>
                                    <rect width={32} height={32} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Box>
                    <Button
                        id="user"
                        aria-label="Log out right panel"
                        onClick={(e) => {
                            setAnchorEl(document.getElementById("user"))
                            dispatch(toggleRightBar(!rightBar))
                            dispatch(toggleNotifications(false))
                        }}
                        sx={{
                            py: { xs: "6px" },
                            px: { xs: "4px", md: "10px", lg: "6px" },
                            color: theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: "#eee",
                                borderRadius: { md: "12px", xs: "12px" }
                            },
                            transition: "all 300ms ease-in-out",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        {/* {showlogout && (
                            <Box className="shadow">
                                <Popover
                                    className="shadow"
                                    open={showlogout}
                                    anchorEl={anchorEl}
                                    onClose={() => setShowlogout(false)}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    sx={{
                                        top: 5
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            cursor: "not-allowed",
                                            paddingRight: "50px",
                                            display: "flex ",
                                            justifyContent: "start",
                                            textAlign: "start",
                                            paddingY: "16px",
                                            fontSize: "12px",
                                            color: "#F44336"
                                        }}
                                        aria-label="Reset Project"
                                    >
                                        <svg
                                            style={{ marginRight: "8px" }}
                                            width={16}
                                            height={17}
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                                                fill="#F44336"
                                            />
                                        </svg>
                                        Logout
                                    </MenuItem>
                                </Popover>
                            </Box>
                        )} */}
                        {userName ? (
                            <Box
                                aria-label={`${userName ? userName : "N/A"}`}
                                sx={{
                                    height: "40px",
                                    width: "40px",
                                    fontSize: { xs: "18px", md: "16px" },
                                    fontWeight: { xs: "600", md: "500" },
                                    color: "white",
                                    borderRadius: "8px",
                                    backgroundColor: "#767676",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {userName ? userName?.firstName[0] : "N/A"}
                            </Box>
                        ) : (
                            <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                            />
                        )}
                        {userName ? (
                            <Typography
                                aria-label={`${userName ? userName : "N/A"}`}
                                sx={{
                                    ml: { xs: 2, md: 3.5, lg: 4 },
                                    color: "#1E1E1E",
                                    lineHeight: { xs: "24px" },
                                    display: { xs: "none", md: "block" },
                                    textTransform: "none"
                                }}
                            >
                                {userName ? userName?.firstName : "N/A"}{" "}
                                {userName?.lastName}
                            </Typography>
                        ) : (
                            <Skeleton
                                height={24}
                                sx={{
                                    ml: { xs: 2, md: 3.5, lg: 4 },
                                    display: { xs: "none", md: "block" }
                                }}
                                width={66}
                            />
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
