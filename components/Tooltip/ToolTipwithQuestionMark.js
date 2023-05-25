import * as React from "react"

import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

export const ToolTipwithQuestionMark = ({ text, margin }) => {
    return (
        <Box sx={{ position: "relative", marginLeft: "4px" }}>
            <Box
                className="tooltip"
                sx={{
                    position: margin === "margin" && "relative",
                    top: margin === "margin" && "4px"
                }}
            >
                {" "}
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is {text} tooltip icon</title>

                    <g clipPath="url(#clip0_4652_34213)">
                        <path
                            d="M9.1665 5.83073H10.8332V7.4974H9.1665V5.83073ZM9.1665 9.16406H10.8332V14.1641H9.1665V9.16406ZM9.99984 1.66406C5.39984 1.66406 1.6665 5.3974 1.6665 9.9974C1.6665 14.5974 5.39984 18.3307 9.99984 18.3307C14.5998 18.3307 18.3332 14.5974 18.3332 9.9974C18.3332 5.3974 14.5998 1.66406 9.99984 1.66406ZM9.99984 16.6641C6.32484 16.6641 3.33317 13.6724 3.33317 9.9974C3.33317 6.3224 6.32484 3.33073 9.99984 3.33073C13.6748 3.33073 16.6665 6.3224 16.6665 9.9974C16.6665 13.6724 13.6748 16.6641 9.99984 16.6641Z"
                            fill="#757575"
                        />
                    </g>
                    <defs>
                        <clipPath >
                            <rect width={20} height={20} fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </Box>

            <Box
                className="showText"
                sx={{
                    zIndex: "1",
                    display: "none",
                    opacity: "0",
                    position: "absolute !important",
                    width: "270px",
                    background: "white",
                    borderRadius: "8px",
                    right: { lg: "30px", xs: "30px", md: "0px" },
                    left: { md: "30px", lg: "0px" },
                    bottom: "35px"
                }}
            >
                <Typography
                    sx={{ fontSize: "14px", padding: "16px", width: "270px" }}
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}
