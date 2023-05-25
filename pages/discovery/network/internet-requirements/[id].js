import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { ManagedNetworkNss } from "../../../../components/Discovery/networkComp/NetworkManagedNss"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import InternetRequirments from "../../../../components/Discovery/networkComp/InternetRequirments"
import theme from "../../../../src/theme"

export default function ManagedNetworkNssPage({ data, setProject }) {
    return (
        <>
            <Head>
                <title>
                    Electrical, Network Wiring, and Internet Requirements | NCR
                    Frontend
                </title>
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
                                fontSize: {
                                    xxl: "24.2px",
                                    md: "23.7px",
                                    xs: "23.6px"
                                },
                                lineHeight: "32.02px",
                                padding: "8px, 0px, 8px, 8px",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Electrical, Network Wiring, and Internet
                            Requirements
                        </Typography>
                    </Box>
                }
            >
                <InternetRequirments />
            </LayoutBase>
        </>
    )
}
