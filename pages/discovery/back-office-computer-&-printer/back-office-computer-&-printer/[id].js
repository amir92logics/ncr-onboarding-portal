import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"

import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import BackOfficeComputer from "../../../../components/BackOfficeComputer"
import { useRouter } from "next/router"
import theme from "../../../../src/theme"

export default function ContactConfirmationPage() {
    const router = useRouter()
    const routerID = router.query.id

    return (
        <>
            <Head>
                <title>Back Office Computer & Printer | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <LayoutBase
                routerID={routerID}
                title={
                    <Box>
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
                            Back Office Computer & Printer
                        </Typography>
                    </Box>
                }
            >
                <BackOfficeComputer />
            </LayoutBase>
        </>
    )
}
