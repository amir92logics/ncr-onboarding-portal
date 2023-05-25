import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import LinearProgress, {
    linearProgressClasses
} from "@mui/material/LinearProgress"
import { Typography } from "@mui/material"
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#eee"
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 4,
        backgroundColor: theme.palette.primary.main
    }
}))

export default function BorderLinearProgressBar({ value, small, widthLg }) {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        minWidth: small ? widthLg || "90px" : "111px",
                        maxWidth: small ? widthLg || "90px" : "125px",
                        width: "100%",
                        mr: "8px"
                    }}
                >
                    <BorderLinearProgress variant="determinate" value={value} />
                </Box>
                <Box sx={{ fontSize: "12px", lineHeight: "18px" }}>
                    {value ? value : "0"}%
                </Box>
            </Box>
        </>
    )
}
const BorderLinearProgressDoc = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: " 8px",

    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#EEEEEE"
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: "#1D4ED8 "
    }
}))
export function BorderLinearProgressBarForDocument({
    value,
    fileName,
    uploder
}) {
    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <Box
                sx={{
                    display: "flex",

                    justifyContent:
                        uploder != "overview" ? "space-between" : "",

                    width: "100%",
                    paddingY: uploder === "overview" ? "3px" : "27px",

                    flexDirection: uploder != "overview" ? "column" : "row",
                    alignItems: "center"
                }}
            >
                <Box
                    aria-label={fileName}
                    sx={{
                        color: "#1E1E1E",
                        fontWeight: 600,
                        whiteSpace: "auto",
                        wordBreak: "break-all",
                        maxWidth: 150,
                        fontSize: "14px",
                        lineHeight: "22px",
                        width: uploder === "overview" ? "50%" : "max-content"
                    }}
                >
                    <span style={{ paddingX: "2px" }}> Uploading{""} </span>
                    {fileName}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingY: uploder === "overview" ? "0px" : "48px",

                        width: "100%"
                    }}
                >
                    <Box
                        sx={{
                            display: uploder === "overview" ? "flex" : "",
                            flexDirection:
                                uploder === "overview" ? "column" : "row",
                            width: uploder === "overview" ? "50%" : "100%"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#5C5C5C",
                                fontSize: "12px",
                                fontWeight: "400",
                                paddingBottom: "8px"
                            }}
                        >
                            Progress {value}%
                        </Typography>
                        <Box sx={{ width: "100%", backgroundColor: "#A3A3A3" }}>
                            <BorderLinearProgressDoc
                                variant="determinate"
                                value={value}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
