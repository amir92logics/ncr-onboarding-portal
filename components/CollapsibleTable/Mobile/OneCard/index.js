import React from "react"
import Box from "@mui/system/Box"
import { Collapse } from "@mui/material"
import { CardsMobile } from "../CardsMobile"
import theme from "../../../../src/theme"
function ColorlibStepIcon(status) {
    return (
        <>
            {status.toString().toLowerCase() === "completed" ||
            status.toString().toLowerCase() === "confirmed" ? (
                <svg
                    width={24}
                    height={30}
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>
                        This is {status.toString().toLowerCase()} icon
                    </title>
                    <circle
                        cx={12}
                        cy={12}
                        r={12}
                        fill={theme.palette.primary.main}
                    />
                    <path
                        d="M9.50013 15.4729L6.02513 11.9979L4.8418 13.1729L9.50013 17.8312L19.5001 7.83125L18.3251 6.65625L9.50013 15.4729Z"
                        fill="white"
                    />
                </svg>
            ) : (
                <svg
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>
                        This is {status.toString().toLowerCase()} icon
                    </title>
                    <circle
                        cx="12.668"
                        cy={12}
                        r={11}
                        stroke="#B3B3B5"
                        strokeWidth={2}
                    />
                </svg>
            )}
            {status.toString().toLowerCase() === "warning" && (
                <svg
                    width={71}
                    height={40}
                    viewBox="0 0 71 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is warning icon</title>
                    <g clipPath="url(#clip0_5772_102806)">
                        <circle cx="35.332" cy={20} r={12} fill="#B3B3B5" />
                        <path
                            d="M32.8302 23.4749L29.3552 19.9999L28.1719 21.1749L32.8302 25.8332L42.8302 15.8332L41.6552 14.6582L32.8302 23.4749Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_5772_102806">
                            <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(23.332 8)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
        </>
    )
}

export const OneCard = ({ row, expand }) => {
    return (
        <Collapse
            timeout={700}
            in={expand}
            unmountOnExit
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column"
            }}
        >
            <>
                <Box
                    sx={{
                        padding: "12px 14px",
                        background: "#ffffff",
                        borderLeft: "2px solid #1D4ED8"
                    }}
                >
                    <Box
                        sx={{
                            fontSize: {
                                md: "14px",
                                xs: "16px"
                            },
                            lineHeight: "30px",
                            fontWeight: "600",
                            color: "#5C5C5C",
                            mt: {
                                md: "0",
                                xs: "0px"
                            },
                            mb: "24px"
                        }}
                    >
                        Project Status:
                    </Box>

                    {row.tasks?.map((projectStatus, index) => {
                        return (
                            <Box
                                display={"flex"}
                                sx={{
                                    alignItems: "center",
                                    position: "relative"
                                }}
                                key={index}
                            >
                                <Box
                                    sx={{
                                        mr: 4
                                    }}
                                >
                                    <Box>
                                        {ColorlibStepIcon(projectStatus.status)}
                                    </Box>
                                    {index !== row.tasks.length - 1 && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                left: 12,
                                                width: "1px",
                                                my: 1,
                                                height: "50%",
                                                background:
                                                    "rgba(60, 60, 67, 0.13)"
                                            }}
                                        />
                                    )}
                                </Box>
                                <CardsMobile
                                    label={
                                        projectStatus.schedule_name ||
                                        projectStatus.display_name
                                    }
                                    date={
                                        projectStatus?.start_date
                                            ? projectStatus?.status.toLowerCase() ==
                                                  "completed" ||
                                              projectStatus?.status.toLowerCase() ==
                                                  "confirmed"
                                                ? projectStatus.end_date
                                                    ? projectStatus.end_date
                                                    : null
                                                : projectStatus.start_date
                                            : null
                                    }
                                    status={projectStatus.status.toLowerCase()}
                                />
                            </Box>
                        )
                    })}

                    {}
                </Box>
            </>
        </Collapse>
    )
}
