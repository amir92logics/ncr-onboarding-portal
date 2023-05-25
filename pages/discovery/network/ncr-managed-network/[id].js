import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { ManagedNetworkNss } from "../../../../components/Discovery/networkComp/NetworkManagedNss"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function ManagedNetworkNssPage() {
    return (
        <>
            <Head>
                <title>NCR Managed Network With NSS | NCR Onboarding</title>
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
                            NCR Managed Network with NSS
                        </Typography>
                    </Box>
                }
            >
                <ManagedNetworkNss />
            </LayoutBase>
        </>
    )
}
