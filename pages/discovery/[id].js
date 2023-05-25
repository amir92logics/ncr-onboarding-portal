import { Box, Typography } from "@mui/material"
import Head from "next/head"
import React from "react"
import Discovery from "../../components/Discovery"
import { LayoutBase } from "../../components/LayoutBase"
import theme from "../../src/theme"

const index = () => {
    return (
        <>
            <Head>
                <title>Discovery | NCR Onboarding</title>
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
                            Discovery Overview
                        </Typography>
                    </Box>
                }
            >
                <Discovery />
            </LayoutBase>
        </>
    )
}

export default index
