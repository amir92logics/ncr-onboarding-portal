import React from "react"
import { Typography } from "@mui/material"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { getFullDay } from "../../../helper"
import { useMediaQuery } from "@mui/material"
import ClockComp from "../ClockCom"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import theme from "../../../src/theme"
function TableResponsive({
    data,
    title,
    marginTopTable,
    marginTopTitle,
    type,
    setData
}) {
    const md = useMediaQuery("(max-width:671px)")
    const handleUpdate = (item, selfIndex, parentIndex) => {
        const tempUpdate = [...data]
        tempUpdate[parentIndex].rowData[selfIndex] = item

        setData && setData(tempUpdate)
    }
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
                                paddingRight: "16px",
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
                        <Box sx={{ paddingTop: "5px" }}>
                            <ConfirmationTooltip
                                text={`Details for ${title}`}
                            />
                        </Box>
                    </Box>
                    <Box
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
                </Box>
            )}

            <Box
                alignItems={"center"}
                gap={"16px"}
                flexDirection={"column"}
                sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: {
                        lg: marginTopTable,
                        xs: "20px"
                    }
                }}
            >
                {data[0]["rowData"].map((item, index) => {
                    return (
                        <Box
                            sx={{
                                backgroundColor: "#F3F4F6",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px"
                            }}
                            key={item}
                            width={"100%"}
                        >
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{ paddingX: "16px", paddingTop: "16px" }}
                            >
                                {getFullDay(item)}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "100%",
                                    paddingX: "16px",
                                    paddingBottom: "16px",
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px"
                                }}
                            >
                                <Grid marginTop={"16px"} container spacing={2}>
                                    <Grid item xs={6} gap={1}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={"400"}
                                            fontSize={"14px"}
                                            lineHeight={"21px"}
                                            color="#5C5C5C"
                                        >
                                            {data[1]?.title}
                                        </Typography>
                                        {data[1]?.rowData && (
                                            <Box
                                                padding={"4px"}
                                                marginTop={"8px"}
                                                borderRadius={"8px"}
                                                sx={{
                                                    backgroundColor: "white",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between"
                                                }}
                                                border={"1px solid #C9C9C9"}
                                            >
                                                {type == "dropdown" ? (
                                                    data[1]?.rowData[index]
                                                ) : type == "time" ? (
                                                    <ClockComp
                                                        isMobile={true}
                                                        isCon={true}
                                                        name={"name"}
                                                        handleChange={
                                                            handleUpdate
                                                        }
                                                        error={true}
                                                        selfIndex={index}
                                                        parentIndex={1}
                                                        value={
                                                            data[1]?.rowData[
                                                            index
                                                            ]
                                                        }
                                                    />
                                                ) : (
                                                    data[1]?.rowData[index]
                                                )}
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={"400"}
                                            fontSize={"14px"}
                                            lineHeight={"21px"}
                                            color="#5C5C5C"
                                        >
                                            {data[2]?.title}
                                        </Typography>
                                        {data[2].rowData && (
                                            <Box
                                                padding={"4px"}
                                                marginTop={"8px"}
                                                borderRadius={"8px"}
                                                sx={{
                                                    backgroundColor: "white"
                                                }}
                                                border={"1px solid #C9C9C9"}
                                            >
                                                {type == "dropdown"
                                                    ? data[2]?.rowData[index]
                                                    : type == "time" && (
                                                        <ClockComp
                                                            isMobile={true}
                                                            isCon={true}
                                                            name={"name"}
                                                            handleChange={
                                                                handleUpdate
                                                            }
                                                            error={true}
                                                            selfIndex={index}
                                                            parentIndex={2}
                                                            value={
                                                                data[2]
                                                                    ?.rowData[
                                                                index
                                                                ]
                                                            }
                                                        />
                                                    )}
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </>
    ) : (
        <></>
    )
}
TableResponsive.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    type: "dropdown"
}
export default TableResponsive
