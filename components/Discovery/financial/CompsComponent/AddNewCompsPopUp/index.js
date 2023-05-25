import React, { useState } from "react"
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
import Input from "../../../../common/Input"

import InputLabel from "@mui/material/InputLabel"
import theme from "../../../../../src/theme"
import CommonButton from "../../../../common/CommonButton"

const MenuProps = {
    PaperProps: {
        style: {
            border: `1px solid ${theme.palette.primary.main}`,
            marginTop: "8px",
            borderRadius: "8px"
        }
    }
}

export default function AddNewCompsPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    disabled
}) {
    const [includedComps, setIncludedComps] = useState("")
    const [compsType, setCompsType] = useState("")
    const [amountDetected, setAmountDetected] = useState("")

    const handleClose = () => {
        handleTogglePopUp(false)
        setIncludedComps("")
        setCompsType("")
        setAmountDetected("")
    }
    const handleValidate = () => {
        let response = true
        if (includedComps !== "" && compsType !== "") {
            if (
                compsType === "Prompte for $ Off" ||
                compsType === "Prompte for % Off" ||
                amountDetected !== ""
            ) {
                response = false
            }
        }
        return response
    }

    const handleSubmit = () => {
        const tempData = {
            includedComps: includedComps,
            compsType: compsType,
            amountDeducted: amountDetected ? amountDetected : compsType
        }
        handleSubmitPopUp(tempData)
        handleClose()
    }
    const handleChange = (e) => {
        setCompsType(e.target.value)
        setAmountDetected("")
    }
    const exceptThisSymbols = ["e", "E", "+", "-"]
    return (
        <Box>
            <Dialog
                className="comps-popup"
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
                                    color: "#1E1E1E"
                                }}
                            >
                                Add a New Comp
                            </Typography>
                            <Box
                                aria-label={`This is Close button.`}
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
                                    <title>This is  Add a New Comp icon</title>
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
                                color: theme.palette.secondary.main
                            }}
                        >
                            Comps are used for removing an already prepared
                            item, or all items, from a guest check for a variety
                            of reasons such as employee meals, manager discounts
                            or guest satisfaction.
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%"
                            }}
                        >
                            <Input
                                className="comps-text-field"
                                label="Enter Comps Name"
                                disabled={disabled}
                                name="includedComps"
                                value={includedComps}
                                inputProps={{ maxLength: 40 }}
                                onChange={(e) => {
                                    setIncludedComps(e.target.value)
                                }}
                                fullWidth={true}
                                sx={{
                                    marginTop: "32px",
                                    width: "100%",

                                    fontSize: "14px",
                                    lineHeight: "24px",
                                    fontWeight: "400",

                                    boxShadow:
                                        "0px 8px 16px 3px rgba(117, 117, 117, 0.04)"
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                marginTop: "16px"
                            }}
                        >
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: "100%",

                                    borderRadius: "unset"
                                }}
                            >
                                <InputLabel sx={{ color: "#00000099" }}>
                                    Enter Comps Type
                                </InputLabel>
                                <Select
                                    label="Enter Comps Type"
                                    className="comps-dropdown"
                                    required={true}
                                    value={compsType}
                                    displayEmpty
                                    onChange={(e) => handleChange(e)}
                                    inputProps={{
                                        "aria-label": "Without label"
                                    }}
                                    sx={{
                                        fontSize: "15px",
                                        borderRadius: "8px",
                                        backgroundColor: "transparent"
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value={"Percent Discount"}
                                        sx={{
                                            color: "#5c5c5c",
                                            "&:hover": {
                                                color: "#1e1e1e"
                                            },
                                            "&:focus": {
                                                color: "#1e1e1e"
                                            }
                                        }}
                                    >
                                        Percent Discount
                                    </MenuItem>
                                    <MenuItem
                                        value={"Dollar Discount"}
                                        sx={{
                                            color: "#5c5c5c",
                                            "&:hover": {
                                                color: "#1e1e1e"
                                            },
                                            "&:focus": {
                                                color: "#1e1e1e"
                                            }
                                        }}
                                    >
                                        Dollar Discount
                                    </MenuItem>
                                    <MenuItem
                                        value={"Prompte for % Off"}
                                        sx={{
                                            color: "#5c5c5c",
                                            "&:hover": {
                                                color: "#1e1e1e"
                                            },
                                            "&:focus": {
                                                color: "#1e1e1e"
                                            }
                                        }}
                                    >
                                        Prompt for % Off
                                    </MenuItem>
                                    <MenuItem
                                        value={"Prompte for $ Off"}
                                        sx={{
                                            color: "#5c5c5c",
                                            "&:hover": {
                                                color: "#1e1e1e"
                                            },
                                            "&:focus": {
                                                color: "#1e1e1e"
                                            }
                                        }}
                                    >
                                        Prompt for $ Off
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%"
                            }}
                        >
                            {compsType && (
                                <Input
                                    fullWidth={true}
                                    required={
                                        compsType === "Percent Discount" ||
                                        compsType === "Dollar Discount"
                                            ? true
                                            : false
                                    }
                                    disabled={
                                        compsType === "Percent Discount" ||
                                        compsType === "Dollar Discount"
                                            ? false
                                            : true
                                    }
                                    label={
                                        compsType === "Prompte for % Off"
                                            ? ""
                                            : compsType === "Prompte for $ Off"
                                            ? ""
                                            : compsType === ""
                                            ? ""
                                            : "Enter Amount Detected"
                                    }
                                    className={
                                        "input-adornment-comps-container comps-text-field  "
                                    }
                                    name="amountDetected"
                                    type={"number"}
                                    onChange={(e) => {
                                        const amount =
                                            Number(e.target.value) < 100 ||
                                            Number(e.target.value) == 100
                                                ? e.target.value
                                                : ""

                                        compsType === "Percent Discount" ||
                                        compsType === "Prompte for % Off"
                                            ? setAmountDetected(amount)
                                            : setAmountDetected(e.target.value)
                                    }}
                                    value={amountDetected}
                                    onKeyDown={(e) =>
                                        exceptThisSymbols.includes(e.key) &&
                                        e.preventDefault()
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                className={
                                                    "input-adornment-comps"
                                                }
                                                sx={{
                                                    marginTop: "0px",
                                                    mr:
                                                        compsType ===
                                                            "Percent Discount" ||
                                                        compsType ===
                                                            "Prompte for % Off"
                                                            ? "auto"
                                                            : "none"
                                                }}
                                                position="start"
                                            >
                                                {(compsType ===
                                                    "Dollar Discount" ||
                                                    compsType ===
                                                        "Prompte for $ Off") &&
                                                    "$"}
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                className={
                                                    "input-adornment-comps"
                                                }
                                                sx={{ marginTop: "0px" }}
                                                position="start"
                                            >
                                                {compsType ===
                                                    "Percent Discount" ||
                                                compsType ===
                                                    "Prompte for % Off"
                                                    ? "%"
                                                    : " "}{" "}
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        marginTop: "16px",
                                        backgroundColor:
                                            compsType === "Percent Discount" ||
                                            compsType === "Dollar Discount"
                                                ? "white"
                                                : "#f5f5f5"
                                    }}
                                />
                            )}
                        </Box>

                        <Box
                            paddingTop={"32px"}
                            display="flex"
                            width="100%"
                            justifyContent="flex-end"
                            sx={{
                                flexDirection: {
                                    lg: "row",
                                    md: "row",
                                    xs: "column"
                                },
                                width: { md: "100%", xs: "100%" }
                            }}
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
                                color={theme.palette.secondary.main}
                                fontSize={{ md: "16px", xs: "14px" }}
                                lineHeight={{ md: "24px", xs: "18px" }}
                                fontWeight="600"
                                content={"Cancel"}
                            />
                            <CommonButton
                                className={"next-button"}
                                onclickHandler={handleSubmit}
                                ariaTag={"This is Confirm Button"}
                                variant={"contained"}
                                disabled={handleValidate()}
                                px={{ xs: "20px" }}
                                py={{ xs: "12px" }}
                                mt={{ md: 0, xs: 2 }}
                                color="white"
                                fontSize={{ md: "16px", xs: "14px" }}
                                lineHeight={{ md: "24px", xs: "18px" }}
                                fontWeight="600"
                                content={"Confirm"}
                            />
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
