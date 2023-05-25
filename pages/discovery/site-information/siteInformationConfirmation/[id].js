import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SiteInformationComp from "../../../../components/Discovery/siteInformation/siteInformationComp"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function SiteInformationConfirmationPage() {
    return (
        <>
            <Head>
                <title>Site Information Confirmation | NCR Onboarding</title>
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
                            Site Information
                        </Typography>
                    </Box>
                }
            >
                <SiteInformationComp />
            </LayoutBase>
        </>
    )
}
