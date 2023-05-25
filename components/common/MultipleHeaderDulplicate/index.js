import React from "react"
import { Tooltip, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Box } from "@mui/system"
import InputHandler from "../confirmationTable/InputHandler"
import { useRouter } from "next/router"
import theme from "../../../src/theme"

function MulitipleHeaderTableDuplicate({
    data,
    title,
    route,
    marginTopTable,
    marginTopTitle,
    headingColor,
    fieldFontColor,
    titleFontWeight,
    marginTopTablemd,
    type,
    setData,
    marginTopTitlemd,
    fontSize,
    lineHeight,
    printer,
    fontSized,
    name = "",
    disablebutton,
    dataloading
}) {
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = data
        tempUpdate[parentIndex].rowData[selfIndex] = item

        setData && setData(tempUpdate)
    }
    const router = useRouter()
    return (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: {
                            md: "flex",
                            xs: "none"
                        },
                        justifyContent: "space-between",
                        marginTop: {
                            xs: marginTopTitle == "0px" ? "" : "32px",
                            md: marginTopTitlemd,
                            lg: marginTopTitle
                        },
                        alignItems: "center"
                    }}
                >
                    <Box display={"flex"}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight: "16px",
                                fontSize: {
                                    md: "18px",
                                    xs: fontSize ? fontSize : "14px"
                                },
                                lineHeight: {
                                    lg: "27px",
                                    xs: lineHeight ? lineHeight : "16px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            {title}
                        </Typography>{" "}
                        <Box
                            sx={{
                                paddingTop: {
                                    lg: "4px",
                                    md: name.includes("network")
                                        ? "4px"
                                        : "0px",
                                    xs: "0px"
                                },
                                marginLeft: "-7px"
                            }}
                        >
                            <Tooltip
                                aria-label=""
                                title={`Details for ${title}`}
                                placement="bottom"
                                arrow={true}
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            color: "#fff",
                                            fontSize: "12px",
                                            padding: "6px 12px",
                                            fontWeight: 400,
                                            lineHeight: "18px"
                                        }
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        cursor: "pointer"
                                    }}
                                >
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`This is tooltip icon for ${title}`}</title>
                                        <path
                                            d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                            fill="#757575"
                                        />
                                    </svg>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>

                    {!disablebutton && !dataloading && <Box
                        display={"flex"}
                        sx={{
                            cursor: "pointer",
                            marginTop: "-2px",
                            marginLeft: "2px",
                            alignitems: "center",
                            justifyContent: "center",
                            padding: "8px",

                            borderRadius: "8px",
                            "&:hover": {
                                background: "#F5F6FF"
                            }
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems={"center"}
                            justifyContent="center"
                            marginTop={"-1px"}
                        >
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                        <title>{`This is Edit Stage icon for ${title}`}</title>
                                <path
                                    d="M10.0702 5.16311L9.71667 4.80956L9.36311 5.16311L1.81311 12.7131L1.66667 12.8596V13.0667V13.8333V14.3333H2.16667H2.93333H3.14044L3.28689 14.1869L10.8369 6.63689L11.1904 6.28333L10.8369 5.92978L10.0702 5.16311ZM12.4869 1.09522C12.548 1.0341 12.636 1 12.7167 1C12.8123 1 12.8898 1.03023 12.9548 1.09522L14.9048 3.04522C15.0345 3.17496 15.0345 3.38338 14.9048 3.51311L13.7333 4.68456L11.3154 2.26667L12.4869 1.09522ZM1 12.5821L9.71667 3.86544L12.1346 6.28333L3.41789 15H1V12.5821Z"
                                    fill={theme.palette.primary.main}
                                    stroke={theme.palette.primary.main}
                                />
                            </svg>
                        </Box>
                        <Typography
                            onClick={() => {
                                router.push({
                                    pathname: route,
                                    query: { inner: true }
                                })
                            }}
                            sx={{
                                fontWeight: 600,

                                paddingLeft: "6px",
                                fontSize: {
                                    lg: "12px",
                                    xs: "12px"
                                },
                                lineHeight: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                color: theme.palette.primary.main,
                                "&:hover": { color: "#062EC9" }
                            }}
                        >
                            Edit Stage
                        </Typography>
                    </Box>}
                </Box>
            )}

            <Box
                sx={{
                    display: {
                        md: "block",
                        xs: "none"
                    },
                    width: "100%",
                    marginTop: {
                        lg: marginTopTable,
                        md: marginTopTablemd,
                        xs: "16px"
                    }
                }}
            >
                <TableContainer
                    aria-label={`This Table for ${title}`}
                    className="shadow"
                    sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px"
                    }}
                    component={Paper}
                >
                    <Table
                        sx={{ border: "unset" }}
                        size="medium"
                        aria-label={`This Table for ${title}`}
                    >
                        <TableBody>
                            <TableRow>
                                {data?.map((i) => {
                                    return (
                                        <TableCell
                                            aria-label={`This table cell for ${i?.title}`}
                                            key={i + Math.random()}
                                            sx={{
                                                padding: "16px 18.5px",
                                                backgroundColor: "#F5F5F5",
                                                borderBottom: "1px solid white",
                                                fontSize: "12px   !important",
                                                lineHeight: "19px",
                                                fontWeight: titleFontWeight,
                                                color: headingColor
                                            }}
                                            align="left"
                                        >
                                            {i?.title}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            {!printer ? (
                                <>
                                    {data[0].rowData?.map((i, j) => {
                                        return (
                                            <TableRow
                                                key={i + Math.random()}
                                                sx={{
                                                    fontSize: {
                                                        lg: "12px",
                                                        xs: "16px"
                                                    },
                                                    fontWeight: 500,
                                                    lineHeight: {
                                                        lg: "12px",
                                                        xs: "24px"
                                                    }
                                                }}
                                            >
                                                {data?.map((item, index) => {
                                                    return (
                                                        <TableCell
                                                            aria-label={`This table cell for ${item.rowData[j]}`}
                                                            key={
                                                                index +
                                                                Math.random()
                                                            }
                                                            sx={{
                                                                borderBottom:
                                                                    "unset",
                                                                padding:
                                                                    "12px 18.5px",
                                                                fontSize:
                                                                    fontSized ||
                                                                    "14px   !important",
                                                                lineHeight:
                                                                    "24px",
                                                                fontWeight:
                                                                    "400",
                                                                color: fieldFontColor
                                                            }}
                                                            align="left"
                                                        >
                                                            {type ==
                                                                "textInput" ? (
                                                                <InputHandler
                                                                    handleUpdate={
                                                                        handleUpdate
                                                                    }
                                                                    parentIndex={
                                                                        index
                                                                    }
                                                                    fieldFontColor={
                                                                        fieldFontColor
                                                                    }
                                                                    rowItem={
                                                                        item
                                                                            .rowData[
                                                                        j
                                                                        ]
                                                                    }
                                                                    j={j}
                                                                    type={
                                                                        "text"
                                                                    }
                                                                />
                                                            ) : (
                                                                item.rowData[j]
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    {(data[1]?.rowData.length >
                                        data[0]?.rowData.length
                                        ? data[1]?.rowData
                                        : data[0]?.rowData
                                    ).map((i, j) => {
                                        return (
                                            <TableRow
                                                key={i + Math.random()}
                                                sx={{
                                                    fontSize: {
                                                        lg: "12px",
                                                        xs: "16px"
                                                    },
                                                    fontWeight: 500,
                                                    lineHeight: {
                                                        lg: "12px",
                                                        xs: "24px"
                                                    }
                                                }}
                                            >
                                                {data?.map((item, index) => {
                                                    return (
                                                        <TableCell
                                                            aria-label={`This table cell for ${item.rowData[j]}`}
                                                            key={
                                                                index +
                                                                Math.random()
                                                            }
                                                            sx={{
                                                                borderBottom:
                                                                    title.includes(
                                                                        "Routing"
                                                                    )
                                                                        ? data[0]
                                                                            ?.rowData
                                                                            .length -
                                                                            1 ===
                                                                            j
                                                                            ? "unset"
                                                                            : ""
                                                                        : data
                                                                            ?.rowData
                                                                            ?.length -
                                                                            1 ===
                                                                            index
                                                                            ? "unset"
                                                                            : "",

                                                                padding:
                                                                    "12px 18.5px",
                                                                fontSize:
                                                                    title.includes(
                                                                        "Routing"
                                                                    )
                                                                        ? "12px"
                                                                        : "14px   !important",
                                                                lineHeight:
                                                                    "24px",
                                                                fontWeight:
                                                                    "400",
                                                                color: fieldFontColor
                                                            }}
                                                            align="left"
                                                        >
                                                            {type ==
                                                                "textInput" ? (
                                                                <InputHandler
                                                                    handleUpdate={
                                                                        handleUpdate
                                                                    }
                                                                    parentIndex={
                                                                        index
                                                                    }
                                                                    fieldFontColor={
                                                                        fieldFontColor
                                                                    }
                                                                    rowItem={
                                                                        item
                                                                            .rowData[
                                                                        j
                                                                        ]
                                                                    }
                                                                    j={j}
                                                                    type={
                                                                        "text"
                                                                    }
                                                                />
                                                            ) : (
                                                                item.rowData[j]
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
MulitipleHeaderTableDuplicate.defaultProps = {
    titleFontWeight: "600",
    headingColor: "#5C5C5C",
    fieldFontColor: "#4B5563",
    type: "textInput"
}
export default MulitipleHeaderTableDuplicate
