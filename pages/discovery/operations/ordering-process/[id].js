import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import OrderingProcessComponent from "../../../../components/Discovery/operations/OrderingProcessComponent"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function OrderingProcessPage() {
    return (
        <>
            <Head>
                <title>Ordering Process | NCR Onboarding</title>
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
                            Ordering Process
                        </Typography>
                    </Box>
                }
            >
                <OrderingProcessComponent />
            </LayoutBase>
        </>
    )
}
