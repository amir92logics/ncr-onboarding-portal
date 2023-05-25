import React, { useState } from "react"
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Dialog,
    DialogContent,
    Typography,
    useMediaQuery
} from "@mui/material"
import Box from "@mui/material/Box"
import ClockComp from "../ClockCom"
import theme from "../../../src/theme"
import Input from "../../common/Input"
import CommonButton from "../CommonButton"

export default function ManagedNetworkNSSPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    modalInfo,
    Title,
    onChange,
    isDayparts,
    AdditionalPrinterGroup
}) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [show, setShow] = useState("")
    const md = useMediaQuery("(max-width:671px)")
    const [value, setValue] = useState("")
    const handleClose = () => {
        handleTogglePopUp(false)
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
                const _temp = isDayparts && (temp[0].Value == '' || temp[1].Value == '' || temp[1].Value && temp[1].Value.length == 0)
                setIsDisabled(_temp)
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
                const _temp = isDayparts && (temp[0].Value == '' || temp[1].Value == '' || temp[1].Value && temp[1].Value.length == 0)
                setIsDisabled(_temp)
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
                        padding: { md: 8, xs: 6 }
                    }}
                >
                    <form aria-label={`This is ${Title} form`} onSubmit={(e) => {
                        handleSubmit(e)
                        if (isDayparts) {
                            modalInfo = [
                                {
                                    Value: "",
                                    type: "text",
                                    Name: "tax-name",
                                    fieldPlaceHolder: "Enter Name"
                                },
                                {
                                    Value: "",
                                    type: "time",
                                    Name: "start-time",
                                    fieldPlaceHolder: "Enter start time"
                                }
                            ]
                        }
                    }}>
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
                                        width: { md: "auto", xs: "70%" }
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
                                        <title>{`This is tooltip icon for ${Title?.title}`}</title>
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
                                    marginTop: 4,
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
                                        key={`${index + 1}`}
                                        sx={{
                                            width: "100%",
                                            marginBottom: "16px",
                                            marginTop:
                                                index == 0
                                                    ? "32px"
                                                    : !isDayparts
                                                        ? ""
                                                        : "16px"
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
                                                            borderColor:
                                                                "transparent",
                                                            "& label.Mui-focused":
                                                            {
                                                                color: "#1D4ED8"
                                                            },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                            {
                                                                borderColor:
                                                                    "#1D4ED8"
                                                            },

                                                            "& .Mui-focused": {
                                                                color: "#1D4ED8",
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
                                                                    key={item}
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
                                                label={info.fieldPlaceHolder}
                                                className="ncr-new-input"
                                                fullWidth={true}
                                                name={info.Name}
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
                                                inputProps={{ maxLength: 40 }}
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
                                        fullWidth={true}
                                        label={
                                            Title.title == "Add New Printer"
                                                ? "Enter Printer Name"
                                                : `Enter ${Title.title}`
                                        }
                                        inputProps={{ maxLength: 40 }}
                                        className=" ncr-new-input"
                                        name={"name"}
                                        onChange={(e) => {
                                            handleChange(e, null)
                                        }}
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
                                        md: "row",
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
                                            md: "flex-end"
                                        }
                                    }}
                                    display="flex"
                                >
                                    <CommonButton
                                        onclickHandler={handleClose}
                                        className={"model-button"}
                                        ariaTag={"This is  Cancel Button"}
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
                                        type="submit"
                                        disabled={isDayparts && isDisabled}
                                        ariaTag={"This is Confirm Button"}
                                        variant={"contained"}
                                        px={"20px"}
                                        py={{ md: "12px", xs: "12px" }}
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
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
