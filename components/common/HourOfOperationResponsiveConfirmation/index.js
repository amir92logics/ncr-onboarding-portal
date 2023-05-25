import React from "react"
import { Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMediaQuery } from "@mui/material"
import theme from "../../../src/theme"
import { useRouter } from "next/router"
function HourOfOperationResponsiveConfirmation({
    data,
    title,
    marginTopTitle,
    type,
    index,
    route,
    disableButton,
    dataloading
}) {
    const md = useMediaQuery("(max-width:671px)")
    const router = useRouter()
    return md ? (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: {
                            xs: "flex"
                        },
                        justifyContent: "space-between",
                        marginTop: marginTopTitle,
                        alignItems: "center"
                    }}
                >
                    <Box display={"flex"}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight: "8px",
                                fontSize: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "28px",
                                    xs: "28px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            {title}
                        </Typography>{" "}
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
                                    pt: 1.5,
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
                                    <title>{`This is tooltip for ${title}`}</title>
                                    <path
                                        d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                        fill="#757575"
                                    />
                                </svg>
                            </Box>
                        </Tooltip>
                    </Box>
                    {!disableButton && !dataloading && (
                        <Box
                            onClick={() => {
                                router.push({
                                    pathname: route,
                                    query: { inner: true }
                                })
                            }}
                            display={"flex"}
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
                                    <title>{`This is Edit Stage icon for ${title}`}</title>
                                    <path
                                        d="M10.0702 5.16311L9.71667 4.80956L9.36311 5.16311L1.81311 12.7131L1.66667 12.8596V13.0667V13.8333V14.3333H2.16667H2.93333H3.14044L3.28689 14.1869L10.8369 6.63689L11.1904 6.28333L10.8369 5.92978L10.0702 5.16311ZM12.4869 1.09522C12.548 1.0341 12.636 1 12.7167 1C12.8123 1 12.8898 1.03023 12.9548 1.09522L14.9048 3.04522C15.0345 3.17496 15.0345 3.38338 14.9048 3.51311L13.7333 4.68456L11.3154 2.26667L12.4869 1.09522ZM1 12.5821L9.71667 3.86544L12.1346 6.28333L3.41789 15H1V12.5821Z"
                                        fill={theme.palette.primary.main}
                                        stroke={theme.palette.primary.main}
                                    />
                                </svg>
                            </Box>
                            <Typography
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
                                        xs: "18px"
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
            {type == "earliestTime" ? (
                <Box
                    className="shadow"
                    sx={{
                        border: "1px solid #e5e7eb",

                        borderRadius: "8px",
                        mt: 4
                    }}
                >
                    <Box
                        sx={{
                            background: "#f5f5f5",
                            p: 4,
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                            fontSize: theme.fontsize.sm,
                            lineHeight: "18px",
                            fontWeight: 600,
                            color: theme.palette.secondary.main
                        }}
                    >
                        {" "}
                        {data[0].title}
                    </Box>
                    <Box
                        sx={{
                            background: "#fff",
                            p: 4,
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                            fontSize: theme.fontsize.sm,
                            lineHeight: "22px",
                            fontWeight: 400,
                            textTransform: "lowercase",
                            color: theme.palette.secondary.main
                        }}
                    >
                        {" "}
                        {data[0].rowData[0]
                            ? data[0].rowData[0][0] +
                              " " +
                              data[0].rowData[0][1]
                            : "--"}
                    </Box>
                </Box>
            ) : type == "dropdown" ? (
                <>
                    <Box
                        className="shadow"
                        sx={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            mt: 4
                        }}
                    >
                        <Box
                            sx={{
                                background: "#f5f5f5",
                                p: 4,
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                fontSize: theme.fontsize.sm,
                                lineHeight: "18px",
                                fontWeight: 600,
                                color: theme.palette.secondary.main
                            }}
                        >
                            {" "}
                            {data[0].title}
                        </Box>
                        <Box
                            sx={{
                                background: "#fff",
                                p: 4,
                                borderBottomLeftRadius: "8px",
                                borderBottomRightRadius: "8px",
                                fontSize: theme.fontsize.sm,
                                lineHeight: "22px",
                                fontWeight: 400,
                                color: theme.palette.secondary.main
                            }}
                        >
                            {data[0]["checkBoxes"]?.map((item, i) => {
                                return (
                                    <Box key={i} sx={{ mt: i != 0 && 4 }}>
                                        <Typography
                                            sx={{
                                                fontSize: theme.fontsize.sm,
                                                lineHeight: "22px",
                                                fontWeight: 400,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            {" "}
                                            {data[0]?.title ==
                                            "Additional Day Parts"
                                                ? item[0]?.Value
                                                : item?.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                border: "1px solid #e0e0e0",
                                                py: "13.5px",
                                                px: 4,
                                                borderRadius: 2,
                                                mt: 2
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: theme.fontsize.sm,
                                                    lineHeight: "22px",
                                                    fontWeight: 400,
                                                    color: "#1e1e1e"
                                                }}
                                            >
                                                {data[0]?.title ==
                                                "Additional Day Parts"
                                                    ? item[1]?.Value
                                                        ? item[1]?.Value[0] +
                                                          " " +
                                                          item[1]?.Value[1]
                                                        : "--"
                                                    : item?.value
                                                    ? item?.value[0] +
                                                      " " +
                                                      item?.value[1]
                                                    : "N/A"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </>
            ) : (
                <Box>
                    {data?.map((item, idx) => {
                        return (
                            <>
                                <Box
                                    key={idx}
                                    className="shadow"
                                    sx={{
                                        border: "1px solid #e5e7eb",

                                        borderRadius: "8px",
                                        mt: idx == 0 ? 4.8 : 4
                                    }}
                                >
                                    <Box
                                        sx={{
                                            background: "#f5f5f5",
                                            px: 4,
                                            pt: 3.4,
                                            pb: 4.3,
                                            borderTopLeftRadius: "8px",
                                            borderTopRightRadius: "8px",
                                            fontSize: theme.fontsize.sm,
                                            lineHeight: "18px",
                                            fontWeight: 600,
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        {" "}
                                        {item.day}
                                    </Box>
                                    <Box
                                        sx={{
                                            background: "#fff",
                                            px: 3.7,
                                            py: 3.6,
                                            borderBottomLeftRadius: "8px",
                                            borderBottomRightRadius: "8px",
                                            fontSize: theme.fontsize.sm,
                                            lineHeight: "22px",
                                            fontWeight: 400,
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                columnGap: 4,
                                                rowGap: 3.5,
                                                flexGrow: 1,
                                                flexWrap: "wrap",
                                                width: "100%"
                                            }}
                                        >
                                            {item.close ? (
                                                <Box>Closed</Box>
                                            ) : (
                                                <>
                                                    {" "}
                                                    {item?.alltime !== "" ? (
                                                        <>
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    width: "100%",
                                                                    border: "1px solid #e0e0e0",
                                                                    py: "13.5px",
                                                                    px: 4,
                                                                    borderRadius: 2
                                                                }}
                                                            >
                                                                <Typography>
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            columnGap: 4,
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
                                                                                color: "#1e1e1e"
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.alltime
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
                                                                            End
                                                                            of
                                                                            Day
                                                                            Time
                                                                        </Box>
                                                                    </Box>
                                                                </Typography>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {item?.time?.map(
                                                                (
                                                                    item1,
                                                                    index
                                                                ) => (
                                                                    <Box
                                                                        key={
                                                                            index
                                                                        }
                                                                        sx={{
                                                                            display:
                                                                                "flex",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                            width: "100%",
                                                                            columnGap: 2
                                                                        }}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        theme
                                                                                            .fontsize
                                                                                            .sm,
                                                                                    lineHeight:
                                                                                        "22px",
                                                                                    color: theme
                                                                                        .palette
                                                                                        .secondary
                                                                                        .main
                                                                                }}
                                                                            >
                                                                                Open
                                                                                Time
                                                                            </Typography>

                                                                            <Box
                                                                                sx={{
                                                                                    border: "1px solid #e0e0e0",
                                                                                    mt: 2,
                                                                                    py: "13.5px",
                                                                                    px: 4,
                                                                                    width: "100%",
                                                                                    fontSize:
                                                                                        theme
                                                                                            .fontsize
                                                                                            .base,
                                                                                    lineHeight:
                                                                                        "22px",
                                                                                    fontWeight: 400,
                                                                                    color: "#1e1e1e",
                                                                                    borderRadius: 2
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item1.open
                                                                                }
                                                                            </Box>
                                                                        </Box>
                                                                        <Box
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        theme
                                                                                            .fontsize
                                                                                            .sm,
                                                                                    lineHeight:
                                                                                        "22px",
                                                                                    color: theme
                                                                                        .palette
                                                                                        .secondary
                                                                                        .main,
                                                                                    px: 0.2
                                                                                }}
                                                                            >
                                                                                Close
                                                                                Time
                                                                            </Typography>

                                                                            <Box
                                                                                sx={{
                                                                                    border: "1px solid #e0e0e0",
                                                                                    mt: 2,
                                                                                    py: "13.5px",
                                                                                    px: 4,
                                                                                    width: "100%",
                                                                                    fontSize:
                                                                                        theme
                                                                                            .fontsize
                                                                                            .base,
                                                                                    lineHeight:
                                                                                        "22px",
                                                                                    fontWeight: 400,
                                                                                    color: "#1e1e1e",
                                                                                    borderRadius: 2
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item1.close
                                                                                }
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )
                    })}
                </Box>
            )}
        </>
    ) : (
        <></>
    )
}
HourOfOperationResponsiveConfirmation.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    type: "dropdown"
}
export default HourOfOperationResponsiveConfirmation
