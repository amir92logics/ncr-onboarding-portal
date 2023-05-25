import React, { useEffect, useState } from "react"
import { Hidden, useMediaQuery, Box } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"

function InputHandler({
    title,
    rowItem,
    fieldFontColor,
    bgtextcolor,
    j,
    handleUpdate,
    parentIndex,
    type,
    textArea,
    rowItemdata,
    index
}) {
    const [value, setValue] = useState(null)
    const [isAddtion, setIsAddtion] = useState(false)
    const md = useMediaQuery("(max-width:671px)")

    useEffect(() => {
        const Timeout = setTimeout(() => {
            !md && value && handleUpdate(value, j, parentIndex)
        }, 400)

        return () => {
            !md && clearTimeout(Timeout)
        }
    }, [value])
    const onChange = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        setIsAddtion(
            title?.includes("Additional") ||
                title?.includes("Printer") ||
                title?.includes("Menu Category")
        )
    }, [])

    return (
        <>
            {textArea == "text-area" ? (
                <Box
                    sx={{
                        fontWeight: 400,

                        fontSize: "14px",
                        lineHeight: "21px",
                        justifyContent: "start",

                        color: `${fieldFontColor}`,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: { xs: "16px", lg: "11px 16px" }
                    }}
                >
                    {rowItem}
                </Box>
            ) : textArea == "dropdown" ? (
                <Box
                    sx={{
                        fontWeight: 400,

                        fontSize: "14px",
                        lineHeight: "21px",
                        justifyContent: "start",

                        color: `${fieldFontColor}`,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: { xs: "16px", lg: "11px 16px" }
                    }}
                >
                    {rowItem}
                </Box>
            ) : isAddtion || type === "revenue" ? (
                <>
                    {" "}
                    <Box
                        sx={{
                            fontWeight: 400,
                            display: { md: "block", xs: "none" },
                            fontSize: "14px",
                            lineHeight: "21px",
                            justifyContent: "start",
                            padding: "11px 16px",
                            textAlign: "center",
                            color: `${fieldFontColor}`,
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "1px solid rgb(224, 224, 224)",
                            "&:hover": {
                                boxShadow:
                                    "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                            }
                        }}
                    >
                        {rowItem}
                    </Box>
                    <List
                        sx={{
                            width: "100%",
                            display: { md: "none", xs: "block" },
                            paddingTop: "0px",

                            bgcolor: "background.paper",
                            borderRadius: "8px",
                            paddingBottom: "0px !important",

                            "& .css-jb4t4t-MuiTypography-root": {
                                fontSize: "16px"
                            }
                        }}
                    >
                        <ListItem
                        aria-label={rowItem}
                            sx={{
                                padding: {
                                    lg: "0px"
                                }
                            }}
                        >
                            <ListItemText aria-label={rowItem} >{rowItem}</ListItemText>
                        </ListItem>

                        <Box
                            sx={{
                                display: {
                                    lg: "none"
                                }
                            }}
                        >
                            {<Divider component="li" />}
                        </Box>
                    </List>
                </>
            ) : type === "NoBoreder" ? (
                <List
                    sx={{
                        width: "100%",
                        paddingTop: "0px",

                        bgcolor: "background.paper",
                        borderRadius: "8px",
                        paddingBottom: "0px !important",

                        "& .css-jb4t4t-MuiTypography-root": {
                            fontSize: "14px"
                        }
                    }}
                >
                    <ListItem
                        aria-label={rowItem}
                        sx={{
                            padding: {
                                lg: "0px"
                            }
                        }}
                    >
                        <ListItemText aria-label={rowItem} >{rowItem}</ListItemText>
                    </ListItem>
                </List>
            ) : textArea === "add-item" ? (
                <>
                    {title === "3rd Party Interfaces" ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: "8px",
                                width: "100%"
                            }}
                        >
                            {rowItem.length != 0 ? (
                                rowItem?.map((item, ind) => (
                                    <React.Fragment key={ind}>
                                        <Box
                                            key={ind}
                                            sx={{
                                                bgcolor: "background.paper",
                                                borderRadius: "8px",
                                                paddingBottom: "0px !important",
                                                border: "1px solid #E0E0E0",
                                                paddingY: "10.5px",
                                                textAlign: "center",
                                                color: "#5C5C5C",
                                                fontSize: "14px",
                                                width: "100%"
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    </React.Fragment>
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        borderRadius: "8px",
                                        paddingBottom: "0px !important",
                                        border: "1px solid #E0E0E0",
                                        paddingY: "12px",
                                        textAlign: "center",
                                        color: "#5C5C5C",
                                        fontSize: "14px",
                                        width: "100%"
                                    }}
                                >
                                    N/A
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                borderRadius: "8px",
                                paddingBottom: "0px !important",
                                border: "1px solid #E0E0E0",
                                paddingY: "11.5px",
                                marginBottom:
                                    index === rowItemdata[0].rowData.length - 1
                                        ? "0px"
                                        : "8px",
                                textAlign: "center",
                                color: "#5C5C5C",
                                fontSize: "14px"
                            }}
                        >
                            {rowItem}
                        </Box>
                    )}
                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        fontColor: bgtextcolor && bgtextcolor
                    }}
                >
                    {rowItem}
                </Box>
            )}
        </>
    )
}
InputHandler.defaultProps = {
    textArea: false
}
export default InputHandler
