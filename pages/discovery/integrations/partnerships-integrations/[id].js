import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import { PartnershipsIntegrations } from "../../../../components/Discovery/IntegrationsComponents/PartnershipsIntegrations"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function PartnershipsIntegrationsPage() {
    return (
        <>
            <Head>
                <title>Partnership & Integration | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main,
                                letterSpacing: "-0.00195em"
                            }}
                        >
                            Partnership & Integration
                        </Typography>
                    </Box>
                }
            >
                <PartnershipsIntegrations />
            </LayoutBase>
        </>
    )
}
