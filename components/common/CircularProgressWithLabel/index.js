import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

export default function CircularProgressWithLabel(props) {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: props.name.includes("overview") ? "0px" : "8px"
            }}
        >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                    sx={{ color: "#1D4ED8" }}
                    color={"info"}
                    variant="determinate"
                    {...props}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{
                            fontSize: "11px !important",
                            color: "#5C5C5C !important"
                        }}
                    >{`${Math.round(props.value)}%`}</Typography>
                </Box>
            </Box>
            {props?.title && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    marginLeft="8px"
                >
                    {props?.title}
                </Typography>
            )}
        </Box>
    )
}
