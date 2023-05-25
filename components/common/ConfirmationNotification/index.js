import {
    CircularProgress,
    circularProgressClasses,
    Dialog,
    DialogContent,
    Typography,
    useMediaQuery
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import ErrorIcon from "@mui/icons-material/Error"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import theme from "../../../src/theme"
import { useRouter } from "next/router"
import WarningIcon from "@mui/icons-material/Warning"
function FacebookCircularProgress(props) {
    return (
        <Box sx={{ position: "relative" }}>
            <CircularProgress
                aria-label="This is a circular progress bar"
                variant="determinate"
                sx={{
                    color: "#F5F6FF"
                }}
                size={32}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                aria-label="This is a circular progress bar"
                variant="indeterminate"
                disableShrink
                sx={{
                    animationDuration: "750ms",
                    position: "absolute",
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round"
                    }
                }}
                size={32}
                thickness={4}
                {...props}
            />
        </Box>
    )
}
const handlecontent = (title, open, pathname, close) => {
    switch (open) {
        case "loading":
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "start" },
                        flexDirection: {
                            xs: "column"
                        },
                        height: { xs: "100%", md: "auto" },
                        m: "auto",
                        width: { xs: "100% ", md: 496 },
                        justifyContent: {
                            xs: "center"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "center", md: "start" },
                            flexDirection: {
                                xs: "column-reverse",
                                md: "row"
                            },
                            gap: 4,
                            width: { xs: "100% ", md: 496 },
                            justifyContent: {
                                xs: "center",
                                md: "space-between"
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                maxWidth: { xs: "100%", md: 378 },
                                width: "100%",
                                fontWeight: 900,
                                fontSize: "20px",
                                textAlign: { xs: "center", md: "left" },
                                lineHeight: "32px",

                                justifyContent: { xs: "center", md: "start" },
                                color: theme.palette.textColor.main
                            }}
                        >
                            Submitting {title}
                        </Typography>
                        <FacebookCircularProgress />
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: { xs: 2, md: 3 },
                            fontSize: "16px",
                            lineHeight: "24px",
                            textAlign: { xs: "center", md: "left" }
                        }}
                    >
                        Please wait while we submit your provided information.
                    </Typography>
                </Box>
            )
        case "confirm":
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "start" },
                        flexDirection: {
                            xs: "column"
                        },
                        height: { xs: "100%", md: "auto" },
                        m: "auto",
                        width: { xs: "100% ", md: 496 },
                        justifyContent: {
                            xs: "center"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "center", md: "start" },
                            flexDirection: {
                                xs: "column-reverse",
                                md: "row"
                            },
                            gap: 4,
                            width: { xs: "100% ", md: 496 },
                            justifyContent: {
                                xs: "center",
                                md: "space-between"
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                maxWidth: { xs: "100%", md: 378 },
                                width: "100%",
                                fontWeight: 900,
                                fontSize: "20px",
                                textAlign: { xs: "center", md: "left" },
                                lineHeight: "32px",

                                justifyContent: { xs: "center", md: "start" },
                                color: theme.palette.textColor.main
                            }}
                        >
                            Data submitted!
                        </Typography>
                        <CheckCircleIcon
                            sx={{ color: "#4CAF50", fontSize: "32px" }}
                        />
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: { xs: 2, md: 3 },
                            fontSize: "16px",
                            lineHeight: "24px"
                        }}
                    >
                        Redirecting you to the
                        {pathname.includes("discovery")
                            ? " next step..."
                            : " Actions"}
                    </Typography>
                </Box>
            )

        case "error":
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "start" },
                        flexDirection: {
                            xs: "column"
                        },
                        height: { xs: "100%", md: "auto" },
                        m: "auto",
                        width: { xs: "100% ", md: 496 },
                        justifyContent: {
                            xs: "center"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "center", md: "start" },
                            flexDirection: {
                                xs: "column-reverse",
                                md: "row"
                            },
                            gap: 4,
                            width: { xs: "100% ", md: 496 },
                            justifyContent: {
                                xs: "center",
                                md: "space-between"
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                maxWidth: { xs: "100%", md: 378 },
                                width: "100%",
                                fontWeight: 900,
                                fontSize: "20px",
                                textAlign: { xs: "center", md: "left" },
                                lineHeight: "32px",

                                justifyContent: { xs: "center", md: "start" },
                                color: theme.palette.textColor.main
                            }}
                        >
                            Error while submitting {title}
                        </Typography>
                        <ErrorIcon
                            sx={{ color: "#F44336", fontSize: "32px" }}
                        />
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: { xs: "center", md: "left" },
                            mt: { xs: 2, md: 3 },
                            fontSize: "16px",
                            lineHeight: "24px"
                        }}
                    >
                        Please contact your system administrator for further
                        assistance or try again in a while.
                    </Typography>
                </Box>
            )
        case true:
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "start" },
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        position: "relative",
                        gap: 3,
                        height: { xs: "100%", md: "auto" },
                        m: "auto",
                        width: { xs: "100% ", md: 496 },
                        justifyContent: {
                            xs: "center"
                        }
                    }}
                >
                    <Box
                        sx={{
                            cursor: "pointer",
                            position: "absolute",
                            right: 8,
                            top: -6
                        }}
                        onClick={() => close()}
                    >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`This is Unable to proceed icon`}</title>
                            <path
                                d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                fill="#5C5C5C"
                            />
                        </svg>
                    </Box>
                    <WarningIcon sx={{ color: "#FF9800", fontSize: "32px" }} />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "center", md: "start" },
                            flexDirection: {
                                xs: "column"
                            },
                            gap: 4,
                            width: { xs: "100% ", md: 496 },
                            justifyContent: {
                                xs: "center",
                                md: "space-between"
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                maxWidth: { xs: "100%", md: 378 },
                                width: "100%",
                                fontWeight: 900,
                                fontSize: "20px",
                                textAlign: { xs: "center", md: "left" },
                                lineHeight: "32px",

                                justifyContent: { xs: "center", md: "start" },
                                color: theme.palette.textColor.main
                            }}
                        >
                            Unable to proceed
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: { xs: "center", md: "left" },

                                fontSize: "16px",
                                lineHeight: "24px"
                            }}
                        >
                            Please complete all pending items in order to
                            proceed to Confirmation.
                        </Typography>
                    </Box>
                </Box>
            )
    }
}
const ConfirmationNotification = ({ open, close, title }) => {
    const xs = useMediaQuery((th) => th.breakpoints.down("md"))
    const router = useRouter()
    const pathname = router.pathname
    return (
        <Dialog
            className="confirmation_popup"
            BackdropComponent={() => (
                <Box
                    onClick={() => close()}
                    sx={{
                        background: { md: "#00000080" },
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%"
                    }}
                ></Box>
            )}
            fullScreen={xs}
            sx={{
                "& div[role='dialog']": {
                    borderRadius: { md: "4px !important", xs: 0 },
                    background: {
                        xs: "#fffffff0 !important",
                        md: "#fff !important"
                    },
                    width: {
                        xs: "100% !important",
                        md: "auto"
                    },
                    boxShadow:
                        " 0px 12px 17px 2px rgba(0, 0, 0, 0.03), 0px 5px 22px 4px rgba(0, 0, 0, 0.02) !important"
                },
                inset: 0,
                height: "100%",
                width: "100%"
            }}
            open={open != ""}
            onClose={() => {
                close()
            }}
        >
            <DialogContent
                sx={{
                    background: { xs: "transparent !important", md: "#fff" },
                    padding: {
                        md: " 32px",
                        xs: " 24px"
                    }
                }}
            >
                {handlecontent(title, open, pathname, close)}
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmationNotification
