import React from "react"
import Box from "@mui/material/Box"
import { Divider, Skeleton } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export default function DocumentUploadLoader() {
    const theme = useTheme()
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Box
                marginTop={theme.spacing(4)}
                display="flex"
                alignItems="start"
                sx={{
                    width: {
                        xxs: "100%",
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%"
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
                        <Box
                            sx={{
                                fontWeight: 700,
                                width: {
                                    xxs: "100%",
                                    xs: "100%",
                                    sm: "100%"
                                },

                                paddingBottom: {
                                    lg: "32px",
                                    xs: "16px"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    boxShadow: 4,
                                    borderRadius: "8px 8px 8px 8px ",
                                    marignTop: "8px",
                                    backgroundColor: "white",
                                    width: "100%",
                                    height: "109px"
                                }}
                            >
                                <Skeleton
                                    animation="pulse"
                                    sx={{
                                        padding: "18px",
                                        width: "100%",
                                        height: "109px",
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
                                boxShadow: 4,
                                borderRadius: "8px 8px 0px 0px ",
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
                                    height: "56px",
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
                                backgroundColor: "white",
                                width: "100%"
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "56px",
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
                                backgroundColor: "white",
                                width: "100%"
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "56px",
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
                                borderRadius: "0px 0px 8px 8px ",
                                backgroundColor: "white",
                                width: "100%"
                            }}
                        >
                            <Skeleton
                                animation="pulse"
                                sx={{
                                    padding: "18px",
                                    width: "100%",
                                    height: "56px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                                variant="rectangular"
                            />
                        </Box>
                    </Box>{" "}
                    <Box
                        sx={{
                            marginTop: {
                                lg: "24px",
                                xs: "32px"
                            }
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent={"space-between"}
                            sx={{
                                display: "flex",
                                width: "100%",
                                mt: 0
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                sx={{ mt: 2 }}
                            >
                                <Box
                                    sx={{
                                        width: {
                                            sm: "200px",
                                            xs: "150px"
                                        },

                                        marginRight: {
                                            lg: 2,
                                            sm: 0
                                        },

                                        color: "#00000099"
                                    }}
                                >
                                    <Skeleton
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Box>
                            </Box>

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                sx={{
                                    marginTop: "8px"
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: "15px",
                                        lineHeigh: "16px",
                                        width: {
                                            md: "91px",
                                            xs: "60px"
                                        },
                                        textTransform: {
                                            lg: "none",
                                            sm: "uppercase"
                                        }
                                    }}
                                    aria-label="back"
                                    className="routeColor"
                                >
                                    <Skeleton
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: {
                                            md: "91px",
                                            xs: "60px"
                                        },
                                        fontSize: "15px",
                                        lineHeigh: "16px",

                                        textTransform: {
                                            lg: "none",
                                            sm: "uppercase"
                                        },
                                        marginLeft: "8px"
                                    }}
                                >
                                    <Skeleton
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Box>
                            </Box>
                        </Box>
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
                        paddingY={theme.spacing(4)}
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
                            style={{ marginRight: theme.spacing(2) }}
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
