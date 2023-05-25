import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    Skeleton,
    Stack
} from "@mui/material"

import React, { useState } from "react"
import { useSelector } from "react-redux"
import theme from "../../src/theme"
import TableRows from "./Row"
import Mobile from "./Mobile"
import { useRouter } from "next/router"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import useElementSize from "../../helper/useElementSize"

function Loader({ path }) {
    return (
        <>
            {path == "/" ? (
                [1, 2, 3].map((item, index) => (
                    <React.Fragment key={item}>
                        <TableRow
                            sx={{
                                borderBottom: index == 2 && "2px solid #fff"
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    component="div"
                                >
                                    <Skeleton
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Typography>
                                <Typography fontSize="12px" component="div">
                                    <Skeleton
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                {" "}
                                <Skeleton animation="pulse" variant={"text"} />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton animation="pulse" />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    sx={{ width: "80px", height: "8px" }}
                                    animation="pulse"
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    sx={{
                                        width: "80px",
                                        height: "30px",
                                        borderRadius: "8px"
                                    }}
                                    animation="pulse"
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    sx={{ borderRadius: "8px" }}
                                    animation="pulse"
                                />
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                ))
            ) : (
                <>
                    {" "}
                    <Box
                        sx={{
                            display: {
                                lg: "block",
                                xs: "none"
                            },
                            "& > *": {
                                borderBottom: "unset"
                            },
                            height: "350px"
                        }}
                    >
                        <Box
                            component="th"
                            scope="row"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: "100%",
                                height: "74px",
                                backgroundColor: "#EBEBEB"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    paddingX: "16px",
                                    paddingTop: "20px"
                                }}
                            >
                                <Box>
                                    <Skeleton
                                        animation="pulse"
                                        width={"100px"}
                                        height={"25px"}
                                        variant={"text"}
                                    />
                                    <Skeleton
                                        animation="pulse"
                                        width={"70px"}
                                        height={"15px"}
                                        variant={"text"}
                                        sx={{ marginLeft: "12px" }}
                                    />
                                </Box>
                                <Skeleton
                                    animation="pulse"
                                    width={"100px"}
                                    height={"25px"}
                                    variant={"text"}
                                />
                                <Skeleton
                                    animation="pulse"
                                    width={"100px"}
                                    height={"25px"}
                                    variant={"text"}
                                />

                                <Skeleton
                                    animation="pulse"
                                    width={"100px"}
                                    height={"25px"}
                                    variant={"text"}
                                />
                                <Skeleton
                                    animation="pulse"
                                    width={"150px"}
                                    height={"45px"}
                                    variant={"text"}
                                />
                                <Skeleton
                                    animation="pulse"
                                    width={"70px"}
                                    height={"15px"}
                                    variant={"text"}
                                />
                            </Box>
                            <Box marginTop={"30px"} paddingX={"16px"}>
                                <Skeleton
                                    animation="pulse"
                                    width={"100px"}
                                    height={"25px"}
                                    variant={"text"}
                                />
                            </Box>

                            <Stack
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingTop: "44px",
                                    paddingX: "16px",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Box
                                    className="Loader-a"
                                    sx={{
                                        display: { xs: "flex", md: "none" },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    className="Loader-a"
                                    sx={{
                                        display: { xs: "flex", md: "none" },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                                <Box
                                    className="hide-loader"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            width: "100px",
                                            height: "20px",
                                            marginBottom: "5px"
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={140}
                                        height={84}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

function Overview() {
    const router = useRouter()
    const path = router.pathname
    const pid = router.query.id
    const [squareRef, { width }] = useElementSize()
    const [toggleIndex1, setToggleIndex1] = useState(-1)
    const isDesktop = useMediaQuery((th) => th.breakpoints.up("xl"))
    const xs = useMediaQuery((th) => th.breakpoints.down("lg"))
    const apiloadingstate = useSelector(
        (state) => state.dataSlice.apiloadingstate
    )
    const datatable = useSelector((state) => state.dataSlice.tableData)
    return (
        <Box
            sx={{
                paddingX: {
                    xl: "32px",
                    lg: "32px",
                    md: !isDesktop ? "24px" : "32px",
                    xs: "16px"
                },
                paddingBottom: { md: "32px", xs: "16px" },

                width: "100%",
                overflowX: "hidden"
            }}
        >
            <Box>
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "hidden"
                    }}
                >
                    {path === "/" && (
                        <Box
                            className="Shedule-res"
                            sx={{
                                maxWidth: { xl: "1072px" },
                                margin: "auto",
                                color: theme.palette.textColor.main,
                                fontWeight: "700",
                                letterSpacing: "-0.0167em",
                                fontSize: { lg: "20px", xs: "16px" },
                                lineHeight: "32px",
                                boxShadow: "unset"
                            }}
                        >
                            Projects
                        </Box>
                    )}
                    <Box
                        className="Shedule-res"
                        ref={squareRef}
                        sx={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            overflowX: "hidden",
                            borderRadius: path === "/" && "8px",
                            boxShadow:
                                " 0px 6px 10px rgb(0 0 0 / 3%), 0px 1px 18px rgb(0 0 0 / 2%) !important",
                            my: { lg: "14px" },
                            maxWidth: { xl: "1072px" }
                        }}
                    >
                        {!xs && (
                            <TableContainer
                                ref={squareRef}
                                className="shadow"
                                sx={{
                                    width: "100%",
                                    background: "white",
                                    borderRadius: !pid && "8px",
                                    display: {
                                        lg: "block",
                                        xs: "none"
                                    }
                                }}
                            >
                                <Table
                                    className="shadow"
                                    aria-label="simple table"
                                >
                                    {path === "/" && (
                                        <TableHead
                                            sx={{
                                                display: "table-header-group"
                                            }}
                                        >
                                            <TableRow
                                                sx={{
                                                    color: theme.palette
                                                        .textColor.main,
                                                    letterSpacing: "0.15px",
                                                    fontSize: "14px",
                                                    lineHeight: "24px"
                                                }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        px: "16px",
                                                        py: "16px",
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        whiteSpace: "nowrap",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    Project Description
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        whiteSpace: "nowrap",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    Project Creation Date
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    Progress
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    Status
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        color: "#1e1e1e",
                                                        padding: {
                                                            lg: "0px !important",
                                                            xl: "16px !important"
                                                        }
                                                    }}
                                                >
                                                    Next Step
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11.5px",
                                                        lineHeight: "18px",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    )}

                                    <TableBody>
                                        {datatable.status === false ? (
                                            <></>
                                        ) : (
                                            <>
                                                {apiloadingstate ? (
                                                    <Loader path={path} />
                                                ) : (
                                                    datatable?.map((row, i) => (
                                                        <React.Fragment
                                                            key={
                                                                row.record_id_quickbase
                                                            }
                                                        >
                                                            {pid ? (
                                                                pid ==
                                                                    row.record_id_quickbase && (
                                                                    <TableRows
                                                                        last={
                                                                            datatable?.length -
                                                                            1
                                                                        }
                                                                        width={
                                                                            width
                                                                        }
                                                                        rowIndex={
                                                                            i
                                                                        }
                                                                        row={
                                                                            row
                                                                        }
                                                                        setToggleIndex1={
                                                                            setToggleIndex1
                                                                        }
                                                                        pid={
                                                                            pid
                                                                        }
                                                                        toggleIndex1={
                                                                            toggleIndex1
                                                                        }
                                                                    />
                                                                )
                                                            ) : (
                                                                <TableRows
                                                                    last={
                                                                        datatable?.length -
                                                                        1
                                                                    }
                                                                    width={
                                                                        width
                                                                    }
                                                                    rowIndex={i}
                                                                    row={row}
                                                                    setToggleIndex1={
                                                                        setToggleIndex1
                                                                    }
                                                                    toggleIndex1={
                                                                        toggleIndex1
                                                                    }
                                                                />
                                                            )}
                                                        </React.Fragment>
                                                    ))
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>

                    {xs && (
                        <Box
                            sx={{
                                display: {
                                    lg: "none",
                                    xs: "block"
                                }
                            }}
                        >
                            {datatable.status === false ? (
                                <></>
                            ) : (
                                <>
                                    {apiloadingstate ? (
                                        <React.Fragment>
                                            <Box
                                                sx={{
                                                    marginTop: "100px"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        borderRadius: "8px",
                                                        marignTop: "8px"
                                                    }}
                                                >
                                                    <Skeleton
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "flex-start",
                                                            justifyContent:
                                                                "space-between",
                                                            padding: "18px",
                                                            height: "402px",
                                                            borderRadius: "8px"
                                                        }}
                                                    />
                                                </Box>
                                                {path == "/" && (
                                                    <>
                                                        <Box
                                                            sx={{
                                                                mt: "-120px",
                                                                borderRadius:
                                                                    "8px",
                                                                marignTop: "8px"
                                                            }}
                                                        >
                                                            <Skeleton
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "flex-start",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    padding:
                                                                        "18px",
                                                                    height: "402px",
                                                                    borderRadius:
                                                                        "8px"
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                mt: "-120px",
                                                                borderRadius:
                                                                    "8px",
                                                                marignTop: "8px"
                                                            }}
                                                        >
                                                            <Skeleton
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "flex-start",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    padding:
                                                                        "18px",
                                                                    height: "402px",
                                                                    borderRadius:
                                                                        "8px"
                                                                }}
                                                            />
                                                        </Box>
                                                    </>
                                                )}
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <Mobile rows={datatable} />
                                    )}
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Overview
