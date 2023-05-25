import React, { useState } from "react"
import ClockComp from "../ClockCom"
import { useMediaQuery } from "@mui/material"
import { get24Hours } from "../../../helper/Constraints"
import Box from "@mui/material/Box"
import Input from "../../common/Input"
import {
    Button,
    Dialog,
    DialogContent,
    TextField,
    Typography
} from "@mui/material"

export default function ManagedNetworkNSSPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    modalInfo,
    Title,
    onChange
}) {
    const [show, setShow] = React.useState("")
    const md = useMediaQuery("(max-width:671px)")
    const [value, setValue] = ""
    const handleClose = (value) => {
        handleTogglePopUp(value)
    }

    const handleChange = (e, name) => {
        if (name) {
            if (name == "start-time") {
                let Index
                const temp = modalInfo
                const obj = temp.find((item, index) => {
                    if (item.Name == name) {
                        Index = index
                    }

                    return item.Name == name
                })
                obj.Value = e
                temp[Index] = obj

                onChange(temp)
            } else {
                let Index
                const temp = modalInfo
                const obj = temp.find((item, index) => {
                    if (item.Name == name) {
                        Index = index
                    }

                    return item.Name == name
                })
                obj.Value = e.target.value
                temp[Index] = obj

                onChange(temp)
            }
        } else {
            onChange(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        if (e) {
            if (typeof e.preventDefault === "function") {
                e.preventDefault()
            }
            if (typeof e.stopPropagation === "function") {
                e.stopPropagation()
                handleSubmitPopUp()
            }
        }
    }

    return (
        <Box>
            <Dialog
                aria-label={`This is ${Title} popup`}
                className="addtional-item-popup"
                open={showPopUp}
                onClose={() => {
                    handleClose(false)
                }}
            >
                <DialogContent
                    sx={{
                        padding: {
                            lg: "  48px",
                            md: " 40px",
                            xs: " 32px"
                        }
                    }}
                >
                    <form aria-label={`This is ${Title} form`} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "100%", xs: "100%" },
                                alignItems: "flex-start",
                                marginTop: "",
                                flexDirection: "column"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    textAlign: "left",
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "24px",
                                        xs: "16px"
                                    },
                                    lineHeight: {
                                        lg: "36px",
                                        xs: "24px"
                                    },
                                    color: "#1E1E1E"
                                }}
                            >
                                {Title?.title}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 400,
                                    paddingTop: "16px",
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "16px",
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        lg: "24px",
                                        xs: "16px"
                                    },
                                    letterSpacing: "-0.19%",
                                    color: "#1E1E1E"
                                }}
                            >
                                {Title?.description}
                            </Typography>
                            {typeof modalInfo != "string" ? (
                                modalInfo?.map((info, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "100%",
                                            marginBottom: "16px",
                                            marginTop: index == 0 ? "32px" : ""
                                        }}
                                    >
                                        {info.type == "time" ? (
                                            <ClockComp
                                                isMobile={md}
                                                show={show}
                                                setShow={setShow}
                                                required={true}
                                                name={`${info.Name}`}
                                                handleChange={handleChange}
                                                setValue={setValue}
                                                value={value}
                                                error={false}
                                                isDaypart={true}
                                            />
                                        ) : (
                                            <Input
                                                label={info.fieldPlaceHolder}
                                                className="ncr-new-input"
                                                disabled={disabled}
                                                name={info.Name}
                                                value={contactPhone}
                                                inputProps={{
                                                    maxLength: 40
                                                }}
                                                onInput={
                                                    info.type === "number"
                                                        ? (e) => {
                                                              e.target.value =
                                                                  Math.max(
                                                                      0,
                                                                      parseInt(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      )
                                                                  )
                                                                      .toString()
                                                                      .slice(
                                                                          0,
                                                                          12
                                                                      )
                                                          }
                                                        : undefined
                                                }
                                                required
                                                type={info.type}
                                                onChange={(e) => {
                                                    handleChange(e, info.Name)
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        marginBottom: "16px",
                                        marginTop: "32px"
                                    }}
                                >
                                    <Input
                                        variant="standard"
                                        label={`Enter ${Title.title}`}
                                        inputProps={{ maxLength: 40 }}
                                        className=" ncr-new-input"
                                        name={"name"}
                                        onChange={(e) => {
                                            handleChange(e, null)
                                        }}
                                        required={true}
                                    />
                                </Box>
                            )}

                            <Box
                                paddingTop={"16px"}
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
                                            xs: "column-reverse"
                                        }
                                    }}
                                    display="flex"
                                >
                                    <Button
                                        className="back-button"
                                        onClick={() => {
                                            handleClose(false)
                                        }}
                                        variant="outlined"
                                        aria-label="Clear"
                                        sx={{
                                            marginRight: {
                                                md: "16px",
                                                xs: "0px"
                                            },
                                            marginTop: { md: "0px", xs: "8px" },
                                            padding: "12px 20px",
                                            fontWeight: 600,
                                            display: "flex",
                                            justifyContent: "center",

                                            fontSize: {
                                                lg: "16px",
                                                xs: "16px"
                                            },
                                            lineHeight: {
                                                lg: "24px",
                                                xs: "24px"
                                            },
                                            color: `${theme.palette.primary.main} !important`
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="next-button"
                                        type="submit"
                                        role="button"
                                        aria-label="Next Step"
                                        variant="contained"
                                        sx={{
                                            padding: "12px 20px",
                                            fontWeight: 600,
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: {
                                                lg: "16px",
                                                xs: "16px"
                                            },
                                            lineHeight: {
                                                lg: "24px",
                                                xs: "24px"
                                            },
                                            color: "white"
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
