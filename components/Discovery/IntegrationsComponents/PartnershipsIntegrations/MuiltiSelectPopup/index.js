import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Divider,
    Dialog,
    DialogContent,
    Typography
} from "@mui/material"
import MultipleSelectChip from "../../../../common/MultipleSelectChip/index.js"
import Input from "../../../../common/Input"

export default function MultiSelectePopup({
    showPopup,
    setShowPopup,
    title,
    data,
    setData,
    bgClr
}) {
    const [tempObj, setTempObj] = useState({
        name: "",
        value: "",
        list: [],
        selected: []
    })

    const handleClose = (value) => {
        setShowPopup(value)
    }
    const handleChange = (name, newValue) => {
        const tempData = { ...tempObj }
        if (tempData.name == name) {
            tempData.selected = newValue
            setTempObj(tempData)
        }
    }
    useEffect(() => {
        setTempObj(data)
    }, [data])
    return (
        <Box>
            <Dialog
                aria-label={`this is ${title} popup`}
                id="aloha-partner-popup"
                open={showPopup}
                onClose={() => {
                    handleClose(false)
                    setTempObj({})
                }}
                sx={{
                    "& div[role='dialog']": {
                        borderTopRightRadius: { md: 0, xs: "4px !important" },
                        borderTopLeftRadius: { md: 0, xs: "4px !important" },
                        borderBottomRightRadius: {
                            md: 0,
                            xs: "0px !important"
                        },
                        borderBottomLeftRadius: { md: 0, xs: "0px !important" },
                        borderRadius: { md: "4px !important" }
                    }
                }}
            >
                <DialogContent
                    sx={{
                        padding: {
                            md: " 32px",
                            xs: " 24px"
                        }
                    }}
                >
                    <form
                        aria-label={`This is ${title} form`}
                        onSubmit={(e) => {
                            e.preventDefault()
                            setShowPopup(false)
                            setData(tempObj)
                            setTempObj({})
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "100%", xs: "100%" },
                                alignItems: "flex-start",
                                marginTop: "",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    width: { md: "100%", xs: "100%" },
                                    flexDirection: "row",
                                    position: "relative"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: "left",
                                            fontFamily: "inter",
                                            fontSize: {
                                                lg: "24px",
                                                xs: "24px"
                                            },
                                            lineHeight: {
                                                lg: "32px",
                                                xs: "32px"
                                            },
                                            color: "#1E1E1E",
                                            letterSpacing: "-0.004em"
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </Box>
                                <Box
                                    onClick={() => {
                                        handleClose(false)
                                    }}
                                    display={"flex"}
                                    justifyContent="flex-end"
                                    sx={{
                                        marginBottom: { xs: "12px", md: "0px" },
                                        position: "absolute",
                                        right: 0,
                                        top: "-10px",
                                        display: { xs: "block", md: "block" },
                                        cursor: "pointer"
                                    }}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            <>
                                {" "}
                                <Divider
                                    className="divider-col"
                                    sx={{
                                        width: "100%",
                                        marginTop: "12px"
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontFamily: "inter",
                                        fontSize: {
                                            lg: "16px",
                                            xs: "16px"
                                        },
                                        lineHeight: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        color: "#1E1E1E",
                                        letterSpacing: "-0.004em",
                                        mt: { md: 4, xs: 4 }
                                    }}
                                >
                                    Please list your {title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },

                                        alignItems: { lg: "center" },
                                        justifyContent: {
                                            md: "space-between",
                                            xs: "flex-start"
                                        },
                                        marginTop: "16px",
                                        marginBottom: "15px",
                                        width: "100%"
                                    }}
                                >
                                    <Input
                                        ariaLabel={`This is ${title} input`}
                                        fullWidth={true}
                                        label={tempObj.name}
                                        sx={{ mt: "8px" }}
                                        defaultValue={tempObj.selected}
                                        value={tempObj.selected}
                                        onChange={(e) =>
                                            handleChange(
                                                tempObj.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Box>
                            </>

                            <Box
                                paddingTop={"24px"}
                                display="flex"
                                width="100%"
                                sx={{
                                    width: "100%",
                                    justifyContent: {
                                        md: "flex-end",
                                        xs: "center"
                                    },
                                    flexDirection: {
                                        lg: "row",
                                        md: "column",
                                        sm: "column",
                                        xs: "column"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },
                                        justifyContent: {
                                            md: "flex-end",
                                            xs: "center"
                                        }
                                    }}
                                    display="flex"
                                >
                                    <>
                                        <Button
                                            type="submit"
                                            disabled={
                                                tempObj?.selected?.length == 0
                                            }
                                            className="next-button"
                                            role="button"
                                            aria-label="This is confirm button"
                                            variant="contained"
                                            sx={{
                                                padding: "12px 20px",
                                                fontWeight: 600,
                                                display: "flex",
                                                justifyContent: "center",
                                                fontSize: {
                                                    md: "16px",
                                                    xs: "14px"
                                                },
                                                lineHeight: {
                                                    md: "24px",
                                                    xs: "18px"
                                                },
                                                color: "white"
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
