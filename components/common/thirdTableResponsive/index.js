import React from "react"
import { Typography } from "@mui/material"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useMediaQuery } from "@mui/material"
import ClockComp from "../ClockCom"
import InputHandler from "../confirmationTable/InputHandler"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import theme from "../../../src/theme"
function ThirdTableResponsive({
    data,
    title,
    marginTopTable,
    marginTopTitle,
    type,
    firstItemIncluded,
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
                        <Box paddingTop={"5px"}>
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
                        xs: "32px"
                    }
                }}
            >
                <Box
                    padding={"16px"}
                    sx={{
                        backgroundColor: "#F3F4F6",
                        border: "1px solid #E2E8F0",
                        borderRadius: "6px"
                    }}
                    width={"100%"}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    marginBottom: "16px",
                                    fontSize: { sm: "14px" },
                                    lineHeight: "21px",
                                    color: "#5C5C5C",
                                    variant: "body1"
                                }}
                            >
                                {data[0].title}
                            </Typography>
                            <Box>
                                {data[0]["rowData"].map((item, i) => {
                                    return (
                                        <Box
                                            borderRadius={"8px"}
                                            sx={{ backgroundColor: "white" }}
                                            marginTop={"8px"}
                                            padding={"4px"}
                                            border={"1px solid #C9C9C9"}
                                            key={item + Math.random()}
                                        >
                                            {firstItemIncluded ? (
                                                type == "dropdown" ? (
                                                    <ClockComp
                                                        isMobile={true}
                                                        isCon={true}
                                                        name={"name"}
                                                        handleChange={
                                                            handleUpdate
                                                        }
                                                        error={true}
                                                        parentIndex={0}
                                                        selfIndex={i}
                                                        value={item}
                                                        title={title}
                                                    />
                                                ) : type == "text-area" ? (
                                                    <InputHandler
                                                        type="text"
                                                        rowItem={item}
                                                        textArea={type}
                                                        fieldFontColor={
                                                            "#000000"
                                                        }
                                                        handleUpdate={
                                                            handleUpdate
                                                        }
                                                        j={i}
                                                        parentIndex={0}
                                                    />
                                                ) : (
                                                    <InputHandler
                                                        type="text"
                                                        rowItem={item}
                                                        textArea={type}
                                                        fieldFontColor={
                                                            "#000000"
                                                        }
                                                        handleUpdate={
                                                            handleUpdate
                                                        }
                                                        j={i}
                                                        parentIndex={0}
                                                    />
                                                )
                                            ) : (
                                                <Box
                                                    className="input-field"
                                                    paddingY={"9.5px"}
                                                >
                                                    {item}
                                                </Box>
                                            )}
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                sx={{
                                    fontWeight: "400",

                                    marginBottom: { sm: "16px", xs: "38px" },

                                    fontSize: { sm: "14px" },
                                    lineHeight: "21px",
                                    color: "#5C5C5C",
                                    variant: "body1"
                                }}
                            >
                                {data[1].title}
                            </Typography>
                            <Box>
                                {data[1]["rowData"].map((item, i) => {
                                    return (
                                        <Box
                                            borderRadius={"8px"}
                                            sx={{ backgroundColor: "white" }}
                                            marginTop={"8px"}
                                            padding={"4px"}
                                            border={"1px solid #C9C9C9"}
                                            key={item + Math.random()}
                                        >
                                            {type == "dropdown" ? (
                                                <ClockComp
                                                    isMobile={true}
                                                    isCon={true}
                                                    name={"name"}
                                                    handleChange={handleUpdate}
                                                    error={true}
                                                    parentIndex={1}
                                                    selfIndex={i}
                                                    value={item}
                                                />
                                            ) : type == "text-area" ? (
                                                <textarea
                                                    value={item}
                                                    onChange={(e) => { }}
                                                    className="f-f-i text-area-confirmation"
                                                    rows={3}
                                                    key={i}
                                                    placeholder="Please provide any special notes..."
                                                    aria-describedby="Please indicate any special notes about"
                                                />
                                            ) : (
                                                <input
                                                    className="input-field"
                                                    type={"text"}
                                                    value={item}
                                                    key={i}
                                                />
                                            )}
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    ) : (
        <></>
    )
}
ThirdTableResponsive.defaultProps = {
    titleFontWeight: null,
    lineHeight: null,
    headingColor: null,
    type: "input",
    firstItemIncluded: false
}
export default ThirdTableResponsive
