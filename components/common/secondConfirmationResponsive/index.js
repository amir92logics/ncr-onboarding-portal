import React, { useState, useEffect } from "react"
import { Link, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import InputHandler from "../confirmationTable/InputHandler"
import { useRouter } from "next/router"
import theme from "../../../src/theme"

function SecondConfirmation({
    data,
    title,
    route,
    marginTopTable,
    marginTopTitle,
    borderFull,
    boxPadding,
    innerboxpadding,
    innerheadingpaddingTop,
    boxinnermargin,
    type,
    fontSize,
    lineHeight,
    fontWeight,
    name = "",
    inputPadding,
    disablebutton,
    dataloading
}) {
    const md = useMediaQuery("(max-width:671px)")
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = [...data]

        if (newItem) {
            tempUpdate[0].rowData[tempUpdate[0].rowData.length] = newItem
        } else {
            tempUpdate[parentIndex].rowData[selfIndex] = item
        }

        setSucces(true)
    }
    const router = useRouter()
    const [newItem, setNewItem] = useState("")
    const [success, setSucces] = useState(false)
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSucces(false)

                setNewItem("")
            }, 1000)
        }
    }, [success])

    return md ? (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: marginTopTitle,
                        alignItems: title.includes("Back Office")
                            ? "start"
                            : "center"
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ mt: { lg: 0.3, xs: 0 } }}
                        position={"relative"}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                paddingRight: "16px",
                                fontSize: {
                                    xs: "18px"
                                },
                                lineHeight: {
                                    xs: "28px"
                                },
                                maxWidth: {
                                    xs: 240,
                                    sm: 300
                                },
                                color: theme.palette.textColor.main
                            }}
                        >
                            {title}
                            <Box
                                component={"span"}
                                sx={{
                                    lineHeight: "22px",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    ml: 2,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 2
                                }}
                            >
                                <Tooltip
                                    aria-label=""
                                    title={`Details for ${title}`}
                                    arrow={true}
                                    enterTouchDelay={0}
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
                                    <svg
                                        style={{
                                            cursor: "pointer"
                                        }}
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
                                </Tooltip>
                            </Box>
                        </Typography>
                    </Box>
                    {!disablebutton && !dataloading && (
                        <Box
                            display={"flex"}
                            sx={{
                                cursor: "pointer",
                                minWidth: { xs: "0px", md: "auto" },
                                alignitems: "center",
                                justifyContent: "center",
                                marginTop: "-2px",
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
                                    router.query.system
                                        ? router.push({
                                              pathname: route,
                                              query: { system: true }
                                          })
                                        : router.push({
                                              pathname: route,
                                              query: { inner: true }
                                          })
                                }}
                                sx={{
                                    whiteSpace: "nowrap",
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

            <Box
                alignItems={"center"}
                gap={title == "Payroll" ? "14.5px" : "14px"}
                flexDirection={"column"}
                sx={{
                    display: "flex",
                    width: "100%",

                    marginTop: {
                        lg: marginTopTable,
                        xs:
                            title == "Network Information"
                                ? "-1px"
                                : marginTopTable
                    }
                }}
            >
                <Box></Box>

                {data?.map((item, j) => {
                    return (
                        <Box
                            key={`${item.title + j}`}
                            className="shadow"
                            sx={{
                                border: "1px solid #e5e7eb",
                                padding: boxPadding,
                                backgroundColor: "#EEE",
                                borderRadius: "8px"
                            }}
                            width={"100%"}
                        >
                            <Typography
                                color="#5C5C5C"
                                variant="body1"
                                sx={{
                                    fontWeight: fontWeight ? fontWeight : "400",
                                    fontSize: fontSize ? fontSize : "14px",
                                    lineHeight: lineHeight
                                        ? lineHeight
                                        : "22px",
                                    pt: innerheadingpaddingTop
                                }}
                            >
                                {item?.title.includes("<a>") ? (
                                    <>
                                        {item.title.split("<a>")[0]}
                                        <Link
                                            aria-label={`This is ${item.title} link.`}
                                            sx={{
                                                fontSize: {
                                                    lg: "16px",
                                                    xs: "14px"
                                                },

                                                color: theme.palette.primary
                                                    .main,
                                                textDecoration: "none"
                                            }}
                                            href="#"
                                        >
                                            {
                                                item.title
                                                    .split("<a>")[1]
                                                    .split("</a>")[0]
                                            }
                                        </Link>
                                        {
                                            item.title
                                                .split("<a>")[1]
                                                .split("</a>")[1]
                                        }
                                    </>
                                ) : (
                                    item.title
                                )}
                            </Typography>

                            {item["rowData"].length === 0 && (
                                <Box
                                    marginTop="12px"
                                    border={
                                        borderFull ? "1px solid #C9C9C9" : ""
                                    }
                                    borderRadius={"8px"}
                                    sx={{
                                        backgroundColor: "white",

                                        border: "1px solid #c9c9c9",
                                        py: "10.5px",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        color: "#5C5C5C"
                                    }}
                                >
                                    N/A
                                </Box>
                            )}
                            {item["rowData"].length != 0 && (
                                <Box
                                    border={
                                        borderFull ? "1px solid #C9C9C9" : ""
                                    }
                                    borderRadius={"8px"}
                                    sx={{
                                        mt: boxinnermargin
                                            ? boxinnermargin
                                            : name === "tax-rates-comment"
                                            ? "12px"
                                            : title == "Void Reasons"
                                            ? "16px"
                                            : name == "additional void"
                                            ? "12px"
                                            : name == "petty-cash"
                                            ? "12px"
                                            : name == "petty-cash-additional"
                                            ? "12px"
                                            : "20px",
                                        backgroundColor:
                                            item.title.includes("Included") ||
                                            item.title.includes("Categories") ||
                                            item.title.includes("Additional") ||
                                            (title === "3rd Party Interfaces" &&
                                                !route.includes("integrations"))
                                                ? "#F5F5F5"
                                                : "white",

                                        border:
                                            item.title.includes("Included") ||
                                            item.title.includes("Categories") ||
                                            item.title.includes("Additional") ||
                                            (title === "3rd Party Interfaces" &&
                                                !route.includes("integrations"))
                                                ? "none"
                                                : "1px solid #c9c9c9"
                                    }}
                                >
                                    {item["rowData"]?.map((item, i) => {
                                        return type == "early-time" ? (
                                            <Box key={i} fontSize={"14px"}>
                                                <Box
                                                    sx={{
                                                        bgcolor:
                                                            "background.paper",
                                                        borderRadius: "8px",
                                                        paddingBottom:
                                                            "0px !important",
                                                        paddingY: "12px",
                                                        textAlign: "left",
                                                        color: "#000000",
                                                        fontSize: "14px",
                                                        marginLeft: "15px"
                                                    }}
                                                >
                                                    {item == ""
                                                        ? "N/A"
                                                        : moment(item).format(
                                                              "LT"
                                                          )}
                                                </Box>
                                            </Box>
                                        ) : type == "Not" ||
                                          type[i] == "Not" ? (
                                            <Box key={i} fontSize={"14px"}>
                                                <Box></Box>

                                                <Box
                                                    sx={{
                                                        bgcolor:
                                                            "background.paper",
                                                        borderRadius: "8px",
                                                        paddingBottom:
                                                            "0px !important",
                                                        border: "1px solid #E0E0E0",
                                                        paddingY:
                                                            innerboxpadding,
                                                        marginBottom:
                                                            i ===
                                                            data[0].rowData
                                                                .length -
                                                                1
                                                                ? "0px"
                                                                : "8px",
                                                        textAlign: "center",
                                                        color: "#5C5C5C",
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    {item}
                                                </Box>
                                            </Box>
                                        ) : type == "dropdown" ||
                                          type[j] == "dropdown" ? (
                                            <Box
                                                sx={{
                                                    fontSize: fontSize
                                                        ? fontSize
                                                        : "",
                                                    lineHeight: lineHeight
                                                        ? lineHeight
                                                        : "",
                                                    padding: inputPadding
                                                        ? inputPadding
                                                        : "13px 16px"
                                                }}
                                            >
                                                {" "}
                                                {item.includes("-")
                                                    ? item.replaceAll("-", " ")
                                                    : item || "N/A"}
                                            </Box>
                                        ) : type == "text-area" ||
                                          type[i] == "text-area" ? (
                                            <InputHandler
                                                type={type}
                                                rowItem={item}
                                                textArea={type}
                                                fieldFontColor={"#000000"}
                                                handleUpdate={handleUpdate}
                                                j={i}
                                                parentIndex={j}
                                            />
                                        ) : type[i] != "Disabled" ? (
                                            <InputHandler
                                                title={title}
                                                rowItem={item}
                                                rowItemdata={data}
                                                index={i}
                                                textArea={type}
                                                fieldFontColor={"#000000"}
                                                handleUpdate={handleUpdate}
                                                j={i}
                                                parentIndex={j}
                                            />
                                        ) : (
                                            <Box
                                                style={{
                                                    padding: "0",
                                                    paddingLeft: "16px",
                                                    paddingRight: "16px",
                                                    paddingTop: "8px",
                                                    paddingBottom: "8px",
                                                    fontSize: "16px",
                                                    lineHeight: "24px"
                                                }}
                                                className="input-field"
                                                sx={{
                                                    backgroundColor: "#fff",
                                                    px: 4,
                                                    py: 2
                                                }}
                                            >
                                                {item}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            )}
                        </Box>
                    )
                })}
            </Box>
        </>
    ) : (
        <></>
    )
}

SecondConfirmation.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    borderFull: false,
    type: "input",
    isArray: true,
    width: null
}
export default SecondConfirmation
