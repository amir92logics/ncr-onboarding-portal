import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import InstallationDeliveryDocument from "../../components/InstallationDeliveryDocument"
import { LayoutBase } from "../../components/LayoutBase"
import Head from "next/head"
import theme from "../../src/theme"

export default function ContactConfirmationPage() {
    return (
        <>
            <Head>
                <title>Installation and Delivery Document | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main,
                                lineHeight: "32.02px"
                            }}
                        >
                            Installation and Delivery Document
                        </Typography>
                    </Box>
                }
            >
                <InstallationDeliveryDocument />
            </LayoutBase>
        </>
    )
}
