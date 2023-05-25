import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import PrinterNameComponent from "../../../../components/Discovery/operations/PrinterNameComponent"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function PrinterNamesPage() {
    return (
        <>
            <Head>
                <title>Prep Printer Names | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main
                            }}
                        >
                            Prep Printer Names
                        </Typography>
                    </Box>
                }
            >
                <PrinterNameComponent />
            </LayoutBase>
        </>
    )
}
