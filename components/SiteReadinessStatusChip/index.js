import React from "react"
import Box from "@mui/system/Box"
import theme from "../../src/theme"

const selectColor = (status) => {
    switch (status) {
        case "Overdue":
            return {
                bgColor: "#d32f2f20",
                color: theme.chips.text.red,
                iconColor: theme.chips.text.red
            }
        case "Complete":
            return {
                bgColor: theme.chips.background.complete,
                color: theme.chips.text.complete,
                iconColor: "#4CAF50"
            }
        case "DISABLED":
            return {
                bgColor: "#00000008",
                color: "#5B5B5B",
                iconColor: "#00000038"
            }

        case "In Progress":
            return {
                bgColor: "#5364FD20",
                color: "#3A46B2",
                iconColor: "#5364FD"
            }

        case "Not Started":
            return {
                bgColor: "#00000008",
                color: "#00000038",
                iconColor: "#00000038"
            }
        case "Warning":
            return {
                bgColor: theme.chips.background.warning,
                color: theme.chips.text.warning,
                iconColor: "#ed6c02"
            }
        default:
            return {
                bgColor: "#5364FD20",
                color: "#5364FD",
                iconColor: "#5364FD"
            }
    }
}

export const SiteReadinessStatusChip = ({ status, label }) => {
    const color = selectColor(status)

    return (
        <Box
            sx={{
                border: 0,
                borderRadius: "16px",
                width: "max-content",

                padding: "4px 11.9px"
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={color.bgColor}
            lineHeight="24px"
            fontSize="14px"
            fontWeight={500}
        >
            <Box
                aria-label={label}
                sx={{ color: color.color }}
                textAlign="center"
            >
                {label}
            </Box>
        </Box>
    )
}
