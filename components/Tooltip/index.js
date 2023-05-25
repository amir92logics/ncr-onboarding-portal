import * as React from "react"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import theme from "../../src/theme"

export const CustomTooltip = ({ text, subroutes }) => {
    return (
        <div style={{ position: "relative" }}>
            {subroutes === true ? (
                <Box
                    sx={{ cursor: "pointer", marginTop: "-3px" }}
                    className="tooltip"
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is {text} tooltip icon</title>

                        <g clipPath="url(#clip0_557_26807)">
                            <path
                                d="M9.16602 5.83073H10.8327V7.4974H9.16602V5.83073ZM9.16602 9.16406H10.8327V14.1641H9.16602V9.16406ZM9.99935 1.66406C5.39935 1.66406 1.66602 5.3974 1.66602 9.9974C1.66602 14.5974 5.39935 18.3307 9.99935 18.3307C14.5993 18.3307 18.3327 14.5974 18.3327 9.9974C18.3327 5.3974 14.5993 1.66406 9.99935 1.66406ZM9.99935 16.6641C6.32435 16.6641 3.33268 13.6724 3.33268 9.9974C3.33268 6.3224 6.32435 3.33073 9.99935 3.33073C13.6743 3.33073 16.666 6.3224 16.666 9.9974C16.666 13.6724 13.6743 16.6641 9.99935 16.6641Z"
                                fill="#8C8C8C"
                            />
                        </g>
                        <defs>
                            <clipPath >
                                <rect width={20} height={20} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
            ) : (
                <Box sx={{ cursor: "pointer", marginTop: "-3px" }}>
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is {text}  tooltip icon</title>

                        <g clipPath="url(#clip0_557_26807)">
                            <path
                                d="M9.16602 5.83073H10.8327V7.4974H9.16602V5.83073ZM9.16602 9.16406H10.8327V14.1641H9.16602V9.16406ZM9.99935 1.66406C5.39935 1.66406 1.66602 5.3974 1.66602 9.9974C1.66602 14.5974 5.39935 18.3307 9.99935 18.3307C14.5993 18.3307 18.3327 14.5974 18.3327 9.9974C18.3327 5.3974 14.5993 1.66406 9.99935 1.66406ZM9.99935 16.6641C6.32435 16.6641 3.33268 13.6724 3.33268 9.9974C3.33268 6.3224 6.32435 3.33073 9.99935 3.33073C13.6743 3.33073 16.666 6.3224 16.666 9.9974C16.666 13.6724 13.6743 16.6641 9.99935 16.6641Z"
                                fill="#8C8C8C"
                            />
                        </g>
                        <defs>
                            <clipPath >
                                <rect
                                    width={20}
                                    height={20}
                                    fill={theme.palette.primary.main}
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
            )}
            <Box
                className="showText"
                sx={{
                    zIndex: "1",
                    display: "none",
                    opacity: "0",
                    position: "absolute !important",
                    width: "230px",
                    background: "white",
                    borderRadius: "8px",
                    right: subroutes === true ? "-30px" : "-5px"
                }}
            >
                <Typography
                    sx={{ fontSize: "14px", padding: "16px", width: "230px" }}
                >
                    {text}
                </Typography>
            </Box>
        </div>
    )
}
