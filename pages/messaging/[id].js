import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import { LayoutBase } from "../../components/LayoutBase"
import MessagingComponent from "../../components/Messaging"
import { useRouter } from "next/router"
import Head from "next/head"
import theme from "../../src/theme"

export default function Messaging() {
    const router = useRouter()
    const pid = router.query.id
    const path = router.asPath
    return (
        <>
            <Head>
                <title>Messaging | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <LayoutBase
                showPercentageProgress={false}
                title={
                    <Box
                        display="flex"
                        flexDirection={"column"}
                        alignItems="flex-start"
                    >
                        <Box
                            onClick={() => {
                                router.push("/")
                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",

                                marginBottom: "8px",
                                cursor: "pointer"
                            }}
                        >
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.25 3.5L5.75 8L10.25 12.5"
                                    stroke="rgba(0, 0, 0, 0.6)"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    color: theme.palette.textColor.main,
                                    fontSize: "14px",
                                    lineHeight: "21px"
                                }}
                            >
                                Back to Projects
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "20px",
                                lineHeight: "30px",
                                marginBottom: "8px",
                                color: theme.palette.textColor.main
                            }}
                        >
                            New Aloha Essentials
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: "500",
                                color: theme.palette.textColor.main,
                                fontSize: "12px",
                                lineHeight: "18px"
                            }}
                        >
                            Project: {pid}
                        </Typography>
                    </Box>
                }
            >
                <MessagingComponent />
            </LayoutBase>
        </>
    )
}
