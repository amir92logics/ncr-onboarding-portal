import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Skeleton } from "@mui/material"
export default function ConfirmSiteInforLoader() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
        >
            <Box
                sx={{
                    width: {
                        xxs: "120px",
                        xs: "100%",
                        md: "700px",
                        lg: "800px",
                        xl: "943px"
                    },
                    mt: {
                        md: "16px"
                    }
                }}
            >
                <Box
                    sx={{
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxShadow: "inset 0px -1px 0px #E0E0E0",
                        padding: "16px",
                        mt: "24px",
                        display: {
                            xs: "block",
                            lg: "none"
                        }
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                opacity: "0.2"
                            }}
                        >
                            <Box sx={{ mt: "1px" }}>
                                <Skeleton
                                    animation="pulse"
                                    variant={"rectangular"}
                                    width="10px"
                                    height="10px"
                                />
                            </Box>
                            <Typography
                                sx={{
                                    pl: "9.75px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "21px",
                                    color: "#475569"
                                }}
                            >
                                <Skeleton animation="pulse" variant={"text"} />
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Skeleton animation="pulse" variant={"text"} />
                            <Box sx={{ mt: "1px" }}>
                                <Skeleton
                                    animation="pulse"
                                    variant={"rectangular"}
                                    width="10px"
                                    height="10px"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            lineHeight: "32px",
                            mt: "16px",
                            letterSpacing: "-1.67%"
                        }}
                    >
                        <Skeleton animation="pulse" variant={"text"} />
                    </Typography>
                    <Typography
                        sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "24px",
                            letterSpacing: "-1.1%"
                        }}
                    >
                        <Skeleton animation="pulse" variant={"text"} />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            xxs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row"
                        },
                        width: "100%"
                    }}
                    className="d-flex"
                >
                    <Box width="100%">
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="220px"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* address */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            xxs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row"
                        },
                        width: "100%"
                    }}
                    className="d-flex"
                >
                    <Box width="100%">
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="220px"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "100%", lg: "200px" },
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column"
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="220px"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* special note  */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            xxs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row"
                        },
                        width: "100%"
                    }}
                    className="d-flex"
                >
                    <Box width="100%">
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="280px"
                                />
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="280px"
                                />
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="280px"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* main contact */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            xxs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row"
                        },
                        width: "100%"
                    }}
                    className="d-flex"
                >
                    <Box width="100%">
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="220px"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "100%", lg: "200px" },
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column"
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    animation="pulse"
                                    variant={"text"}
                                    width="220px"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* text fields */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            xxs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row"
                        },
                        width: "100%"
                    }}
                    className="d-flex"
                >
                    <Box width="100%">
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    sx={{
                                        marginTop: "4px",

                                        width: {
                                            xxs: "100%",
                                            md: "240px",
                                            sm: "100%"
                                        },
                                        height: {
                                            xl: "40px",
                                            xs: "40px"
                                        },
                                        marginBottom: "24px",
                                        border: 1,
                                        borderRadius: "8px"
                                    }}
                                    animation="pulse"
                                    variant={"rectangular"}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "100%", lg: "200px" },
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column"
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            marginTop={"16px"}
                            fontWeight="700"
                            fontSize="20px"
                            sx={{ marginBottom: "8px" }}
                        >
                            <Skeleton
                                animation="pulse"
                                variant={"text"}
                                width="170px"
                            />
                        </Typography>
                        <Box
                            display="block"
                            sx={{
                                "& .MuiTextField-root": {
                                    minWidth: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "271px",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    display: "block"
                                },
                                "& .MuiOutlinedInput-root": {
                                    width: {
                                        xxs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "271px",
                                        xl: "271px"
                                    },
                                    height: "40px"
                                }
                            }}
                        >
                            <Box>
                                <Skeleton
                                    sx={{
                                        marginTop: "4px",

                                        width: {
                                            xxs: "100%",
                                            md: "240px",
                                            xs: "100%"
                                        },
                                        height: {
                                            xl: "40px",
                                            sm: "40px"
                                        },
                                        marginBottom: "24px",
                                        border: 1,
                                        borderRadius: "8px"
                                    }}
                                    animation="pulse"
                                    variant={"rectangular"}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Skeleton
                    style={{
                        width: "104%",
                        marginTop: "16px"
                    }}
                    sx={{
                        display: {
                            sm: "none",
                            lg: "block"
                        },
                        height: "2px"
                    }}
                    animation="pulse"
                    variant={"text"}
                />
                <Box
                    paddingY={2}
                    width="104%"
                    display="flex"
                    sx={{
                        flexDirection: {
                            xl: "row",
                            sm: "column"
                        }
                    }}
                    justifyContent="flex-end"
                >
                    <Skeleton
                        sx={{
                            mb: {
                                xl: 0,
                                sm: "14px"
                            },
                            paddingTop: {
                                xl: "9px",
                                sm: "12px"
                            },
                            paddingBottom: {
                                xl: "9px",
                                sm: "12px"
                            },
                            textTransform: {
                                xl: "none",
                                sm: "uppercase"
                            },
                            width: "100px",
                            height: "60px"
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
