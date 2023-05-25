import React from "react"
import theme from "../../../src/theme"
import { Box, IconButton, Slide, Snackbar } from "@mui/material"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

export default function Notification({ open, close, title, subtitle, error }) {
    function SlideTransition(props) {
        return <Slide {...props} direction="left" />
    }
    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            sx={{
                borderRadius: "6px",
                width: { sm: "300px", xs: "100%" },
                padding: { xs: 4, sm: "" }
            }}
            autoHideDuration={4000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={open}
            onClose={() => close()}
        >
            <Box
                sx={{
                    borderRadius: "6px",

                    display: "flex",
                    px: 4,
                    py: "14px",
                    color: "#fff",
                    background:
                        error === "updated"
                            ? theme.palette.primary.main
                            : error === "added"
                            ? "#4CAF50"
                            : error === "delete"
                            ? "#F44336"
                            : error === "exist"
                            ? "#F44336"
                            : theme.palette.primary.main,
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        borderRadius: "6px",
                        alignItems: "center",
                        display: "flex",
                        gap: 4,
                        color: "#fff",
                        background:
                            error === "updated"
                                ? theme.palette.primary.main
                                : error === "added"
                                ? "#4CAF50"
                                : error === "delete"
                                ? "#F44336"
                                : error === "exist"
                                ? "#F44336"
                                : theme.palette.primary.main,
                        width: "100%"
                    }}
                >
                    {error === "updated" ? (
                        <InfoOutlinedIcon
                     
                            sx={{
                                fontSize: theme.fontsize.xl
                            }}
                        />
                    ) : error === "added" ? (
                        <CheckCircleOutlineIcon
                            sx={{
                                fontSize: theme.fontsize.xl
                            }}
                        />
                    ) : error === "delete" ? (
                        <HighlightOffIcon
                            sx={{
                                fontSize: theme.fontsize.xl
                            }}
                        />
                    ) : error === "exist" ? (
                        <HighlightOffIcon
                            sx={{
                                fontSize: theme.fontsize.xl
                            }}
                        />
                    ) : (
                        <InfoOutlinedIcon
                            sx={{
                                fontSize: theme.fontsize.xl
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            color: "#FFF"
                        }}
                        component={"span"}
                    >
                        <Box
                            sx={{
                                fontSize: theme.fontsize.base,
                                lineHeight: "24px"
                            }}
                            component={"span"}
                        >
                            {title}
                        </Box>
                        <Box
                            sx={{
                                fontSize: theme.fontsize.xs,
                                lineHeight: "18px"
                            }}
                            component={"span"}
                        >
                            {subtitle || "has been added."}
                        </Box>
                    </Box>
                </Box>

                <ClearOutlinedIcon
                    onClick={() => close()}
                    sx={{ cursor: "pointer", ml: 2 }}
                />
            </Box>
        </Snackbar>
    )
}
