import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography
} from "@mui/material"

import moment from "moment"

import theme from "../../../src/theme"
import { useRouter } from "next/router"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"

export default function CompsMobile({
    marginTop,
    tableData,
    pagination,
    updateDom,
    handleDelete,
    loading,
    handleUploadRequired,
    disableSubmit,
    type,
    data,
    setAdditional,
    title,
    marginTopTitle,
    route,
    disablebutton,
    dataloading
}) {
    const router = useRouter()
    const routerID = router.query.id
    const path = router.asPath
    const splitpath = path.split("/")

    return (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        justifyContent: "space-between",
                        marginTop: marginTopTitle,
                        marginBottom: "18px",
                        alignItems: "center"
                    }}
                >
                    <Box display={"flex"}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight:
                                    title == "Tax Rates" ? "8px" : "16px",
                                fontSize: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "27px",
                                    xs: "18px"
                                },
                                color: "#000000DE"
                            }}
                        >
                            {title}
                        </Typography>{" "}
                        <Box
                            sx={{
                                paddingTop: {
                                    lg: "0px",
                                    md: "0px",
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
                            paddingBottom: title == "Tax Rates" ? "6px" : "0px",

                            cursor: "pointer",

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
                        >
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                                                                                            <title>{`This is  Edit Stage icon for ${title}`}</title>
                                <path
                                    d="M10.0702 5.16311L9.71667 4.80956L9.36311 5.16311L1.81311 12.7131L1.66667 12.8596V13.0667V13.8333V14.3333H2.16667H2.93333H3.14044L3.28689 14.1869L10.8369 6.63689L11.1904 6.28333L10.8369 5.92978L10.0702 5.16311ZM12.4869 1.09522C12.548 1.0341 12.636 1 12.7167 1C12.8123 1 12.8898 1.03023 12.9548 1.09522L14.9048 3.04522C15.0345 3.17496 15.0345 3.38338 14.9048 3.51311L13.7333 4.68456L11.3154 2.26667L12.4869 1.09522ZM1 12.5821L9.71667 3.86544L12.1346 6.28333L3.41789 15H1V12.5821Z"
                                    fill={theme.palette.primary.main}
                                    stroke={theme.palette.primary.main}
                                />
                            </svg>
                        </Box>
                        <Typography
                            onClick={() => {
                                router.push(route)
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
                    width: "100%",
                    display: { md: "none" },
                    marginTop: marginTop
                        ? {
                            lg: "24px",
                            xs: "32px"
                        }
                        : ""
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection={"column"}
                >
                    {data?.map((item, index) => (
                        <Fade
                            key={index}
                            in={true}
                            {...(true ? { timeout: 1000 } : {})}
                        >
                            <Box
                                width="100%"
                                className="shadow"
                                sx={{
                                    display: "flex",
                                    borderRadius: "8px",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    marginTop: index !== 0 ? "14px" : 0,
                                    background: "white",
                                    padding: "20px 16px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        mt: "-5px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#1E1E1E",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    paddingBottom: "8px",
                                                    lineHeight: "18px",
                                                    ml:
                                                        type ==
                                                            "menu_upload_filename"
                                                            ? "-2px"
                                                            : 0,
                                                    pt:
                                                        type ==
                                                            "menu_upload_filename"
                                                            ? "1px"
                                                            : 0
                                                }}
                                            >
                                                Included Comps
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 400,
                                                    lineHeight: "22px",
                                                    color: "#5C5C5C",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {item?.includedComps}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#1E1E1E",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    paddingBottom: "8px",
                                                    lineHeight: "18px"
                                                }}
                                            >
                                                Comps Type
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 400,
                                                    lineHeight: "22px",
                                                    color: "#5C5C5C"
                                                }}
                                            >
                                                {item?.includedComps}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            flexDirection: "row",
                                            display: " flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%"
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#1E1E1E",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    paddingTop: "16px",
                                                    paddingBottom: "4px",
                                                    lineHeight: "18px"
                                                }}
                                            >
                                                Amount Deducted
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 400,
                                                    lineHeight: "22px",
                                                    color: "#5C5C5C"
                                                }}
                                            >
                                                {item?.compsType.includes(
                                                    "Prompt"
                                                ) ? (
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
                                                            color: "#000000DE"
                                                        }}
                                                    >
                                                        {item?.amountDeducted}
                                                    </Typography>
                                                ) : (
                                                    <Box
                                                        component={"span"}
                                                        style={{
                                                            color: `#000000DE`
                                                        }}
                                                    >
                                                        {item?.amountDeducted.includes(
                                                            "%"
                                                        )
                                                            ? item?.amountDeducted
                                                            : item?.amountDeducted +
                                                            "%"}
                                                    </Box>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    ))}
                </Box>
            </Box>
        </>
    )
}
