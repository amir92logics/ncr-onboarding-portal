import React, { useEffect, useState } from "react"
import { Button, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"
import theme from "../../../src/theme"

export default function AddNewItem({
    title,
    buttonText,
    additionalArray,
    marginTop,
    setAdditonal
}) {
    const sm = useMediaQuery("(max-width:600px)")
    const xs = useMediaQuery("(max-width:0px)")
    const [arrayOfItems, setArrayOfItems] = useState([])
    const [addNew, setAddNew] = useState(false)
    const [newItem, setNewItem] = useState("")
    const [success, setSucces] = useState(false)
    useEffect(() => {
        setArrayOfItems(additionalArray)
    }, [additionalArray])
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSucces(false)
                setAddNew(false)
                setNewItem("")
            }, 1000)
        }
    }, [success])
    const handleAddNewItem = () => {
        const tempArray = arrayOfItems
        tempArray.push(newItem)
        setAdditonal && setAdditonal(tempArray)
        setArrayOfItems(tempArray)
        setSucces(true)
    }
    const handleChange = (e) => {
        setNewItem(e.target.value)
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    marginTop: marginTop,
                    justifyContent: { xs: "space-between", md: "flex-start" },
                    alignItems: "center"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        paddingRight: "16px",
                        fontSize: {
                            lg: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            xs: "24px"
                        },
                        color: "#000000DE"
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: {
                            lg: "12px",
                            xs: "12px"
                        },
                        lineHeight: {
                            lg: "18px",
                            xs: "16px"
                        },
                        color: "#5C5C5C"
                    }}
                >
                    View Examples
                    <Box
                        component={"span"}
                        sx={{ paddingLeft: "4px", marginTop: "3px" }}
                    >
                        <ConfirmationTooltip
                            text={"You can add addtional items here"}
                        />
                    </Box>
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    flexWrap: "wrap !important",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
            >
                {arrayOfItems?.map((item, index) => {
                    return (
                        <Typography
                            key={`${index + 1}`}
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "auto" },
                                textAlign: "center",
                                marginTop: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "16px"
                                },
                                fontWeight: 400,
                                padding: "12px 24px",
                                mr: "8px",
                                fontSize: {
                                    lg: "14px",
                                    xs: "14px"
                                },
                                lineHeight: {
                                    lg: "21px",
                                    xs: "16px"
                                },
                                color: "#00000099",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                border: "1px solid rgba(0, 0, 0, 0.12)"
                            }}
                        >
                            {item}
                        </Typography>
                    )
                })}
                {!addNew && (
                    <Box sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}>
                        <Button
                            onClick={() => setAddNew(true)}
                            aria-label="Clear"
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "auto" },
                                marginTop: "16px",
                                border: " 2px dashed rgba(0, 0, 0, 0.2)",
                                padding: "12px 24px",
                                fontWeight: 500,
                                display: "flex",
                                justifyContent: "center",
                                fontSize: {
                                    lg: "14px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "21px",
                                    xs: "24px"
                                },
                                color: theme.palette.primary.main
                            }}
                        >
                            {buttonText}

                            <svg
                                style={{ marginLeft: "8px" }}
                                width={16}
                                height={17}
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`This is ${buttonText} icon`}</title>
                                <path
                                    d="M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5Z"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth="1.25"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.3335 8.5H10.6668"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 11.1667L8 5.83334"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    </Box>
                )}
                {addNew && !success && (
                    <Box
                        sx={{
                            mt: "16px",
                            display: "flex",
                            flexWrap: "wrap !important",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <input
                            type="text"
                            id={`id-${"xyz"}`}
                            name={"xyz"}
                            maxLength={40}
                            style={{
                                width: xs ? "100%" : sm ? "100%" : "139px",
                                marginTop: xs ? "16px" : sm ? "16px" : "0px",
                                border: `1px solid ${theme.palette.primary.main}`,
                                boxShadow:
                                    "0px 8px 16px 3px rgba(117, 117, 117, 0.04)",
                                marginRight: " 8px",
                                borderRadius: "8px",
                                fontFamily: "Inter",
                                backgroundColor: "white",
                                padding: "12px 24px",
                                height: "45px",
                                color: "#00000099",
                                outline: "none"
                            }}
                            onChange={handleChange}
                        />
                        <Button
                            onClick={() => handleAddNewItem()}
                            aria-label="Clear"
                            disabled={newItem === "" ? true : false}
                            variant="contained"
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "auto" },
                                marginTop: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "0px"
                                },
                                textAlign: "center",
                                marginRight: " 8px",
                                padding: "12px 24px",
                                fontWeight: 500,
                                display: "flex",
                                justifyContent: "center",
                                fontSize: {
                                    lg: "14px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "21px",
                                    xs: "24px"
                                },
                                color: "white"
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => setAddNew(false)}
                            variant="outlined"
                            aria-label="Clear"
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "auto" },
                                marginTop: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "0px"
                                },
                                textAlign: "center",
                                backgroundColor: "#EFF6FF",
                                boxShadow:
                                    "0px 4px 8px 3px rgba(117, 117, 117, 0.04)",
                                borderRadius: "6px",
                                marginRight: " 8px",
                                padding: "12px 24px",
                                fontWeight: 500,
                                display: "flex",
                                justifyContent: "center",
                                fontSize: {
                                    lg: "14px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "21px",
                                    xs: "24px"
                                },
                                color: theme.palette.primary.main
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                )}

                {success && (
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            marginTop: { xs: "16px", sm: "16px", md: "16px" },
                            backgroundColor: theme.chips.background.complete,
                            boxShadow:
                                "0px 4px 8px 3px rgba(117, 117, 117, 0.04)",
                            borderRadius: "6px",

                            padding: "12px 24px",
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: {
                                lg: "14px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "21px",
                                xs: "24px"
                            },
                            color:theme.chips.text.complete
                        }}
                    >
                        <svg
                            style={{ marginRight: "8px" }}
                            width={20}
                            height={21}
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`This is Saved icon`}</title>
                            <rect
                                y="0.5"
                                width={20}
                                height={20}
                                rx={10}
                                fill={`${theme.chips.text.complete}`}
                            />
                            <path
                                d="M5 11.4986L8.07263 14.6668L15 6.3335"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Saved
                    </Box>
                )}
            </Box>
        </>
    )
}
