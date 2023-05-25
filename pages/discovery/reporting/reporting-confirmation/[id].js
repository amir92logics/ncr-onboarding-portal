import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import { LayoutBase } from "../../../../components/LayoutBase"
import ReportingComfirmationComp from "../../../../components/Discovery/Reporting/reportingComfirmationComp"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function ReportingConfirmationPage() {
    return (
        <>
            <Head>
                <title>Reporting Confirmation | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
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
                                fontWeight: "600",
                                fontSize: "24px",
                                lineHeight: "32px",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Reporting
                        </Typography>
                    </Box>
                }
            >
                <ReportingComfirmationComp />
            </LayoutBase>
        </>
    )
}
