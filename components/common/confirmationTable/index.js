import React, { useState } from "react"
import { Link, Typography, useMediaQuery, Fade } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Box } from "@mui/system"
import InputHandler from "./InputHandler"
import ClockComp from "../ClockCom"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import { useRouter } from "next/router"
import theme from "../../../src/theme"
function ConfirmationTable({
    HeadersWidthovertimemd,
    marginTopTablemd,
    lineHeightmd,
    headingColor,
    lineHeight,
    titleFontWeight,
    data,
    title,
    slice,
    route,
    marginTopTable,
    marginTopTitle,
    marginTopTitlelg,
    marginToptitlemd,
    marginTopTablelg,
    headerWidth = " 180px",
    HeadersWidthxs,
    cellWidth = "auto",
    border,
    fieldFontColor,
    responsive,
    firstItemIncluded = false,
    Discovery,
    fullPadding,
    type,
    screenSize,
    MinScreenSize,
    lowpadding,
    highpadding,
    cellPadding,
    specialNotesDayParts,
    extraPad,
    earliestPadding,
    letterSpacing,
    alohaClr,
    capitalizeProps,
    disablebutton,
    dataloading
}) {
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = [...data]
        if (newItem) {
            tempUpdate[0].rowData[tempUpdate[0].rowData.length] = newItem
        } else {
            tempUpdate[parentIndex].rowData[selfIndex] = item
        }
    }
    const router = useRouter()
    const path = router.pathname
    const splitpath = path.split("/")

    const secondpath = splitpath[2]
    const [newItem] = useState("")
    const [isAddtionalRow] = useState(false)
    const [isAddtionalHeight] = useState("")
    const md = useMediaQuery(screenSize ? screenSize : "(width:100%)")
    const mdMin = useMediaQuery(
        MinScreenSize ? MinScreenSize : "(max-width:671px)"
    )
    return (!mdMin && !md) || responsive ? (
        <>
            {title !== "" && (
                <Box
                    className="confirmation-table-container"
                    sx={{
                        display: {
                            md: "flex",
                            xs: responsive ? "flex" : "none"
                        },
                        justifyContent: "space-between",

                        marginTop: {
                            xl: marginTopTitle,
                            lg: marginTopTitlelg
                                ? marginTopTitlelg
                                : marginTopTitle,
                            md: marginToptitlemd
                                ? marginToptitlemd
                                : marginTopTitle,
                            xs:
                                marginTopTitle == "0px"
                                    ? ""
                                    : title == "3rd Party Interfaces"
                                        ? "30px"
                                        : title == "Tax Rates"
                                            ? "15px"
                                            : "34px"
                        },
                        alignItems: "start"
                    }}
                >
                    <Box
                        display={"flex"}
                        sx={{ py: { lg: extraPad || 0.5, xs: 1 } }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight: "8px",
                                fontSize: {
                                    xs: "18px"
                                },
                                lineHeight: {
                                    xs: "28px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            {title}
                        </Typography>{" "}
                        {secondpath != "review-and-submit" && (
                            <Box
                                sx={{
                                    paddingTop: {
                                        lg: "4px",
                                        md: "4px",
                                        xs: "4px"
                                    },
                                    lineHeight: "20px"
                                }}
                            >
                                <ConfirmationTooltip
                                    ariaLabel={`This is ${title} tooltip`}
                                    text={`Details for ${title}`}
                                />
                            </Box>
                        )}
                    </Box>
                    {!disablebutton && !dataloading && <Box
                        display={"flex"}
                        sx={{
                            cursor: "pointer",

                            alignitems: "center",
                            justifyContent: "center",
                            marginY: "auto",
                            padding: "8px",
                            borderRadius: "8px",
                            "&:hover": {
                                background: "#F5F6FF",
                                color: "#062EC9"
                            }
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
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
                                paddingLeft: "8px",
                                paddingRight: "",
                                fontSize: {
                                    lg: "12px",
                                    xs: "12px"
                                },
                                lineHeight: {
                                    lg: "18px",
                                    xs: "16px"
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
                className="confirmation-table-container "
                sx={{
                    display: { md: "flex", xs: responsive ? "flex" : "none" },
                    width: "100%",

                    marginTop: {
                        xl: marginTopTable,
                        lg: marginTopTablelg
                            ? marginTopTablelg
                            : marginTopTable,

                        xs: marginTopTablemd ? marginTopTablemd : "14px"
                    },
                    borderRadius: "8px"
                }}
            >
                <TableContainer
                    aria-label={`This is ${title} table`}
                    className="Additional shadow"
                    sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px !important",
                        boxShadow: "none",
                        overflow: "revert",
                        overflowX: isAddtionalRow ? "auto" : ""
                    }}
                    component={Paper}
                >
                    <Table
                        sx={{ border: `${border ? "unset" : ""} ` }}
                        size="medium"
                        aria-label={`This is ${title} table`}
                    >
                        <TableBody>
                            {data?.map((item, index) => {
                                return (
                                    item?.rowData[0] !== "" && (
                                        <Fade
                                            key={index}
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
                                                    },
                                                    display:
                                                        isAddtionalRow ||
                                                            item.title ===
                                                            "Included Revenue Centers"
                                                            ? "flex"
                                                            : "",
                                                    justifyContent:
                                                        isAddtionalRow ||
                                                            item.title ===
                                                            "Included Revenue Centers"
                                                            ? "flex-start "
                                                            : "space-between",
                                                    width: "100%"
                                                }}
                                            >
                                                <TableCell
                                                    aria-label={`This is ${item.title} cell.`}
                                                    sx={{
                                                        borderBottom:
                                                            data?.length - 1 ===
                                                                index && border
                                                                ? "0"
                                                                : data?.length >
                                                                    1 && item.rowData[0] !== "No" || title ==
                                                                    "Aloha Essentials Features"|| title == "Ordering Process" || title == "Back Office Computer & Printer" ?
                                                                    "1px solid #fff" : item.rowData[0] == "No" && "0px",
                                                        width: {
                                                            lg: headerWidth,
                                                            md: HeadersWidthovertimemd
                                                                ? HeadersWidthovertimemd
                                                                : headerWidth,
                                                            xs: HeadersWidthxs
                                                        },
                                                        boxSizing: "border-box",
                                                        borderTopLeftRadius:
                                                            index === 0
                                                                ? "6px"
                                                                : "",
                                                        borderBottomLeftRadius:
                                                            index ===
                                                                data.length - 1
                                                                ? "8px"
                                                                : (title !==
                                                                "Aloha Essentials Features" && title !== "Ordering Process" && title !== "Back Office Computer & Printer" && item.rowData[0] == "No") && "8px",

                                                        padding: {
                                                            lg:
                                                                fullPadding &&
                                                                    index == 0
                                                                    ? "16px 16px !important"
                                                                    : index == 0
                                                                        ? "15.9px 16px"
                                                                        : fullPadding
                                                                            ? "16px 15px"
                                                                            : lowpadding
                                                                                ? "15.8px 16px"
                                                                                : item
                                                                                    .rowData
                                                                                    ?.length >
                                                                                    0
                                                                                    ? "16px 16px"
                                                                                    : "16.2px 16px",
                                                            md:
                                                                specialNotesDayParts &&
                                                                    item?.title ===
                                                                    "Special Notes"
                                                                    ? "27px 22px"
                                                                    : item?.title?.includes(
                                                                        "into the system"
                                                                    )
                                                                        ? earliestPadding
                                                                        : fullPadding &&
                                                                            index == 0
                                                                            ? "16px 16px !important"
                                                                            : index ==
                                                                                0 &&
                                                                                lowpadding
                                                                                ? "14.6px 16px"
                                                                                : index == 0
                                                                                    ? "15.5px 16px"
                                                                                    : highpadding
                                                                                        ? "15.7px 16px"
                                                                                        : lowpadding
                                                                                            ? "16.4px 16px"
                                                                                            : item
                                                                                                .rowData
                                                                                                ?.length >
                                                                                                0
                                                                                                ? "16px 16px"
                                                                                                : "16.2px 16px",
                                                            sm:
                                                                fullPadding &&
                                                                    index == 0
                                                                    ? "16px 16px !important"
                                                                    : index == 0
                                                                        ? "15.5px 16px"
                                                                        : lowpadding
                                                                            ? "14.4px 16px"
                                                                            : item
                                                                                .rowData
                                                                                ?.length >
                                                                                0
                                                                                ? "16px 16px"
                                                                                : "16.2px 16px",
                                                            xs: "17.5px 12px"
                                                        },
                                                        backgroundColor:
                                                            "#F5F5F5",
                                                        fontSize:
                                                            "14px   !important",
                                                        lineHeight: `${lineHeight
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

                                                        position:
                                                            isAddtionalRow ||
                                                                item.title ===
                                                                "Included Revenue Centers"
                                                                ? "absolute"
                                                                : "",
                                                        letterSpacing:
                                                            letterSpacing
                                                                ? letterSpacing
                                                                : "-0.008em"
                                                    }}
                                                    align="left"
                                                >
                                                    {item?.title?.includes(
                                                        "<a>"
                                                    ) ? (
                                                        <Box
                                                            sx={{
                                                                color: alohaClr
                                                            }}
                                                        >
                                                            {
                                                                item.title.split(
                                                                    "<a>"
                                                                )[0]
                                                            }
                                                            <Link
                                                                sx={{
                                                                    fontSize: {
                                                                        lg: "14px",
                                                                        xs: "14px"
                                                                    },

                                                                    color: theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                    textDecoration:
                                                                        "none"
                                                                }}
                                                                href="#"
                                                            >
                                                                {
                                                                    item.title
                                                                        .split(
                                                                            "<a>"
                                                                        )[1]
                                                                        .split(
                                                                            "</a>"
                                                                        )[0]
                                                                }
                                                            </Link>
                                                            {
                                                                item.title
                                                                    .split(
                                                                        "<a>"
                                                                    )[1]
                                                                    .split(
                                                                        "</a>"
                                                                    )[1]
                                                            }
                                                        </Box>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    Discovery
                                                                        ? "400"
                                                                        : titleFontWeight
                                                                            ? titleFontWeight
                                                                            : "600",
                                                                fontSize:
                                                                    "14px",
                                                                lineHeight: {
                                                                    lg: lineHeight
                                                                        ? lineHeight
                                                                        : title ==
                                                                            "Payroll"
                                                                            ? "20.5px"
                                                                            : "21.6px",
                                                                    md: lineHeight
                                                                        ? lineHeight
                                                                        : lineHeightmd
                                                                            ? lineHeightmd
                                                                            : title ==
                                                                                "Payroll"
                                                                                ? "22px"
                                                                                : "21.6px",
                                                                    xs: lineHeight
                                                                        ? lineHeight
                                                                        : title ==
                                                                            "Payroll"
                                                                            ? "20.5px"
                                                                            : "21.6px"
                                                                },
                                                                color: "#5C5C5C",
                                                                mt:
                                                                    item.title ===
                                                                    "Included Day Parts" &&
                                                                    "1px"
                                                            }}
                                                        >
                                                            {" "}
                                                            {item.title}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                {!slice &&
                                                    item.rowData?.map(
                                                        (rowItem, j) => {
                                                            return (
                                                                rowItem !==
                                                                "" && (
                                                                    <TableCell
                                                                        aria-label={`This is ${item.title} cell.`}

                                                                        key={j}
                                                                        sx={{
                                                                            width:
                                                                                isAddtionalRow ||
                                                                                    item.title ===
                                                                                    "Included Revenue Centers"
                                                                                    ? "max-content"
                                                                                    : cellWidth,
                                                                            borderBottom:
                                                                                data?.length -
                                                                                    1 ===
                                                                                    index &&
                                                                                    border
                                                                                    ? "unset"
                                                                                    : title !==
                                                                                    "Aloha Essentials Features" && item.rowData[0] == "No" && "0px",

                                                                            fontSize:
                                                                                "14px   !important",

                                                                            padding:
                                                                                isAddtionalHeight
                                                                                    ? "5.5px"
                                                                                    : cellPadding
                                                                                        ? cellPadding
                                                                                        : "14px",
                                                                            fontWeight:
                                                                                "400",
                                                                            textTransform:
                                                                                capitalizeProps,
                                                                            color: `${fieldFontColor}`
                                                                        }}
                                                                        align="left"
                                                                    >
                                                                        {firstItemIncluded ||
                                                                            (!isNaN(
                                                                                parseInt(
                                                                                    rowItem
                                                                                )
                                                                            ) &&
                                                                                type !==
                                                                                "time") ? (
                                                                            (type ==
                                                                                "dropdown" ||
                                                                                type[
                                                                                index
                                                                                ] ===
                                                                                "dropdown") &&
                                                                                item.editable &&
                                                                                type !==
                                                                                "time" ? (
                                                                                item.title.includes(
                                                                                    "Earliest time"
                                                                                ) ? (
                                                                                    item
                                                                                        .rowData[0][0] +
                                                                                    " " +
                                                                                    item
                                                                                        .rowData[0][1]
                                                                                ) : (
                                                                                    <Typography
                                                                                        sx={{
                                                                                            fontSize:
                                                                                                "14px",
                                                                                            color: "#1E1E1E",
                                                                                            fontWeight:
                                                                                                "400"
                                                                                        }}
                                                                                    >
                                                                                        {rowItem ||
                                                                                            "N/A"}
                                                                                    </Typography>
                                                                                )
                                                                            ) : (type ==
                                                                                "inputNumber" ||
                                                                                type[
                                                                                index
                                                                                ] ===
                                                                                "inputNumber") &&
                                                                                item.editable ? (
                                                                                <InputHandler
                                                                                    title={
                                                                                        item.title
                                                                                    }
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
                                                                                        rowItem
                                                                                    }
                                                                                    j={
                                                                                        j
                                                                                    }
                                                                                    type={
                                                                                        "number"
                                                                                    }
                                                                                />
                                                                            ) : type[
                                                                                j
                                                                            ] ===
                                                                                "Disabled" ||
                                                                                !item.editable ? (
                                                                                rowItem
                                                                            ) : type ==
                                                                                "NoBorder" ||
                                                                                type[
                                                                                index
                                                                                ] ===
                                                                                "NoBorder" ? (
                                                                                <InputHandler
                                                                                    title={
                                                                                        item.title
                                                                                    }
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
                                                                                        rowItem
                                                                                    }
                                                                                    j={
                                                                                        j
                                                                                    }
                                                                                    type={
                                                                                        "NoBorder"
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <InputHandler
                                                                                    title={
                                                                                        item.title
                                                                                    }
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
                                                                                        rowItem
                                                                                    }
                                                                                    j={
                                                                                        j
                                                                                    }
                                                                                    type={
                                                                                        "text"
                                                                                    }
                                                                                />
                                                                            )
                                                                        ) : item.title ===
                                                                            "Start Time" ||
                                                                            (item.title ===
                                                                                "Start Time" &&
                                                                                type ==
                                                                                "time") ? (
                                                                            rowItem &&
                                                                            (item
                                                                                .rowData[
                                                                                j
                                                                            ][0] +
                                                                                " " +
                                                                                item
                                                                                    .rowData[
                                                                                j
                                                                                ][1]) || "N/A"
                                                                        ) : item.title ===
                                                                            "Included Revenue Centers" ? (
                                                                            <InputHandler
                                                                                title={
                                                                                    item.title
                                                                                }
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
                                                                                    rowItem
                                                                                }
                                                                                j={
                                                                                    j
                                                                                }
                                                                                type={
                                                                                    "revenue"
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            rowItem
                                                                        )}
                                                                    </TableCell>
                                                                )
                                                            )
                                                        }
                                                    )}

                                                {(item.title?.includes(
                                                    "Additional"
                                                ) ||
                                                    item.title?.includes(
                                                        "Printer"
                                                    ) ||
                                                    item.title?.includes(
                                                        "Menu Category"
                                                    )) &&
                                                    data[index]?.rowData?.length ===
                                                    0 ? (
                                                    <>
                                                        {/* If want to add additional button change Box to Button  */}
                                                        <Box
                                                            sx={{
                                                                height: "45px",
                                                                paddingTop:
                                                                    "12px",
                                                                paddingX:
                                                                    "16px",
                                                                marginY:
                                                                    isAddtionalHeight
                                                                        ? "5.5px"
                                                                        : "16px",
                                                                mx: "8px",

                                                                fontWeight: 500,
                                                                display: "flex",

                                                                fontSize: {
                                                                    lg: "14px",
                                                                    xs: "16px"
                                                                },
                                                                lineHeight: {
                                                                    lg: "22px",
                                                                    xs: "24px"
                                                                },
                                                                color: "#1E1E1E"
                                                            }}
                                                        >
                                                            N/A
                                                        </Box>
                                                    </>
                                                ) : null}

                                                {slice &&
                                                    item.rowData

                                                        .slice(
                                                            slice.start,
                                                            slice.end
                                                        )

                                                        .map((rowItem, j) => {
                                                            return (
                                                                <TableCell
                                                                    aria-label={`This is ${item.title} cell.`}

                                                                    key={j}
                                                                    sx={{
                                                                        width: cellWidth,
                                                                        borderBottom:
                                                                            data?.length -
                                                                                1 ===
                                                                                index &&
                                                                                border
                                                                                ? "unset"
                                                                                : "",
                                                                        padding:
                                                                            title ==
                                                                                "3rd Party Interfaces" &&
                                                                                index ==
                                                                                0
                                                                                ? "15.9px"
                                                                                : title ==
                                                                                    "3rd Party Interfaces"
                                                                                    ? {
                                                                                        xxl: "16.5px",
                                                                                        lg: "16.5px",
                                                                                        sm: "16.7px 16px !important"
                                                                                    }
                                                                                    : "15.6px 16px",
                                                                        fontSize:
                                                                            "14px  !important",

                                                                        lineHeight:
                                                                            "20px",
                                                                        fontWeight:
                                                                            "400",
                                                                        color: `${fieldFontColor}`
                                                                    }}
                                                                    align="left"
                                                                >
                                                                    {firstItemIncluded ||
                                                                        (!isNaN(
                                                                            parseInt(
                                                                                rowItem
                                                                            )
                                                                        ) &&
                                                                            type !==
                                                                            "time") ? (
                                                                        <Box
                                                                            sx={{
                                                                                display:
                                                                                    "flex",
                                                                                gap: "4px",
                                                                                flexWrap:
                                                                                    "wrap"
                                                                            }}
                                                                        >
                                                                            {title ===
                                                                                "3rd Party Interfaces"
                                                                                ? rowItem?.length ===
                                                                                    0
                                                                                    ? "N/A"
                                                                                    : rowItem?.map(
                                                                                        (
                                                                                            item,
                                                                                            ind
                                                                                        ) => (
                                                                                            <Box
                                                                                                key={
                                                                                                    ind
                                                                                                }
                                                                                                sx={{
                                                                                                    background:
                                                                                                        "#F5F5F5",
                                                                                                    width: "max-content",
                                                                                                    borderRadius:
                                                                                                        "24px",
                                                                                                    padding:
                                                                                                        "5px 12px"
                                                                                                }}
                                                                                            >
                                                                                                <Box>
                                                                                                    {
                                                                                                        item
                                                                                                    }
                                                                                                </Box>
                                                                                                {item.length ===
                                                                                                    0 &&
                                                                                                    "N/A"}
                                                                                            </Box>
                                                                                        )
                                                                                    )
                                                                                : rowItem?.length ===
                                                                                    0
                                                                                    ? "N/A"
                                                                                    : rowItem
                                                                                        ? rowItem.includes(
                                                                                            "-"
                                                                                        )
                                                                                            ? rowItem.replaceAll(
                                                                                                "-",
                                                                                                " "
                                                                                            )
                                                                                            : rowItem
                                                                                        : "N/A"}
                                                                        </Box>
                                                                    ) : type ==
                                                                        "dropdown" ? (
                                                                        rowItem
                                                                    ) : type ===
                                                                        "time" ? (
                                                                        item.title !=
                                                                            "Days" ? (
                                                                            <ClockComp
                                                                                ariaLabel={item.title}
                                                                                isMobile={
                                                                                    false
                                                                                }
                                                                                isCon={
                                                                                    true
                                                                                }
                                                                                name={
                                                                                    "name"
                                                                                }
                                                                                handleChange={
                                                                                    handleUpdate
                                                                                }
                                                                                value={
                                                                                    rowItem
                                                                                }
                                                                                error={
                                                                                    true
                                                                                }
                                                                                selfIndex={
                                                                                    slice.end -
                                                                                        1 ==
                                                                                        item
                                                                                            .rowData
                                                                                            .length
                                                                                        ? slice.start +
                                                                                        j
                                                                                        : j
                                                                                }
                                                                                parentIndex={
                                                                                    index
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            rowItem
                                                                        )
                                                                    ) : (
                                                                        <InputHandler
                                                                            type={
                                                                                "text"
                                                                            }
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
                                                                                rowItem
                                                                            }
                                                                            j={
                                                                                j
                                                                            }
                                                                        />
                                                                    )}
                                                                </TableCell>
                                                            )
                                                        })}
                                            </TableRow>
                                        </Fade>
                                    )
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    ) : (
        <></>
    )
}

ConfirmationTable.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    border: true,
    fieldFontColor: "#4B5563",
    responsive: false,
    slice: false,
    firstItemIncluded: false,
    type: "dropdown",
    isArray: false
}
export default ConfirmationTable
