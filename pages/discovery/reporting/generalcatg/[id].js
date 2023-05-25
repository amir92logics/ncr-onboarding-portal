import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import { LayoutBase } from "../../../../components/LayoutBase"
import GeneralCategoriesComponent from "../../../../components/Discovery/Reporting/GeneralCategoriesComponent"

import Head from "next/head"
import theme from "../../../../src/theme"

export default function GeneralCategoriesPage() {
    return (
        <>
            <Head>
                <title>General Categories | NCR Onboarding</title>
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
                            General Categories
                        </Typography>
                    </Box>
                }
            >
                <GeneralCategoriesComponent />
            </LayoutBase>
        </>
    )
}
