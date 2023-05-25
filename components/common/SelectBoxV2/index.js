import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useMediaQuery } from "@mui/material"
import ClockComp from "../../common/ClockCom"
import theme from "../../../src/theme"

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
    disabled = null,
    width = 340,
    bgColor = "",
    color,
    fontColor,
    initialValue,
    defaultLabel = "Value",
    isDaypart,
    isNetwork,
    payroll,
    ariaLabel 
}) {
    const md = useMediaQuery("(max-width:768px)")
    let state = list?.some((i) => i.value === "12:00 AM") ? new Date() : ""
    const MenuProps = {
        PaperProps: {
            style: {
                border: `1px solid ${theme.palette.primary.main}`,
                marginTop: "8px",
                borderRadius: "8px",
                maxWidth: { md: payroll && "340px", xs: payroll && "30%" }
            }
        }
    }
    let stateInitialValue = ""
    if (
        initialValue &&
        typeof initialValue != "string" &&
        initialValue.length > 0
    ) {
        initialValue.map((item) => {
            if (item.name == name && item.value != "")
                stateInitialValue = item.value
        })
    }
    const [defaultValue, setDefaultValue] = useState(stateInitialValue)

    useEffect(() => {
        if (
            initialValue &&
            typeof initialValue != "string" &&
            initialValue.length > 0
        ) {
            initialValue.map((item) => {
                item.name == name &&
                    item.value != "" &&
                    setDefaultValue(item.value)
            })
        } else if (typeof initialValue == "string") {
            setDefaultValue(initialValue)
        }
    }, [initialValue])
    return (
        <Box
            sx={{
                minWidth: {
                    sx: "100%",
                    sm: "100%",
                    lg: HInputs === "md-width" ? "" : width,
                    md: HInputs === "md-width" ? "192px" : width
                },
                maxWidth: {
                    sx: "100%",
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
                        sx={{
                            color: "#5C5C5C"
                        }}
                    >
                        {defaultLabel}
                    </InputLabel>
                    <Select
                        className={`${bgColor && "ncr-select-wrapper"}`}
                        labelId={`${
                            bgColor
                                ? "ncr-select-label-new"
                                : "ncr-select-label-old"
                        }`}
                        // id={`ncr-select-${list[0]?.label}`}
                        defaultValue={value}
                        aria-label={ariaLabel}
                        label={defaultLabel}
                        value={defaultValue}
                        onChange={(event) => {
                            handleChange(name, event.target.value)
                            setDefaultValue(event.target.value)
                        }}
                        disabled={disabled}
                        sx={{
                            color: color && "#5C5C5C",
                            backgroundColor: "transparent",
                            borderColor: "#5C5C5C",
                            "& .MuiOutlinedInput-root": {
                                color: [disabled && fontColor]
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.primary.main} !important`
                            },
                            "&.MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                                {
                                    color: theme.palette.primary.main
                                },

                            borderRadius: "8px"
                        }}
                        MenuProps={MenuProps}
                    >
                        {list.map((item, index) => {
                            return (
                                <MenuItem
                                 aria-label={item?.label}
                                    sx={{
                                        color:
                                            item.value === initialValue
                                                ? "#1E1E1E"
                                                : "#5C5C5C",
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
                                        whiteSpace: {
                                            lg: payroll && "normal !important",
                                            xs: payroll && "normal !important"
                                        },
                                        maxWidth: { lg: payroll && "340px" }
                                    }}
                                    key={index + Math.random()}
                                    value={item.value}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            ) : (
                <div>
                    <ClockComp
                        isMobile={md}
                        show={show}
                        setShow={setShow}
                        required={required}
                        name={name}
                        handleChange={handleChange}
                        setValue={setDefaultValue}
                        value={defaultValue}
                        error={false}
                        isDaypart={isDaypart}
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
