import React from "react"
import { Typography } from "@mui/material"
import theme from "../../../src/theme"

const selectColor = (status) => {
    switch (status) {
        case "Submitted":
            return { bgColor: theme.chips.background.complete, color: theme.chips.text.complete }

        case "Pending Submission":
            return { bgColor: "#E7E8FF", color: "#00000099" }
        case "Pending":
            return { bgColor: "#FDF4E7", color: theme.chips.text.warning }

        case "Uploading...":
            return { bgColor: "#FDF4E7", color: "#00000099" }
        default:
            return { bgColor: "#FDF4E7", color: "#00000099" }
    }
}

export const DocumnetStatusChip = ({ status, label }) => {
    const color = selectColor(status)
    return (
        <Typography
            sx={{
                border: 0,
                borderRadius: "64px",
                fontWeight: "400",
                padding: "3px 8px",
                fontSize: "12px",
                lineHeight: "18px",
                width: "82.92px"
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={color.color}
            bgcolor={color.bgColor}
        >
            {/* Pending Items... */}
            <span className={status === "Uploading..." ? "animate-text" : ""}>
                {" "}
                {label}
            </span>
        </Typography>
    )
}
