import React from "react"
import { TextField } from "@mui/material"
import theme from "../../../src/theme"
function Index({
    ariaLabel,
    disabled,
    variant,
    label,
    required,
    value,
    onChange,
    className,
    type,
    inputProps,
    sx,
    name,
    defaultValue,
    err,
    id,
    onKeyDown,
    onInput,
    InputProps,
    onBlur,
    fullWidth = false
}) {
    return (
        <TextField
            aria-label={ariaLabel || `This is ${label} input field.`}
            disabled={disabled}
            name={name}
            variant={variant ? variant : "standard"}
            label={label}
            min={0}
            // id={id || ""}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur && onBlur}
            onKeyDown={onKeyDown && onKeyDown}
            onInput={onInput && onInput}
            className={className && className}
            type={type}
            InputProps={InputProps && InputProps}
            inputProps={inputProps || {}}
            defaultValue={defaultValue && defaultValue}
            error={err}
            sx={{
                borderRadius: "0px",
                "& label.Mui-focused": {
                    color: err ? "red" : theme.palette.primary.main
                },
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: err ? "red" : theme.palette.primary.main
                    }
                },
                maxWidth: {
                    xs: "100%",
                    lg: fullWidth ? fullWidth : "340px"
                },
                width: "100%",
                backgroundColor: "transparent",
                ...sx
            }}
        />
    )
}

export default Index
