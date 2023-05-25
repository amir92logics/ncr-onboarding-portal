import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import { SiteNetworkComp } from "../../../../components/Discovery/networkComp/SiteNetworkComp"

import Head from "next/head"
import theme from "../../../../src/theme"

export default function SiteNetworkPage() {
    return (
        <>
            <Head>
                <title>Network Management & Security | NCR Onboarding</title>
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
                                lineHeight: "32.02px",
                                padding: "8px, 0px, 8px, 8px",
                                letterSpacing: "-0.00195em",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Network Management & Security
                        </Typography>
                    </Box>
                }
            >
                <SiteNetworkComp />
            </LayoutBase>
        </>
    )
}
