import React from "react"
import { Link, Tooltip, Typography, Fade } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import { Box } from "@mui/system"
import Dropdown from "../Dropdown/Dropdown"
import InputHandler from "../confirmationTable/InputHandler"
import theme from "../../../src/theme"
import { useRouter } from "next/router"

function FifthResponsiveTable({
    headingColor,
    lineHeight,
    titleFontWeight,
    titlelineHeight,
    titleFontSize,
    data,
    title,
    route,
    marginTopTable,
    marginTopTitle,
    marginTopTitlemd,
    tablepadding,
    border,
    type,
    fontSize,
    maxWidth,
    fullWidth,
    alignItems,
    setData,
    bgcolor,
    itemList,
    bgtextcolor,
    width,
    name,
    disablebutton,
    dataloading
}) {
    const router = useRouter()
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = [...data]
        tempUpdate[parentIndex].rowData[selfIndex] = item
        setData && setData(tempUpdate)
    }
    return (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: {
                            md: "none",
                            xs: "flex"
                        },
                        justifyContent: "space-between",
                        marginTop: {
                            lg: marginTopTitle,
                            xs:
                                marginTopTitle == "0px"
                                    ? ""
                                    : marginTopTitlemd
                                        ? marginTopTitlemd
                                        : "32px"
                        },
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: alignItems ? alignItems : "center",
                            maxWidth:
                                title == "NCR Managed Network with NSS"
                                    ? "200px"
                                    : maxWidth,
                            width:
                                title == "NCR Managed Network with NSS"
                                    ? "100%"
                                    : fullWidth
                        }}
                    >
                        <Box
                            sx={{
                                fontWeight: 600,
                                paddingRight: "16px",
                                fontSize: {
                                    lg: "18px",
                                    xs: fontSize ? fontSize : "14px"
                                },
                                lineHeight: {
                                    lg: "27px",
                                    xs: lineHeight ? lineHeight : "16px"
                                },
                                color: "#000000DE"
                            }}
                        >
                            {title}
                        </Box>{" "}
                        <Box
                            sx={{
                                paddingTop: {
                                    lg: "4px",
                                    md: "0px",
                                    xs: "0px"
                                },
                                position:
                                    name.includes("network") && "absolute",
                                bottom: name.includes("network") && "0px",
                                right: name.includes("network") && "10px"
                            }}
                        >
                            <Tooltip
                                aria-label={""}
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
                        width={"117px"}
                        sx={{
                            cursor: "pointer",

                            alignitems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems={"center"}
                            justifyContent="center"
                        >
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`This is  Edit Stage iconF for ${title}`}</title>
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
                                paddingLeft: "8px",
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
                    display: { md: "none", xs: "flex" },
                    width: "100%",
                    marginTop: {
                        lg: marginTopTable,
                        sm: marginTopTable,
                        xs: "16px"
                    }
                }}
            >
                <TableContainer
                    aria-label={`This is ${title} table`}
                    className="shadow"
                    sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px"
                    }}
                >
                    <Table
                        aria-label={`This is ${title} table`}
                        sx={{ border: `${border ? "unset" : ""} ` }}
                        size="medium"
                    >
                        <TableBody>
                            {data?.map((item, index) => (
                                <Fade
                                    key={`${index + 1}`}
                                    in={true}
                                    {...(true ? { timeout: 1000 } : {})}
                                >
                                    <TableRow
                                        sx={{
                                            fontSize: {
                                                lg: "12px",
                                                md: "16px"
                                            },
                                            fontWeight: 500,
                                            lineHeight: {
                                                lg: "21px",
                                                xs: "21px"
                                            }
                                        }}
                                    >
                                        <TableCell
                                            aria-label={`This table cell for ${item.title
                                                .split("<a>")[1]}`}
                                            sx={{
                                                width: "179px",
                                                padding: tablepadding
                                                    ? tablepadding
                                                    : item.rowData?.length > 0
                                                        ? "12px 16px"
                                                        : "16px",
                                                backgroundColor: bgcolor
                                                    ? bgcolor
                                                    : "#F5F5F5",
                                                fontSize: titleFontSize
                                                    ? titleFontSize
                                                    : "14px  !important",
                                                lineHeight: `${titlelineHeight
                                                        ? titlelineHeight
                                                        : lineHeight
                                                            ? lineHeight
                                                            : "21px"
                                                    }`,
                                                fontWeight: `${titleFontWeight
                                                        ? titleFontWeight
                                                        : "600"
                                                    }`,
                                                color: `${headingColor
                                                        ? headingColor
                                                        : "#4B5563"
                                                    }`,
                                                borderBottom:
                                                    data.length - 1 == index &&
                                                    `transparent solid 1px`
                                            }}
                                            align="left"
                                        >
                                            {item?.title.includes("<a>") ? (
                                                <>
                                                    {item.title.split("<a>")[0]}
                                                    <Link
                                                        aria-label={`This table cell for ${item.title
                                                            .split("<a>")[1]}`}
                                                        sx={{
                                                            fontSize: {
                                                                lg: "16px",
                                                                xs: "14px"
                                                            },

                                                            color: theme.palette
                                                                .primary.main,
                                                            textDecoration:
                                                                "none",
                                                            borderBottom: `${theme.palette.primary.main} solid 1px`
                                                        }}
                                                        href="#"
                                                    >
                                                        {
                                                            item.title
                                                                .split("<a>")[1]
                                                                .split(
                                                                    "</a>"
                                                                )[0]
                                                        }
                                                    </Link>
                                                    {
                                                        item.title
                                                            .split("<a>")[1]
                                                            .split("</a>")[1]
                                                    }
                                                </>
                                            ) : (
                                                <Box>{item.title}</Box>
                                            )}
                                        </TableCell>
                                        {item.rowData?.map((rowItem, j) => {
                                            return (
                                                <React.Fragment
                                                    key={`${j + 1}`}
                                                >
                                                    <TableCell
                                                        aria-label={`This table cell for ${item}`}
                                                        sx={{
                                                            bgcolor:
                                                                bgtextcolor,
                                                            borderBottom:
                                                                data.length -
                                                                1 ==
                                                                index &&
                                                                `transparent solid 1px`
                                                        }}
                                                    >
                                                        {type == "dropdown" ||
                                                            type[index] ==
                                                            "dropdown" ? (
                                                            <Dropdown
                                                                itemList={
                                                                    itemList &&
                                                                    (itemList[0]
                                                                        .value
                                                                        ? itemList
                                                                        : itemList[
                                                                        j
                                                                        ])
                                                                }
                                                                selfIndex={j}
                                                                parentIndex={
                                                                    index
                                                                }
                                                                color="#1E1E1E"
                                                                handleUpdate={
                                                                    handleUpdate
                                                                }
                                                                item={rowItem}
                                                                width={width}
                                                            />
                                                        ) : type ==
                                                            "text-area" ||
                                                            type[j] ==
                                                            "text-area" ? (
                                                            <InputHandler
                                                                type="text"
                                                                rowItem={
                                                                    rowItem
                                                                }
                                                                textArea={type}
                                                                fieldFontColor={
                                                                    "#000000"
                                                                }
                                                                handleUpdate={
                                                                    handleUpdate
                                                                }
                                                                j={j}
                                                                parentIndex={
                                                                    index
                                                                }
                                                            />
                                                        ) : type[index] !=
                                                            "Disabled" ? (
                                                            <InputHandler
                                                                type="NoBorder"
                                                                rowItem={
                                                                    rowItem
                                                                }
                                                                textArea={type}
                                                                fieldFontColor={
                                                                    "#000000"
                                                                }
                                                                bgtextcolor={
                                                                    "#1E1E1E"
                                                                }
                                                                handleUpdate={
                                                                    handleUpdate
                                                                }
                                                                j={j}
                                                                parentIndex={
                                                                    index
                                                                }
                                                            />
                                                        ) : (
                                                            <Box
                                                                style={{
                                                                    padding: "0"
                                                                }}
                                                                className="input-field"
                                                            >
                                                                {item}
                                                            </Box>
                                                        )}
                                                    </TableCell>
                                                </React.Fragment>
                                            )
                                        })}
                                    </TableRow>
                                </Fade>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
FifthResponsiveTable.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    border: true,
    fieldFontColor: "#4B5563",
    type: "input",
    isArray: true,
    width: null
}
export default FifthResponsiveTable
