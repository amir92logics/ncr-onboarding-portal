import React, { useState } from "react"
import { useMediaQuery } from "@mui/material"
import { get24Hours } from "../../helper/Constraints"
import Box from "@mui/material/Box"
import {
    Dialog,
    DialogContent,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    Typography
} from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import ClockComp from "../common/ClockCom"
import theme from "../../src/theme"
import Input from "../../components/common/Input"
import CommonButton from "../common/CommonButton"

export default function ManagedNetworkNSSPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    modalInfo,
    Title,
    onChange,
    AdditionalPrinterGroup
}) {
    const [show, setShow] = React.useState("")
    const [DaysData, setDayData] = useState(false)
    const md = useMediaQuery("(max-width:671px)")
    const [value, setValue] = useState("")
    const handleClose = () => {
        handleTogglePopUp(false)
    }
    const handleChange = (e, name) => {
        setDayData(!DaysData)
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

                var Taxratespercent =
                    Number(e.target.value) < 100 ||
                    Number(e.target.value) == 100
                        ? e.target.value
                        : ""

                obj.Value = name.includes("tax-amount")
                    ? Taxratespercent
                    : e.target.value

                temp[Index] = obj

                onChange(temp)
            }
        } else {
            onChange(e.target.value)
        }
    }
    const handleSubmit = () => {
        handleSubmitPopUp()
    }

    return (
        <Box>
            <Dialog
                className="addtional-item-popup"
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
                open={showPopUp}
                onClose={() => {
                    handleClose()
                }}
            >
                <DialogContent
                    sx={{
                        padding: {
                            md: "32px",
                            xs: "24px"
                        }
                    }}
                >
                    <Box>
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
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontSize: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        lineHeight: {
                                            lg: "32px",
                                            xs: "32px"
                                        },
                                        color: "#1E1E1E"
                                    }}
                                >
                                    {Title?.title}
                                </Typography>
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        right: 8,
                                        top: -6
                                    }}
                                    onClick={() => handleClose()}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is close icon</title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 400,
                                    paddingTop: "16px",
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "16px",
                                        xs: "16px"
                                    },
                                    lineHeight: {
                                        lg: "24px",
                                        xs: "24px"
                                    },
                                    letterSpacing: "-0.19%",
                                    color: theme.palette.secondary.main
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
                                        ) : info.type == "select-box" ? (
                                            <>
                                                {" "}
                                                <FormControl
                                                    variant="standard"
                                                    sx={{
                                                        width: "100%",
                                                        borderRadius: "unset"
                                                    }}
                                                >
                                                    <InputLabel className="demo-simple-select-label">
                                                        Printer Group
                                                    </InputLabel>
                                                    <Select
                                                        label="Printer Group"
                                                        className="comps-dropdown"
                                                        required={true}
                                                        displayEmpty
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                info.Name
                                                            )
                                                        }}
                                                        inputProps={{
                                                            "aria-label":
                                                                "Without label"
                                                        }}
                                                        sx={{
                                                            fontSize: "15px",
                                                            backgroundColor:
                                                                "transparent",

                                                            borderColor:
                                                                "#5C5C5C",
                                                            borderRadius: "8px",
                                                            "& label.Mui-focused":
                                                                {
                                                                    color: theme
                                                                        .palette
                                                                        .primary
                                                                        .main
                                                                },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                                {
                                                                    borderColor:
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .main
                                                                },

                                                            "& .Mui-focused": {
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                                fontWeight:
                                                                    "bold"
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem
                                                            value={
                                                                "Grill & Expo"
                                                            }
                                                        >
                                                            Grill & Expo
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={"Fry & Expo"}
                                                        >
                                                            Fry & Expo
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={
                                                                "Grill, Fry & Expo"
                                                            }
                                                        >
                                                            Grill, Fry & Expo
                                                        </MenuItem>

                                                        {AdditionalPrinterGroup.map(
                                                            (item, i) => (
                                                                <MenuItem
                                                                    key={i}
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </>
                                        ) : (
                                            <Input
                                                value={info.Value}
                                                label={info.fieldPlaceHolder}
                                                className="ncr-new-input"
                                                fullWidth={true}
                                                name={
                                                    "item[index]?.fieldPlaceHolder"
                                                }
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
                                                type={info.type}
                                                InputProps={{
                                                    endAdornment:
                                                        info.fieldPlaceHolder.includes(
                                                            "%"
                                                        ) && (
                                                            <InputAdornment
                                                                sx={{
                                                                    marginTop:
                                                                        "0px"
                                                                }}
                                                                position="end"
                                                            >
                                                                {"%"}
                                                            </InputAdornment>
                                                        ), 
                                                        inputProps: {
                                                            min: info.fieldPlaceHolder.includes(
                                                                "%"
                                                            ) &&    0,
                                                            max: info.fieldPlaceHolder.includes(
                                                                "%"
                                                            ) &&    100,
                                                            step: info.fieldPlaceHolder.includes(
                                                                "%"
                                                            ) &&    "any"
                                                        }
                                                }}
                                                onChange={(e) => {
                                                    handleChange(e, info.Name)
                                                }}
                                                required
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
                                        label={`Enter ${Title.title}`}
                                        inputProps={{ maxLength: 40 }}
                                        className=" ncr-new-input"
                                        fullWidth={true}
                                        name={"name"}
                                        onChange={(e) => {
                                            handleChange(e, null)
                                        }}
                                        required
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
                                            xs: "column"
                                        },
                                        justifyContent: "flex-end"
                                    }}
                                    display="flex"
                                >
                                    <CommonButton
                                        onclickHandler={handleClose}
                                        className={"model-button"}
                                        ariaTag={"This is Cancel Button"}
                                        variant={"text"}
                                        mt={{ xs: "0px", md: "0px" }}
                                        mr={{ md: "8px" }}
                                        px={"20px"}
                                        py={{ xs: "12px" }}
                                        width={{
                                            xs: "100%",
                                            md: "auto"
                                        }}
                                        color={theme.palette.secondary.main}
                                        fontSize={{ md: "16px", xs: "14px" }}
                                        lineHeight={{ md: "24px", xs: "18px" }}
                                        fontWeight="600"
                                        content={"Cancel"}
                                    />

                                    <CommonButton
                                        className={"next-button"}
                                        onclickHandler={() => handleSubmit()}
                                        ariaTag={"This is Confirm Button"}
                                        disabled={
                                            modalInfo.filter(
                                                (it) => it.Value == ""
                                            ).length > 0
                                        }
                                        variant={"contained"}
                                        px={{ xs: "20px" }}
                                        py={{ xs: "12px" }}
                                        width={{
                                            xs: "100%",
                                            md: "auto"
                                        }}
                                        mt={{ md: 0, xs: "8px" }}
                                        color="white"
                                        fontSize={{ md: "16px", xs: "14px" }}
                                        lineHeight={{ md: "24px", xs: "18px" }}
                                        fontWeight="600"
                                        content={"Confirm"}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
