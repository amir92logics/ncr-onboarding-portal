import * as React from "react"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

export const ConfirmationTooltip = ({
    text,

    additional
}) => {
    return (
        <div style={{ position: "relative" }}>
            <Box sx={{ cursor: "pointer" }} className="tooltipb">
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is {text} tooltip icon</title>
                    <path
                        d="M8.16675 4.83317H9.83342V6.49984H8.16675V4.83317ZM8.16675 8.1665H9.83342V13.1665H8.16675V8.1665ZM9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM9.00008 15.6665C5.32508 15.6665 2.33341 12.6748 2.33341 8.99984C2.33341 5.32484 5.32508 2.33317 9.00008 2.33317C12.6751 2.33317 15.6667 5.32484 15.6667 8.99984C15.6667 12.6748 12.6751 15.6665 9.00008 15.6665Z"
                        fill="#757575"
                    />
                </svg>
            </Box>

            <Box
                className="showText"
                sx={{
                    zIndex: "1",
                    display: "none",
                    opacity: "0",
                    position: "absolute !important",
                    width: { md: "max-content", xs: "170px" },
                    height: { md: "38px" },

                    background: "#616161",
                    borderRadius: "8px",
                    left: { xs: "-60px", md: "25px" },
                    top:
                        additional === "additional"
                            ? { xs: "40px", md: "-10px" }
                            : { xs: "40px", md: "-12px" },
                    marginLeft: "10px"
                }}
            >
                <Box
                    className="tool"
                    sx={{
                        backgroundColor: "#616161",
                        position: "absolute",
                        left: "-6px",
                        top: additional === "additional" ? "10px" : "10px",

                        color: "#616161",
                        display: { xs: "none", md: "flex" }
                    }}
                >
                    <svg
                        width={7}
                        height={19}
                        viewBox="0 0 7 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is {text} tooltip icon</title>
                        <path
                            d="M8.34742e-08 7L7 8.34742e-08L7 14L8.34742e-08 7Z"
                            fill="#616161"
                        />
                    </svg>
                </Box>
                <Box
                    className="tool2"
                    sx={{
                        backgroundColor: "#616161",
                        position: "absolute",
                        left: "52px",

                        top: "-20px",
                        display: { md: "none", xs: "flex" },
                        color: "#616161"
                    }}
                >
                    ghf
                </Box>

                <Typography
                    sx={{
                        fontWeight: "400",
                        lineHeight: "18px",
                        fontSize: "14px",
                        padding: "10px",
                        color: "white"
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </div>
    )
}
