import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Divider, Skeleton } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export default function SiteReadinessLoader() {
    const theme = useTheme()
    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
        >
            <Box
                marginTop={theme.spacing(4)}
                display="flex"
                alignItems="start"
                sx={{
                    paddingLeft: {
                        xl: "127px",
                        xs: "0px"
                    },
                    marginRight: {
                        xl: "199px",
                        xs: "0px"
                    },
                    width: {
                        xxs: "100%",
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%",
                        xl: "auto"
                    }
                }}
            >
                <Box
                    display="flex-col"
                    alignItems="start"
                    flexWrap="wrap"
                    height="192px"
                    width="100%"
                    sx={{
                        marginTop: {
                            xl: "8px",
                            xs: "8px"
                        },
                        width: {
                            xxs: "100%",
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "100%",
                            xl: "100%"
                        }
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        flexDirection={"column"}
                        sx={{
                            maxWidth: {
                                lg: "100%",
                                xs: "100%"
                            }
                        }}
                        padding="0px 0px 0px 0px"
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                width: {
                                    xxs: "100%",
                                    xs: "100%",
                                    sm: "100%",
                                    md: "400px",
                                    lg: "500px",
                                    xl: "500px"
                                },
                                fontSize: {
                                    lg: "20px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "32px",
                                    xs: "28px"
                                },
                                paddingBottom: {
                                    lg: "32px",
                                    xs: "16px"
                                }
                            }}
                        >
                            <Skeleton animation="pulse" variant={"text"} />
                        </Typography>
                        <Box
                            sx={{
                                boxShadow: 4,
                                borderRadius: "8px",
                                marignTop: "8px",
                                backgroundColor: "white",
                                width: "100%"
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "60px",
                                    borderRadius: "8px 8px 0px 0px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                                variant="rectangular"
                            />
                        </Box>

                        <Box
                            sx={{
                                boxShadow: 4,
                                borderRadius: "8px",
                                marignTop: "8px",
                                backgroundColor: "white",
                                width: "100%",
                                marginTop: {
                                    lg: "24px",
                                    xs: "32px"
                                }
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "60px",
                                    borderRadius: "8px 8px 0px 0px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                                variant="rectangular"
                            />
                        </Box>

                        <Box
                            sx={{
                                boxShadow: 4,
                                borderRadius: "8px",
                                marignTop: "8px",
                                backgroundColor: "white",
                                width: "100%",
                                marginTop: {
                                    lg: "24px",
                                    xs: "32px"
                                }
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "60px",
                                    borderRadius: "8px 8px 0px 0px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                                variant="rectangular"
                            />
                        </Box>

                        <Box
                            sx={{
                                boxShadow: 4,
                                borderRadius: "8px",
                                marignTop: "8px",
                                backgroundColor: "white",
                                width: "100%",
                                marginTop: {
                                    lg: "24px",
                                    xs: "32px"
                                }
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "60px",
                                    borderRadius: "8px 8px 0px 0px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                                variant="rectangular"
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            marginTop: {
                                lg: "24px",
                                xs: "32px"
                            },
                            width: {
                                xxs: "100%",
                                xl: "1100px"
                            }
                        }}
                    >
                        <Skeleton
                            sx={{ width: "100%" }}
                            animation="pulse"
                            variant={"text"}
                        />
                        <Skeleton animation="pulse" variant={"text"} />
                        <Skeleton animation="pulse" variant={"text"} />
                        <Skeleton animation="pulse" variant={"text"} />
                        <Skeleton animation="pulse" variant={"text"} />
                    </Box>
                    <Divider
                        className="divider-col"
                        style={{ width: "100%", marginTop: theme.spacing(4) }}
                        sx={{
                            display: {
                                xs: "none",
                                xl: "block"
                            }
                        }}
                    />

                    <Box
                        paddingY={theme.spacing(2)}
                        display="flex"
                        justifyContent="flex-end"
                        sx={{
                            flexDirection: {
                                lg: "row",
                                md: "column",
                                xs: "column",
                                sm: "column"
                            }
                        }}
                    >
                        <Skeleton
                            sx={{
                                mr: {
                                    lg: 2,
                                    xs: 0
                                },
                                mb: {
                                    lg: 0,
                                    xs: "14px"
                                },
                                mt: {
                                    lg: 0,
                                    xs: "14px"
                                },
                                paddingTop: {
                                    lg: "9px",
                                    xs: "12px"
                                },
                                paddingBottom: {
                                    lg: "9px",
                                    xs: "12px"
                                },
                                paddingLeft: {
                                    lg: "20px",
                                    xs: "12px"
                                },
                                paddingRight: {
                                    lg: "20px",
                                    xs: "12px"
                                },
                                textTransform: {
                                    lg: "none",
                                    xs: "uppercase"
                                },

                                width: {
                                    lg: "91px",
                                    xs: "100%"
                                }
                            }}
                            animation="pulse"
                            variant="text"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
