import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import { LayoutBase } from "../../../../components/LayoutBase"
import OvertimeComponent from "../../../../components/Discovery/labor/OvertimeComponent"
import Head from "next/head"
import theme from "../../../../src/theme"

export default function OverTimePage() {
    return (
        <>
            <Head>
                <title>Overtime | NCR Onboarding</title>
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
                                letterSpacing: "-0.00195em",
                                color: theme.palette.textColor.main
                            }}
                        >
                            Overtime
                        </Typography>
                    </Box>
                }
            >
                <OvertimeComponent />
            </LayoutBase>
        </>
    )
}
