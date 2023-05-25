import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { Typography, useMediaQuery } from "@mui/material"
import ClockComp from "../../common/ClockCom"

import theme from "../../../src/theme"

const MenuProps = {
    PaperProps: {
        style: {
            border: `1px solid ${theme.palette.primary.main}`,
            marginTop: "8px",
            borderRadius: "8px"
        }
    }
}
function SelectBox({
    error,
    show,
    setShow,
    HInputs,
    required = false,
    name,
    list,
    handleChange,
    value,
    disabled,
    width = 340,
    bgColor = "",
    fontColor,
    initialValue,
    defaultLabel = "Value",
    isDaypart,
    isNetwork,
    selectBox,
    padding,
    widthHourOperation,
    page,
    widthHourOperationSM,
    primary,
    isAdditional,
    prime,
    ariaLabel
}) {

    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }
    const md = useMediaQuery("(max-width:768px)")
    let state = list?.some((i) => i.value === "12:00 AM") ? new Date() : ""
    let stateInitialValue = ""

    if (
        initialValue &&
        isDaypart &&
        !isAdditional &&
        typeof initialValue != "string" &&
        initialValue.length > 0
    ) {
        initialValue.map((item) => {
            if (item.name == name && item.value != "")
                stateInitialValue = item.value
        })
    } else {
        stateInitialValue = initialValue
    }
    const [defaultValue, setDefaultValue] = useState(stateInitialValue)
    useEffect(() => {
        if (
            initialValue &&
            isDaypart &&
            !isAdditional &&
            typeof initialValue != "string" &&
            initialValue.length > 0
        ) {
            initialValue.map((item) => {
                item.name == name &&
                    item.value != "" &&
                    setDefaultValue(item.value)
            })
        } else if (typeof initialValue == "object") {
            setDefaultValue(initialValue)
        } else {
            setDefaultValue(initialValue)
        }
    }, [initialValue])
    return (
        <Box
            className={
                name === "Documents Overview" ? " document-overview" : ""
            }
            sx={{
                minWidth: {
                    sm: "100%",
                    xs: "100%",
                    lg:
                        selectBox ===
                        "Yes, another company will manage my network"
                            ? "413px"
                            : name == "selectSuper"
                            ? "340px"
                            : HInputs === "md-width"
                            ? ""
                            : width,
                    md:
                        selectBox ===
                        "Yes, another company will manage my network"
                            ? "100%"
                            : name == "selectSuper"
                            ? "100%"
                            : HInputs === "md-width"
                            ? "192px"
                            : width
                },
                marginLeft: {
                    md: "0",
                    xxl: "0",
                    xl: "0",
                    lg: "0"
                },
                maxWidth: {
                    xs: "100%",
                    sm: "100%",
                    lg: HInputs === "md-width" && "272px",
                    md: HInputs === "md-width" && "272px"
                }
            }}
        >
            {state == "" ? (
                <FormControl variant="standard" required={required} fullWidth>
                    <InputLabel
                        // id={`${
                        //     bgColor
                        //         ? "ncr-select-label-new"
                        //         : "ncr-select-label-old"
                        // }`}
                    >
                        {defaultLabel}
                    </InputLabel>
                    <Select
                       aria-label={ariaLabel}
                       
                        MenuProps={MenuProps}
                        className={`${bgColor && "ncr-select-wrapper"}`}
                        labelId={`${
                            bgColor
                                ? "ncr-select-label-new"
                                : "ncr-select-label-old"
                        }`}
                        id={
                            page ? "NCR-SELECT" : `ncr-select-${list[0]?.label}`
                        }
                        defaultValue={value}
                        label={defaultLabel}
                        value={defaultValue}
                        onChange={(event) => {
                            handleChange(name, event.target.value)
                        }}
                        disabled={disabled}
                        sx={{
                            display: "flex !important",
                            justifyContent: "space-between !important",
                            backgroundColor: "transparent",
                            borderColor: "#5C5C5C",
                            "& .MuiOutlinedInput-root": {
                                color: [disabled && fontColor]
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main
                            },
                            "&.MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                                {
                                    color: theme.palette.primary.main
                                },
                            borderRadius: "8px",
                            width:
                                name == "selectSuper"
                                    ? { xs: "100%", md: "100%", lg: "340px" }
                                    : "100%"
                        }}
                    >
                        {list.map((item, index) => {
                            return (
                                <MenuItem
                                aria-label={item?.label}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight:
                                            item.value === initialValue
                                                ? 500
                                                : 400,
                                        "&:hover": {
                                            color: "#1e1e1e"
                                        },
                                        "&:focus": {
                                            color: "#1e1e1e"
                                        },
                                        color: "#5C5C5C",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                    key={index + Math.random()}
                                    value={item.value}
                                >
                                    <Box sx={{ display: { md: "none" } }}>
                                        {TruncateString(item.label, 800)}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: { xs: "none", md: "block" }
                                        }}
                                    >
                                        {item.label}
                                    </Box>
                                    <Box>
                                        {" "}
                                        {page && item.label === primary && (
                                            <Typography
                                                sx={{
                                                    border: "1px solid #5364FD",
                                                    padding: {
                                                        md: "3px 8px",
                                                        xs: "1px 3px"
                                                    },
                                                    borderRadius: "24px",
                                                    color: "#062EC9",
                                                    ml: {
                                                        xs: "5px",
                                                        md: "0px"
                                                    },
                                                    fontSize: {
                                                        md: "14px",
                                                        xs: "10px"
                                                    }
                                                }}
                                            >
                                                Primary Contact
                                            </Typography>
                                        )}
                                    </Box>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            ) : (
                <div>
                    <ClockComp
                        disabled={disabled}
                        isMobile={md}
                        show={show}
                        defaultLabel={defaultLabel}
                        setShow={setShow}
                        required={required}
                        name={name}
                        handleChange={handleChange}
                        setValue={setDefaultValue}
                        value={defaultValue}
                        error={error}
                        widthHourOperation={widthHourOperation}
                        widthHourOperationSM={widthHourOperationSM}
                        isDaypart={isDaypart}
                        ariaLabel={ariaLabel}
                    />
                </div>
            )}
        </Box>
    )
}
SelectBox.defaultProps = {
    fontColor: `#545454`
}
export default SelectBox
