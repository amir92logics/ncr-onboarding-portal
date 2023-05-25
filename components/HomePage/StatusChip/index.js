import React from "react"
import { Box } from "@mui/material"
import theme from "../../../src/theme"

const selectColor = (status) => {
    switch (status) {
        case "Overdue":
            return {
                bgColor: "#FDECEA",
                color: "#621B16",
                iconColor: "#F44336"
            }
        case "Reset":
            return {
                bgColor: "#d32f2f20",
                color: "#621B16",
                iconColor: theme.chips.text.red
            }
        case "Complete":
            return {
                bgColor: "#EFF7EE",
                color: "#1E4620",
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
                bgColor: "#FDF4E7",
                color: "#663D00",
                iconColor: "#FF9800"
            }
        default:
            return {
                bgColor: "#5364FD20",
                color: "#5364FD",
                iconColor: "#5364FD"
            }
    }
}

const selectIcon = (status) => {
    switch (status) {
        case "Overdue":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Overdue icon</title>
                    <path
                        d="M10 1.68335C5.40835 1.68335 1.68335 5.40835 1.68335 10C1.68335 14.5917 5.40835 18.3167 10 18.3167C14.5917 18.3167 18.3167 14.5917 18.3167 10C18.3167 5.40835 14.5917 1.68335 10 1.68335ZM9.56668 16.6667V11.45H6.66668L10.8333 3.33335V8.55002H13.625L9.56668 16.6667Z"
                        fill="#F44336"
                    />
                </svg>
            )
        case "Complete":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Complete icon</title>
                    <path
                        d="M10 1.68335C5.40835 1.68335 1.68335 5.40835 1.68335 10C1.68335 14.5917 5.40835 18.3167 10 18.3167C14.5917 18.3167 18.3167 14.5917 18.3167 10C18.3167 5.40835 14.5917 1.68335 10 1.68335ZM9.56668 16.6667V11.45H6.66668L10.8333 3.33335V8.55002H13.625L9.56668 16.6667Z"
                        fill="#FF9800"
                    />
                </svg>
            )
        case "Warning":
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Warning icon</title>
                    <path
                        d="M9.20045 0.683105C4.60879 0.683105 0.883789 4.4081 0.883789 8.99977C0.883789 13.5914 4.60879 17.3164 9.20045 17.3164C13.7921 17.3164 17.5171 13.5914 17.5171 8.99977C17.5171 4.4081 13.7921 0.683105 9.20045 0.683105ZM8.76712 15.6664V10.4498H5.86712L10.0338 2.33311V7.54977H12.8255L8.76712 15.6664Z"
                        fill="#FF9800"
                    />
                </svg>
            )

        case "In Progress":
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is In Progress icon</title>
                    <path
                        d="M10 1.68335C5.40835 1.68335 1.68335 5.40835 1.68335 10C1.68335 14.5917 5.40835 18.3167 10 18.3167C14.5917 18.3167 18.3167 14.5917 18.3167 10C18.3167 5.40835 14.5917 1.68335 10 1.68335ZM9.56668 16.6667V11.45H6.66668L10.8333 3.33335V8.55002H13.625L9.56668 16.6667Z"
                        fill="#5364FD"
                    />
                </svg>
            )
        case "Reset":
            return (
                <svg
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Reset icon</title>
                    <path
                        d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                        fill="#F44336"
                    />
                </svg>
            )

        default:
            return (
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is default icon</title>
                    <path
                        d="M10 1.68335C5.40835 1.68335 1.68335 5.40835 1.68335 10C1.68335 14.5917 5.40835 18.3167 10 18.3167C14.5917 18.3167 18.3167 14.5917 18.3167 10C18.3167 5.40835 14.5917 1.68335 10 1.68335ZM9.56668 16.6667V11.45H6.66668L10.8333 3.33335V8.55002H13.625L9.56668 16.6667Z"
                        fill="#5364FD"
                    />
                </svg>
            )
    }
}

export const OverViewStatusChip = ({ status, label }) => {
    const color = selectColor(status)
    return (
        <Box
            sx={{
                border: 0,
                borderRadius: "16px",
                width: "max-content",
                height: "24px",
                padding: "2px 0px"
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={color.bgColor}
            fontSize="12px"
        >
            <Box sx={{ paddingTop: "5px", color: color.iconColor, px: "4px" }}>
                {selectIcon(status)}
            </Box>
            <Box
                sx={{ color: color.color, pr: "10px" }}
                ml="4px"
                textAlign="left"
            >
                {label ? label : "N/A"}
            </Box>
        </Box>
    )
}
