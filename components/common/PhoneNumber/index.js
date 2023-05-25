import { forwardRef, useState } from "react"

import { makeStyles } from "@mui/styles"
import { TextField } from "@mui/material"
import { isValidPhoneNumber } from "react-phone-number-input"

const useStyles = makeStyles((theme) => ({
    input: {
        backgroundColor: "#fff"
    }
}))

const PhoneInput = (props, ref) => {
    const classes = useStyles()

    return (
        <TextField
            {...props}
            InputProps={{
                className: classes.input
            }}
            error={props.error}
            sx={{
                ".MuiInputLabel-root": {
                    left: props.value ? "0px !important" : "40px !important",
                    cursor: "pointer"
                },
                ".MuiInputBase-input": {
                    pl: 10
                },
                "& label.Mui-focused": {
                    left: "0px !important"
                }
            }}
            inputRef={ref}
            fullWidth
            size="small"
            label="Contact Number"
            variant="standard"
            name="phone"
        />
    )
}
export default forwardRef(PhoneInput)
