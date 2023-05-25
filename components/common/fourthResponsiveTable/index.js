import React from "react"
import { Tooltip, Typography } from "@mui/material"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useMediaQuery } from "@mui/material"
import InputHandler from "../confirmationTable/InputHandler"
import theme from "../../../src/theme"
import { useRouter } from "next/router"

function FourthTableResponsive({
    data,
    title,
    marginTopTable,
    marginTopTitle,
    type,
    setData,
    firstItemIncluded,
    disablebutton,
    dataloading,
    route
}) {
    const router = useRouter()
    const path = router.pathname
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = [...data]
        tempUpdate[parentIndex].rowData[selfIndex] = item
        setData && setData(tempUpdate)
    }
    const md = useMediaQuery("(max-width:671px)")
    return md ? (
        <>
            {title !== "" && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: marginTopTitle,
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
                                    lg: "4px",
                                    md: "0px",
                                    xs: "0px"
                                }
                            }}
                        >
                            <Tooltip
                                aria-label={""}
                                placement="bottom"
                                arrow={true}
                                title={`Details for ${title}`}
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
                            padding: "8px !important",
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
                className="shadow"
                alignItems={"center"}
                gap={"16px"}
                flexDirection={"column"}
                sx={{
                    border: "1px solid #e5e7eb",

                    display: "flex",
                    width: "100%",
                    marginTop: marginTopTable,
                    backgroundColor: "#F5F5F5",
                    borderRadius: "6px",
                    padding: title !== "Printer Routing" && "16px"
                }}
            >
                <Grid container width="100%">
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={"600"}
                            fontSize={"14px"}
                            lineHeight={"18px"}
                            color="#5C5C5C"
                            sx={{
                                paddingTop:
                                    title === "Printer Routing" && "16px",
                                paddingLeft:
                                    title === "Printer Routing" && "16px",
                                paddingRight:
                                    title === "Printer Routing" && "12px"
                            }}
                        >
                            {data[0]?.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={"600"}
                            fontSize={"14px"}
                            lineHeight={"18px"}
                            color="#5C5C5C"
                            sx={{
                                paddingTop:
                                    title === "Printer Routing" && "16px",
                                paddingLeft:
                                    title === "Printer Routing" && "16px",
                                paddingRight:
                                    title === "Printer Routing" && "12px"
                            }}
                        >
                            {data[1]?.title}
                        </Typography>
                    </Grid>
                </Grid>

                {title === "Printer Routing" ? (
                    <Box
                        sx={{
                            backgroundColor: "white",
                            width: "100%",
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px"
                        }}
                    >
                        {data[0]["rowData"].map((item, index) => {
                            return (
                                <Box sx={{}} key={item} width={"100%"}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    borderBottom:
                                                        data[0]["rowData"]
                                                            .length -
                                                            1 ==
                                                            index
                                                            ? ""
                                                            : "1px solid #E0E0E0"
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"400"}
                                                    fontSize={"14px"}
                                                    lineHeight={"21px"}
                                                    color="#1E1E1E"
                                                >
                                                    {type == "inputText" &&
                                                        firstItemIncluded ? (
                                                        <InputHandler
                                                            fieldFontColor="#1E1E1E"
                                                            handleUpdate={
                                                                handleUpdate
                                                            }
                                                            j={index}
                                                            parentIndex={0}
                                                            rowItem={
                                                                data[0]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                            type={""}
                                                        />
                                                    ) : (
                                                        <Box
                                                            padding={
                                                                "16px 16px"
                                                            }
                                                        >
                                                            {
                                                                data[0]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    borderBottom:
                                                        data[0]["rowData"]
                                                            .length -
                                                            1 ==
                                                            index
                                                            ? ""
                                                            : "1px solid #E0E0E0"
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"400"}
                                                    fontSize={"14px"}
                                                    lineHeight={"21px"}
                                                    color="#1E1E1E"
                                                >
                                                    {type == "inputText" ? (
                                                        <InputHandler
                                                            fieldFontColor="#1E1E1E"
                                                            handleUpdate={
                                                                handleUpdate
                                                            }
                                                            j={index}
                                                            parentIndex={1}
                                                            rowItem={
                                                                data[1]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                            type={""}
                                                        />
                                                    ) : (
                                                        <Box
                                                            padding={
                                                                "16px 16px"
                                                            }
                                                        >
                                                            {
                                                                data[1]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        })}
                    </Box>
                ) : (
                    <>
                        {data[0]["rowData"].map((item, index) => {
                            return (
                                <Box sx={{}} key={item} width={"100%"}>
                                    <Grid container rowSpacing={1}>
                                        <Grid item xs={6}>
                                            <Box
                                                marginRight={"16px"}
                                                borderRadius={"8px"}
                                                sx={{
                                                    backgroundColor: "white"
                                                }}
                                                border={"1px solid #C9C9C9"}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"400"}
                                                    fontSize={"14px"}
                                                    lineHeight={"20px"}
                                                    color="#1E1E1E"
                                                >
                                                    {type == "inputText" &&
                                                        firstItemIncluded ? (
                                                        <InputHandler
                                                            fieldFontColor="#1E1E1E"
                                                            handleUpdate={
                                                                handleUpdate
                                                            }
                                                            j={index}
                                                            parentIndex={0}
                                                            rowItem={
                                                                data[0]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                            type={""}
                                                        />
                                                    ) : (
                                                        <Box
                                                            padding={
                                                                "16px 16px"
                                                            }
                                                        >
                                                            {
                                                                data[0]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box
                                                borderRadius={"8px"}
                                                sx={{
                                                    backgroundColor: "white"
                                                }}
                                                border={"1px solid #C9C9C9"}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"400"}
                                                    fontSize={"14px"}
                                                    lineHeight={"21px"}
                                                    color="#1E1E1E"
                                                >
                                                    {type == "inputText" ? (
                                                        <InputHandler
                                                            fieldFontColor="#1E1E1E"
                                                            handleUpdate={
                                                                handleUpdate
                                                            }
                                                            j={index}
                                                            parentIndex={1}
                                                            rowItem={
                                                                data[1]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                            type={""}
                                                        />
                                                    ) : (
                                                        <Box
                                                            padding={
                                                                "14px 16px"
                                                            }
                                                        >
                                                            {
                                                                data[1]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        })}{" "}
                    </>
                )}
            </Box>
        </>
    ) : (
        <></>
    )
}
FourthTableResponsive.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    type: "inputText",
    firstItemIncluded: false
}
export default FourthTableResponsive
