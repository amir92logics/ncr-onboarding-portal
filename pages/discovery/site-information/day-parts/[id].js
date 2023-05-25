import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import DayParts from "../../../../components/Discovery/siteInformation/DayParts"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function DayPartsPage() {
    return (
        <>
            <Head>
                <title>Day Parts | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main
                            }}
                        >
                            Day Parts
                        </Typography>
                    </Box>
                }
            >
                <Box>
                    <Box sx={{ paddingRight: { xl: "0px", md: "0px" } }}>
                        <DayParts />
                    </Box>
                </Box>
            </LayoutBase>
        </>
    )
}
