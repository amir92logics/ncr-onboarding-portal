import React from "react"
import Box from "@mui/system/Box"

import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import { SiteNetworkDOC } from "../../../../components/Discovery/networkComp/SiteNetworkDOC"

import Head from "next/head"
import theme from "../../../../src/theme"

export default function SiteNetworkDocPage() {
    return (
        <>
            <Head>
                <title>Network Documentation | NCR Onboarding</title>
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
                                fontWeight: { md: "700", xs: "600" },
                                fontSize: {
                                    lg: "23.8px",
                                    md: "23.9px",
                                    xs: "23.9px"
                                },
                                lineHeight: "32.02px",
                                padding: "8px, 0px, 8px, 8px",
                                color: theme.palette.textColor.main,
                                maxWidth: {
                                    sm: "358px",
                                    md: "330px",
                                    lg: "1322px"
                                }
                            }}
                        >
                            Networking Guidelines - 3rd Party, Self-Managed, or
                            Unmanaged
                        </Typography>
                    </Box>
                }
            >
                <SiteNetworkDOC />
            </LayoutBase>
        </>
    )
}
