import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../../../components/LayoutBase"
import Head from "next/head"
import { useRouter } from "next/router"
import ReviewProject from "../../../../components/ReviewProject"
import theme from "../../../../src/theme"

export default function ContactConfirmationPage() {
    const router = useRouter()
    const routerID = router.query.id

    return (
        <>
            <Head>
                <title>Confirmation | NCR Onboarding</title>
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
                                color: theme.palette.textColor.main
                            }}
                        >
                            Back Office Computer & Printer
                        </Typography>
                    </Box>
                }
            >
                <Box sx={{ width: "100%" }}>
                    <ReviewProject />
                </Box>
            </LayoutBase>
        </>
    )
}
