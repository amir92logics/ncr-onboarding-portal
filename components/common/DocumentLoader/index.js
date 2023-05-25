import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Skeleton } from "@mui/material"

export default function DocumentLoader() {
    return (
        <>
            <div style={{ width: "100%" }} className="">
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            lineHeight: "32px"
                        }}
                    >
                        <Skeleton animation="pulse" variant={"text"} />
                    </Typography>
                </Box>
                <Skeleton animation="pulse" variant={"text"} />
                <Skeleton animation="pulse" variant={"text"} />
                <Skeleton animation="pulse" variant={"text"} />

                <ul
                    role="list"
                    className="list-docs"
                    style={{ listStylePosition: "inside" }}
                >
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                </ul>

                <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    marginTop={"24px"}
                >
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                </Typography>

                <Typography variant="body1" marginTop={"24px"}>
                    <Skeleton animation="pulse" variant={"text"} />
                </Typography>
            </div>

            <Box
                sx={{
                    ml: { lg: "32px", md: "16px" },
                    mt: {
                        xs: "16px",
                        md: "0px"
                    }
                }}
            >
                <Box
                    sx={{
                        boxShadow: 4,
                        borderRadius: "8px",
                        marignTop: "8px",
                        backgroundColor: "white"
                    }}
                >
                    <Skeleton
                        animation="pulse"
                        sx={{
                            padding: "18px",
                            width: {
                                xl: "463px",
                                lg: "463px",
                                md: "240px",
                                sm: "340px",
                                xs: "274px"
                            },
                            height: "370px",
                            borderRadius: "8px 8px 0px 0px",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between"
                        }}
                        variant="rectangular"
                    />
                </Box>
            </Box>
        </>
    )
}
