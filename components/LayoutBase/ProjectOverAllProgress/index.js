import React from "react"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import theme from "../../../src/theme"
export function ProjectOverAllProgress({ title, percentage, width, bgcolor }) {
    const assigncolor = (percentage) => {
        if (percentage <= 25 || percentage == 0 || !percentage) {
            return theme.percentage.main.quarter
        } else if (percentage < 50) {
            return theme.percentage.main.half
        } else if (percentage == 100) {
            return theme.percentage.main.success
        } else if (percentage >= 50) {
            return theme.percentage.main.fifty
        }
    }
    const assignbg = (percentage) => {
        if (percentage <= 25 || percentage == 0 || !percentage) {
            return theme.percentage.bg.quarter
        } else if (percentage < 50) {
            return theme.percentage.bg.half
        } else if (percentage == 100) {
            return theme.percentage.main.success
        } else if (percentage >= 50) {
            return theme.percentage.bg.fifty
        }
    }
    return (
        <Box sx={{ml:{xs:"0px", md:"8px", lg:"0px"}}}>
            {title == "flex" ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left",

                            backgroundColor: assignbg(Number(percentage)),
                            borderRadius: "9999px",
                            width: 90,

                            height: "4px"
                        }}
                    >
                        <Box
                            className="transitionCustom"
                            sx={{
                                backgroundColor: assigncolor(
                                    Number(percentage)
                                ),
                                borderRadius: "9999px",
                                width: `${Number(percentage)}%`,
                                height: "4px"
                            }}
                        />
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            ml: "1px",
                            fontSize: "12px",
                            color: "#5C5C5C",
                            lineHeight: "18px",
                            fontWeight: 400
                        }}
                    >
                        {Math.round(Number(percentage)) || 0}%
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            ml: "1px",
                            fontSize: "12px",
                            color: "#5C5C5C",
                            lineHeight: "18px",
                            fontWeight: 400,
                            marginBottom: { md: "8px", xs: "8px" }
                        }}
                    >
                        <Box component={"span"} sx={{}}>
                            {title || "Onboarding Progress "}
                        </Box>
                        <Box component={"span"} sx={{}}>
                            {Math.round(Number(percentage)) || 0}%
                        </Box>
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left",
                            overflow: "hidden",
                            backgroundColor:
                                bgcolor || assignbg(Number(percentage)),
                            borderRadius: "9999px",
                            width: {
                                lg: width || "278px",
                                md: width || "280px",
                                xs: "100%"
                            },
                            height: "4px"
                        }}
                    >
                        <Box
                            className="transitionCustom"
                            sx={{
                                backgroundColor: assigncolor(
                                    Number(percentage)
                                ),
                                borderRadius: "9999px",
                                width: `${Number(percentage)}%`,
                                height: "4px"
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
