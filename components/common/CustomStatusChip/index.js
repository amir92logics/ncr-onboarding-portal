import React from "react"
import Box from "@mui/system/Box"
import theme from "../../../src/theme"

const selectColor = (status) => {
    switch (status) {
        case "reset":
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
        case "disabled":
            return {
                bgColor: "#00000008",
                color: "#5B5B5B",
                iconColor: "#00000038"
            }
        case "not started":
            return {
                bgColor: "#00000008",
                color: "#00000038",
                iconColor: "#00000038"
            }
        case "warning":
            return {
                bgColor: theme.chips.background.warning,
                color: theme.chips.text.warning,
                iconColor: theme.chips.text.warning
            }
        case "in progress":
        default:
            return {
                bgColor: theme.chips.background.progress,
                color:theme.chips.text.progress,
                iconColor: theme.chips.text.progress
            }
    }
}

const selectIcon = (status, svgSize) => {
    switch (status) {
        case "overdue":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is overdue icon</title>
                    <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                        fill={`${theme.chips.text.red}`}
                    />
                </svg>
            )

        case "completed":
            return (
                <svg
                    width={svgSize ? svgSize : 20}
                    height={svgSize ? svgSize : 20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is completed icon</title>
                    <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                        fill={`${theme.chips.text.complete}`}
                    />
                </svg>
            )

        case "warning":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is warning icon</title>
                    <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                        fill={`${theme.chips.text.warning}`}
                    />
                </svg>
            )
        case "reset":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is reset icon</title>
                    <path
                        d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                        fill={`${theme.chips.text.red}`}
                    />
                </svg>
            )

        case "in progress":
        default:
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is in progress icon</title>
                    <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
                        fill={`${theme.chips.text.progress}`}
                    />
                </svg>
            )
    }
}

export const OverViewStatusChip = ({
    status,
    name,
    fontSize,
    lineHeight,
    svgSize,
    hideSvg,
    fontWeight,
    px,
    py,
    label
}) => {
    const color = selectColor(status)

    return (
        <Box
            sx={{
                border: 0,
                borderRadius: "24px",
                width: "max-content",
                py: py ? py : { lg: "6px", xs: "3px" },
                px: px ? px : 2.2,
                mb: 0
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={color.bgColor}
            fontSize="12px"
        >
            <Box
                sx={{
                    color: color.iconColor,
                    display: hideSvg ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {selectIcon(status, svgSize)}
            </Box>
            <Box
                sx={{
                    color: color.color,
                    fontSize: fontSize ? fontSize : { xs: "12px", lg: "14px" },
                    lineHeight: lineHeight ? lineHeight : "20px",
                    fontWeight: fontWeight ? fontWeight : 400,
                    textTransform: "capitalize"
                }}
                ml={hideSvg ? "0px" : "6px"}
                textAlign="left"
            >
                {label ? label : "N/A"}
            </Box>
        </Box>
    )
}
