import React from "react"
import Box from "@mui/system/Box"

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import theme from "../../../src/theme"

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
                bgColor: "#00000008",
                color: "#5c5c5c",
                iconColor: "#00000038"
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
        case "disabled":
            return <InfoOutlinedIcon />
        case "completed":
            return <CheckCircleOutlineIcon />
        case "confirmed":
            return <CheckCircleOutlineIcon />
        case "warning":
            return <WarningAmberOutlinedIcon />
        case "in progress":
            return <InfoOutlinedIcon />

        default:
            return <InfoOutlinedIcon />
    }
}

export const StatusBoxTableSlider = ({ status, label }) => {
    const color = selectColor(status)

    return (
        <Box
            width="131px"
            minHeight="84px"
            borderRadius={"8px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={color.bgColor}
            fontSize="12px"
        >
            <Box sx={{ color: color.iconColor, pl: "23px" }}>
                {selectIcon(status)}
            </Box>
            <Box
                sx={{ color: color.color, pr: "23px" }}
                ml="4px"
                textAlign="left"
            >
                {label}
            </Box>
        </Box>
    )
}
