import React from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import { useRouter } from "next/router"
import theme from "../../../src/theme"

function ConfirmationIncludedItemTable({
    data,
    title,
    route,
    type,
    marginTopTable,
    marginTopTablemd,
    marginTopTitle,
    marginTopTitlemd,
    marginTopTitlexs,
    cellWidth,
    boxWidth,
    titleFont,
    itemFont,
    PadingY,
    padLeft,
    mdMargin,
    disableButton,
    dataloading
}) {
    const router = useRouter()
    return (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "space-between",
                        marginTop: {
                            xs: marginTopTitlexs,
                            md: mdMargin?.mt || marginTopTitlemd,
                            lg: marginTopTitle
                        },
                        alignItems: "center"
                    }}
                >
                    <Box
                        display={"flex"}
                        sx={{
                            mt: {
                                lg: ".3px"
                            },
                            mb: {
                                lg: ".6px",
                                md: mdMargin?.mb
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight: "8px",
                                fontSize: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "27px",
                                    xs: "27px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            {title}
                        </Typography>{" "}
                        {title != "" && (
                            <Box
                                sx={{
                                    paddingTop: {
                                        lg: "4px",
                                        md: "4px",
                                        xs: "4px "
                                    }
                                }}
                            >
                                <ConfirmationTooltip
                                    ariaLabel={`This is ${title} tooltip`}
                                    text={`Details for ${title}`}
                                />
                            </Box>
                        )}
                    </Box>
                    {!disableButton && !dataloading && <Box
                        display={"flex"}
                        sx={{
                            cursor: "pointer",
                            alignitems: "center",
                            justifyContent: "center",
                            padding: "8px",

                            borderRadius: "8px",
                            "&:hover": {
                                background: theme.chips.background.progress
                            }
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
                                fontWeight: "600",
                                paddingLeft: "9px",
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
                className="shadow"
                sx={{
                    display: { xs: "none", md: "block" },
                    border: "1px solid #e5e7eb",
                    width: "100%",
                    marginTop: marginTopTable,
                    borderRadius: "8px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "#F5F5F5",
                        borderRadius: "8px",
                        alignItems: "center"
                    }}
                    aria-label="a dense table"
                >
                    <Box
                        sx={{
                            backgroundColor: "#F5F5F5",
                            mx: "16px",
                            width: cellWidth
                        }}
                    >
                        {type === "Additional" ? (
                            <Typography
                                sx={{
                                    backgroundColor: "#F5F5F5",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    paddingLeft: padLeft || "6px",
                                    py: {
                                        lg: PadingY
                                    },
                                    color: "#5C5C5C"
                                }}
                            >
                                {" "}
                                {data[0]?.title}
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    backgroundColor: "#F5F5F5",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    paddingLeft: "6px",
                                    color: "#5C5C5C"
                                }}
                            >
                                {" "}
                                {data?.title}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            backgroundColor: "#fff",
                            width: "100%",
                            borderBottomRightRadius: "8px",
                            borderTopRightRadius: "8px",
                            paddingRight: {
                                lg:
                                    data?.title === "Included Jobcodes" &&
                                    "52px"
                            }
                        }}
                    >
                        {type === "Additional" ? (
                            data[0].rowData?.length === 0 ? (
                                <Box
                                    sx={{
                                        fontSize: "14px",
                                        color: "#1e1e1e",
                                        width: "100%",
                                        py: "28px",
                                        px: "24px"
                                    }}
                                >
                                    N/A
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex"
                                    }}
                                >
                                    {data?.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                fontSize: {
                                                    lg: "12px",
                                                    xs: "16px"
                                                },
                                                fontWeight: 500,
                                                lineHeight: {
                                                    lg: "12px",
                                                    xs: "24px"
                                                },
                                                paddingY: "16px",
                                                paddingLeft: "25px",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "6px"
                                            }}
                                        >
                                            {item?.rowData?.map(
                                                (rowItem, j) => {
                                                    return (
                                                        <React.Fragment key={j}>
                                                            {rowItem ===
                                                                "N/A" ? (
                                                                <Box
                                                                    sx={{
                                                                        color: "#1E1E1E",
                                                                        fontWeight: 400,
                                                                        fontSize:
                                                                        {
                                                                            lg: "14px",
                                                                            xs: "14px"
                                                                        },
                                                                        lineHeight:
                                                                        {
                                                                            lg: "21px",
                                                                            xs: "22px"
                                                                        },
                                                                        marginTop:
                                                                            index >
                                                                                0
                                                                                ? {
                                                                                    xs: "8px",
                                                                                    sm: "8px",
                                                                                    md: "0px"
                                                                                }
                                                                                : "0px",
                                                                        paddingY:
                                                                            "12px"
                                                                    }}
                                                                >
                                                                    N/A
                                                                </Box>
                                                            ) : (
                                                                <Box
                                                                    key={j}
                                                                    sx={{
                                                                        padding:
                                                                            "12px 24.3px",

                                                                        fontSize:
                                                                        {
                                                                            lg: "14px",
                                                                            xs: "14px"
                                                                        },
                                                                        lineHeight:
                                                                        {
                                                                            lg: "22px",
                                                                            xs: "22px"
                                                                        },
                                                                        textAlign:
                                                                            "center",
                                                                        color: "#5C5C5C",
                                                                        backgroundColor:
                                                                            "white",
                                                                        borderRadius:
                                                                            "8px",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                        display:
                                                                            "flex",
                                                                        border: "1px solid #E0E0E0",

                                                                        "&:hover":
                                                                        {
                                                                            boxShadow:
                                                                                "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                                                        }
                                                                    }}
                                                                >
                                                                    {rowItem}
                                                                </Box>
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            )
                        ) : (
                            <Box sx={{ width: "100%", display: "flex" }}>
                                {data.rowData?.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            fontSize: {
                                                lg: "12px",
                                                xs: "16px"
                                            },
                                            fontWeight: 500,
                                            lineHeight: {
                                                lg: "12px",
                                                xs: "24px"
                                            },

                                            paddingLeft: "24px",

                                            paddingRight: {
                                                xl:
                                                    data?.title ===
                                                        "Included Day Parts"
                                                        ? "139px"
                                                        : ""
                                            },
                                            paddingTop: "8px",

                                            paddingBottom: "16px",
                                            display: "flex",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        {item.map((rowItem, j) => {
                                            return (
                                                <Box
                                                    key={j}
                                                    sx={{
                                                        fontWeight: 400,
                                                        marginTop:
                                                            index > 0
                                                                ? {
                                                                    xs: "8px",
                                                                    sm: "8px",
                                                                    md: "16px"
                                                                }
                                                                : "8px",
                                                        padding: boxWidth,
                                                        mr: "8px",
                                                        fontSize: {
                                                            lg: "14px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            lg:
                                                                title ===
                                                                    "Job Codes"
                                                                    ? "20px"
                                                                    : "21px",
                                                            xs: "22px"
                                                        },
                                                        textAlign: "center",
                                                        color: "#5C5C5C",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "8px",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        display: "flex",
                                                        border: "1px solid #E0E0E0",

                                                        "&:hover": {
                                                            boxShadow:
                                                                "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                                        }
                                                    }}
                                                >
                                                    {rowItem}
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

ConfirmationIncludedItemTable.defaultProps = {
    itemFont: "#4B5563",
    titleFont: "600"
}
export default ConfirmationIncludedItemTable
