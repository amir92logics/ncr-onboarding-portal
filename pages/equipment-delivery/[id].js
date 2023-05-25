import React from "react"
import Box from "@mui/system/Box"

import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../components/LayoutBase"
import CustomerReqofSystemDelCom from "../../components/customerReqofSystemDelCom"
import Head from "next/head"
import theme from "../../src/theme"

export default function CustomerReqofSystemDelivery() {
    return (
        <>
            <Head>
                <title>Equipment Delivery | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main,
                                letterSpacing: "-0.00195em"
                            }}
                        >
                            Equipment Delivery
                        </Typography>
                    </Box>
                }
            >
                {" "}
                <Box className="container-layout-main">
                    <CustomerReqofSystemDelCom />
                </Box>
            </LayoutBase>
        </>
    )
}
