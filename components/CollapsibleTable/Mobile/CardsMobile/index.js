import React from "react"
import Box from "@mui/system/Box"
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import moment from "moment"
import { Typography } from "@mui/material"
import theme from "../../../../src/theme"
import { unixDateConverter } from "../../../../helper/Constraints"

const selectColor = (status) => {
    switch (status) {
        case "overdue":
            return {
                bgColor: theme.chips.background.red,
                color: theme.chips.text.red,
                iconColor: theme.chips.text.red
            }
        case "completed":
            return {
                bgColor: theme.chips.background.complete,
                color: theme.chips.text.complete,
                iconColor: theme.chips.text.complete
            }
        case "confirmed":
            return {
                bgColor: theme.chips.background.complete,
                color: theme.chips.text.complete,
                iconColor: theme.chips.text.complete
            }
        case "disabled":
            return {
                bgColor: "#00000008",
                color: "#5B5B5B",
                iconColor: "#00000038"
            }

        case "in progress":
            return {
                bgColor: theme.chips.background.progress,
                color: theme.chips.text.progress,
                iconColor: theme.chips.text.progress
            }

        case "not started":
            return {
                bgColor: " #EEEEEE",
                color: "#5C5C5C",
                iconColor: "#5C5C5C"
            }
        case "warning":
            return {
                bgColor: theme.chips.background.warning,
                color: theme.chips.text.warning,
                iconColor: theme.chips.text.warning
            }
        default:
            return {
                bgColor: theme.chips.background.progress,
                color: theme.chips.text.progress,
                iconColor: theme.chips.text.progress
            }
    }
}

const selectIcon = (status) => {
    switch (status) {
        case "in progress":
            return <InfoOutlinedIcon />
        case "completed":
            return <CheckCircleOutlineIcon />
        case "confirmed":
            return <CheckCircleOutlineIcon />
        case "warning":
            return <WarningAmberOutlinedIcon />

        case "disabled":
            return <InfoOutlinedIcon />

        default:
            return <InfoOutlinedIcon />
    }
}

export const CardsMobile = ({ label, date, status }) => {
    const color = selectColor(status)

    return (
        <>
            <Box
                bgcolor={color.bgColor}
                fontSize="12px"
                sx={{
                    display: "flex",
                    padding: "4px 0px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: "15px",
                    paddingBottom: "14px",
                    mb: "8px"
                }}
            >
                <Box role="status" sx={{ color: color.iconColor, pl: "14px" }}>
                    {selectIcon(status)}
                </Box>
                <Box sx={{ ml: "12px" }}>
                    <Box
                        sx={{
                            color: color.color,
                            fontSize: "16px",
                            whiteSpace: "auto",
                            pr: "14px"
                        }}
                        textAlign="left"
                    >
                        <span aria-label={label}>{label}</span>
                    </Box>
                    <Box
                        sx={{
                            color: color.color,
                            fontSize: {
                                md: "14px"
                            }
                        }}
                        aria-label={`${
                            date !== null
                                ? unixDateConverter(date, "MMM Do")
                                : "TBD"
                        }`}
                    >
                        <Typography
                            aria-label={date}
                            sx={{
                                color: color.color,
                                fontSize: "14px",
                                pt: "4px"
                            }}
                        >
                            {date !== null
                                ? unixDateConverter(date, "MMM Do")
                                : "TBD"}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
