import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../components/LayoutBase"
import MenuProgrammingComplete from "../../components/MenuProgrammingComplete"
import Head from "next/head"
import theme from "../../src/theme"

export default function MenuprogrammingComplete() {
    return (
        <>
            <Head>
                <title>Confirm Programming Complete | NCR Onboarding</title>
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
                            Confirm Programming Complete
                        </Typography>
                    </Box>
                }
            >
                <Box className="container-layout-main">
                    <MenuProgrammingComplete />
                </Box>
            </LayoutBase>
        </>
    )
}
