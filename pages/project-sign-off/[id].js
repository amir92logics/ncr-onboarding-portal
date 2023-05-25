import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import ProjectSignOf from "../../components/ProjectSignOff"
import { LayoutBase } from "../../components/LayoutBase"
import Head from "next/head"
import theme from "../../src/theme"

export default function ProjectSignOff() {
    return (
        <>
            <Head>
                <title>Project Sign Off | NCR Onboarding</title>
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
                                padding: "8px, 0px, 8px, 8px",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Project Complete
                        </Typography>
                    </Box>
                }
            >
                <ProjectSignOf />
            </LayoutBase>
        </>
    )
}
