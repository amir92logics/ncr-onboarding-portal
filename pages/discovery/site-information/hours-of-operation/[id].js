import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import HoursOfOperationNew from "../../../../components/Discovery/siteInformation/HoursOfOperationNew"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function HourOfOperationPage() {
    return (
        <>
            <Head>
                <title>Hours Of Operation | NCR Onboarding</title>
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
                                fontWeight: "700",
                                fontSize: "24px",
                                color: theme.palette.textColor.main,
                                lineHeight: "32.02px",
                                padding: "8px, 0px, 8px, 8px",
                                letterSpacing: "-0.00195em"
                            }}
                        >
                            Hours of Operation
                        </Typography>
                    </Box>
                }
            >
                <Box>
                    <HoursOfOperationNew />
                </Box>
            </LayoutBase>
        </>
    )
}
