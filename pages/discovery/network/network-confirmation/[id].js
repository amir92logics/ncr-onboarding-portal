import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import NetworkConfirmationComp from "../../../../components/Discovery/networkComp/NetworkConfirmationComp"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function NetworkConfirmationPage() {
    return (
        <>
            <Head>
                <title>Network Confirmation | NCR Onboarding</title>
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
                            Network
                        </Typography>
                    </Box>
                }
            >
                <NetworkConfirmationComp />
            </LayoutBase>
        </>
    )
}
