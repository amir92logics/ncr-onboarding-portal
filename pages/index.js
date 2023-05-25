import React from "react"
import { useRouter } from "next/router"
import { LayoutBase } from "../components/LayoutBase"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import Overview from "../components/CollapsibleTable/Overview"
import theme from "../src/theme"
import { getMessage } from "../helper/Constraints"
export default function HomePage() {
    const router = useRouter()
    const path = router.pathname
    const pid = router.query.id
    const state = useSelector((state) => state.auth.user)
    return (
        <>
            <Box>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    <LayoutBase
                        pid={pid}
                        showPercentageProgress={false}
                        title={
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                {path == "/" && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: theme.palette.textColor
                                                    .main,
                                                fontWeight: "600",
                                                fontSize: "24px",
                                                lineHeight: "32px"
                                            }}
                                        >
                                            {" "}
                                            {getMessage()}, {state?.firstName}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        }
                    ></LayoutBase>
                </Box>
                <Overview />
            </Box>
        </>
    )
}
