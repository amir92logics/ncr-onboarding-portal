import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../components/LayoutBase"
import SiteReadiness from "../../components/SiteReadiness"
import Head from "next/head"
import theme from "../../src/theme"

export default function ProjectSignOff() {
    return (
        <>
            <Head>
                <title>Site Readiness | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <LayoutBase
                showPercentageProgress={false}
                title={
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "24px",
                                lineHeight: "32px",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Site Readiness Acknowledgement
                        </Typography>
                    </Box>
                }
            >
                <SiteReadiness />
            </LayoutBase>
        </>
    )
}
