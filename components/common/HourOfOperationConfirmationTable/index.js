import React from "react"
import { TableHead, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Box } from "@mui/system"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import { useRouter } from "next/router"
import theme from "../../../src/theme"
function HourOfOperationConfirmationTable({
    data,
    title,
    route,
    marginTopTitle,
    marginTopTitlelg,
    marginToptitlemd,
    extraPad,
    comps,
    disableButton,
    dataloading
}) {
    const router = useRouter()
    const path = router.pathname
    const splitpath = path.split("/")
    const secondpath = splitpath[2]
    return (
        <>
            {title !== "" && (
                <Box
                    className="confirmation-table-container"
                    sx={{
                        display: {
                            md: "flex",
                            xs: "none"
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
                                    text={`Details for ${title}`}
                                />
                            </Box>
                        )}
                    </Box>
                    {!disableButton && !dataloading && (
                        <Box
                            display={"flex"}
                            sx={{
                                cursor: "pointer",

                                alignitems: "center",
                                justifyContent: "center",
                                marginY: "auto",
                                padding: "8px",
                                borderRadius: "8px",
                                "&:hover": {
                                    background: "#F5F6FF"
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
                                    <title>{`This is tooltip icon for ${title}`}</title>
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
                        </Box>
                    )}
                </Box>
            )}
            <TableContainer
                className="Additional shadow"
                component={Paper}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px !important",
                    boxShadow: "none",
                    overflow: "revert",
                    mt: { lg: 4, md: 3.5 },
                    display: { md: "table", xs: "none" }
                }}
            >
                <Table sx={{ borderRadius: "8px !important" }}>
                    <TableHead
                        sx={{
                            background: "#f5f5f5",
                            borderBottom: "none !important",
                            borderTopLeftRadius: "8px"
                        }}
                    >
                        <TableCell
                            sx={{
                                width: comps ? "auto" : "358px",
                                borderBottom: "none",
                                fontSize: comps ? "14px" : theme.fontsize.sm,
                                lineHeight: "22px",
                                fontWeight: "600",
                                color: "#5c5c5c",
                                borderTopLeftRadius: "8px",

                                py: {
                                    xl: comps ? "15px !important" : "16px",
                                    xs: comps ? "13px !important" : "16px"
                                }
                            }}
                        >
                            {comps ? "Included Comps" : "Day"}
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: "none",
                                borderTopRightRadius: !comps && "8px",
                                fontSize: comps ? "14px" : theme.fontsize.sm,
                                lineHeight: "22px",
                                fontWeight: "600",
                                color: "#5c5c5c",
                                px: "14.5px",
                                py: {
                                    xl: comps ? "15px !important" : "16px",
                                    xs: comps ? "13px !important" : "16px"
                                }
                            }}
                        >
                            {comps ? "Comps Type" : "Timings"}
                        </TableCell>
                        {comps && (
                            <TableCell
                                sx={{
                                    borderBottom: "none",
                                    borderTopRightRadius: "8px",
                                    fontSize: comps
                                        ? "14px"
                                        : theme.fontsize.sm,
                                    lineHeight: "22px",
                                    fontWeight: "600",
                                    color: "#5c5c5c",
                                    px: "14.5px",
                                    py: {
                                        xl: comps ? "15px !important" : "16px",
                                        xs: comps ? "13px !important" : "16px"
                                    }
                                }}
                            >
                                {comps ? "Amount Deducted" : "Timings"}
                            </TableCell>
                        )}
                    </TableHead>
                    <TableBody>
                        {comps ? (
                            <>
                                {data?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            sx={{
                                                borderBottom:
                                                    index === data?.length - 1
                                                        ? "none"
                                                        : "1px solid #EBEBEB",
                                                fontSize: theme.fontsize.sm,
                                                lineHeight: "22px",
                                                color: "#1e1e1e",
                                                py: "15.5px"
                                            }}
                                        >
                                            {item?.includedComps}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom:
                                                    index === data?.length - 1
                                                        ? "none"
                                                        : "1px solid #EBEBEB",
                                                py: "15.5px",
                                                px: "14.5px",
                                                color: "#1e1e1e"
                                            }}
                                        >
                                            {item?.compsType}
                                        </TableCell>
                                        {item?.compsType.includes("Prompt") ? (
                                            <TableCell
                                                sx={{
                                                    py: "15.5px",
                                                    borderBottom:
                                                        index ===
                                                        data?.length - 1
                                                            ? "none"
                                                            : "1px solid #EBEBEB"
                                                }}
                                            >
                                                {" "}
                                                <Typography
                                                    sx={{
                                                        fontWeight: 400,
                                                        fontFamily: "inter",
                                                        fontSize: {
                                                            lg: "14px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            md: "14px",
                                                            xs: "18px"
                                                        },
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    {item?.amountDeducted}
                                                </Typography>
                                            </TableCell>
                                        ) : (
                                            <TableCell
                                                sx={{
                                                    py: "15.5px",
                                                    borderBottom:
                                                        index ===
                                                        data?.length - 1
                                                            ? "none"
                                                            : "1px solid #EBEBEB"
                                                }}
                                            >
                                                <Box
                                                    component={"span"}
                                                    style={{
                                                        color: `#1e1e1e`
                                                    }}
                                                >
                                                    {item?.amountDeducted
                                                        ? item?.amountDeducted +
                                                          "%"
                                                        : "-"}
                                                </Box>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <>
                                {data?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            sx={{
                                                borderBottom:
                                                    index === data?.length - 1
                                                        ? "none"
                                                        : "1px solid #EBEBEB",
                                                fontSize: theme.fontsize.sm,
                                                lineHeight: "22px",
                                                color: "#1e1e1e",
                                                py: "15.5px",
                                                verticalAlign: "top"
                                            }}
                                        >
                                            {item.day}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom:
                                                    index === data?.length - 1
                                                        ? "none"
                                                        : "1px solid #EBEBEB",
                                                py: "15.5px",
                                                px: "14.5px"
                                            }}
                                        >
                                            {item.close ? (
                                                <Box>Closed</Box>
                                            ) : (
                                                <>
                                                    {item?.alltime !== "" ? (
                                                        <>
                                                            <Box key={index}>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        columnGap: 4,
                                                                        alignItems:
                                                                            "center",
                                                                        mt:
                                                                            index !=
                                                                                0 &&
                                                                            3
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                theme
                                                                                    .fontsize
                                                                                    .sm,
                                                                            lineHeight:
                                                                                "19px",
                                                                            color: "#1e1e1e",
                                                                           
                                                                        }}
                                                                    >
                                                                        {
                                                                            item?.alltime
                                                                        }
                                                                    </Typography>
                                                                    <Box
                                                                        sx={{
                                                                            color: theme
                                                                                .palette
                                                                                .secondary
                                                                                .main,
                                                                            fontSize:
                                                                                "12px",
                                                                            lineHeight:
                                                                                "18px",
                                                                            fontWeight: 400,
                                                                            textTransform:
                                                                                "capitalize",
                                                                            py: "3px",
                                                                            px: 2,
                                                                            backgroundColor:
                                                                                "#f5f5f5",
                                                                            borderRadius: 6,
                                                                            width: "max-content"
                                                                        }}
                                                                    >
                                                                        End of
                                                                        Day Time
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {" "}
                                                            {item?.time?.map(
                                                                (
                                                                    item1,
                                                                    idx
                                                                ) => (
                                                                    <>
                                                                        <Typography
                                                                            key={
                                                                                idx
                                                                            }
                                                                            sx={{
                                                                                fontSize:
                                                                                    theme
                                                                                        .fontsize
                                                                                        .sm,
                                                                                lineHeight:
                                                                                    "22px",
                                                                                color: "#1e1e1e",
                                                                               
                                                                                mt:
                                                                                    idx !=
                                                                                        0 &&
                                                                                    3
                                                                            }}
                                                                        >
                                                                            {item1.open +
                                                                                " to " +
                                                                                item1.close}{" "}
                                                                        </Typography>
                                                                    </>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

HourOfOperationConfirmationTable.defaultProps = {
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
export default HourOfOperationConfirmationTable
