import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import RevenueCenter from "../../../../components/Discovery/siteInformation/RevenueCenter"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function RevenueCenterPage() {
    return (
        <>
            <Head>
                <title>Revenue Center | NCR Onboarding</title>
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
                                padding: "8px, 0px, 8px, 8px",
                                letterSpacing: "-0.00195em",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Revenue Centers
                        </Typography>
                    </Box>
                }
            >
                <Box>
                    <RevenueCenter />
                </Box>
            </LayoutBase>
        </>
    )
}
