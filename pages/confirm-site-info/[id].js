import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../components/LayoutBase"
import ConfirmSiteInfoNewComp from "../../components/ConfirmSiteInfoNewComp"
import Head from "next/head"
import theme from "../../src/theme"

export default function ConfirmSiteInfoNewPage() {
    return (
        <>
            <Head>
                <title>Confirm Site Information | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main,
                                lineHeight: "32.02px",
                                padding: "8px, 0px, 8px, 8px",
                                letterSpacing: "-0.00195em"
                            }}
                        >
                            Confirm Site Information
                        </Typography>
                    </Box>
                }
            >
                <Box width="100%">
                    <ConfirmSiteInfoNewComp />
                </Box>
            </LayoutBase>
        </>
    )
}
