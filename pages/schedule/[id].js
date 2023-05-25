import React from "react"
import { LayoutBase } from "../../components/LayoutBase"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import Overview from "../../components/CollapsibleTable/Overview"
import Head from "next/head"
import theme from "../../src/theme"
import { getMessage } from "../../helper/Constraints"
export default function HomePage() {
    const state = useSelector((state) => state.auth.user)
    return (
        <>
            <Head>
                <title>Schedule | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
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
                                {" "}
                                {getMessage()}, {state?.firstName}
                            </Typography>
                        </Box>
                    }
                ></LayoutBase>
            </Box>
            <Overview />
        </>
    )
}
