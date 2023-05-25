import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import ActionsPage from "../../components/ActionView"
import { LayoutBase } from "../../components/LayoutBase"
import Head from "next/head"
import theme from "../../src/theme"

export default function Actions() {
    return (
        <>
            <LayoutBase
                showPercentageProgress={true}
                title={
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            sx={{
                                fontWeight: "700",
                                color: theme.palette.textColor.main,
                                fontSize: "24px",
                                lineHeight: "32.02px",
                                color: "#1E1E1E"
                            }}
                        >
                            Actions
                        </Typography>
                    </Box>
                }
            >
                <Box className="actionPage">
                    <ActionsPage />
                </Box>
            </LayoutBase>
        </>
    )
}
