import React from "react"
import Box from "@mui/system/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import SalesAndRetailCategoriesComponent from "../../../../components/Discovery/Reporting/SalesAndRetailCategoriesComponent"

import Head from "next/head"
import theme from "../../../../src/theme"

export default function SalesAndRetailCategoriesPage() {
    return (
        <>
            <Head>
                <title>Sales and Retail Categories | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main,
                                fontWeight: "600",
                                fontSize: "24px",
                                lineHeight: "32px"
                            }}
                        >
                            Sales and Retail Categories
                        </Typography>
                    </Box>
                }
            >
                <SalesAndRetailCategoriesComponent />
            </LayoutBase>
        </>
    )
}
