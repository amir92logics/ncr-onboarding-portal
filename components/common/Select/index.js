import React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import theme from "../../../src/theme"

const MenuProps = {
    PaperProps: {
        style: {
            border: "1px solid #1D4ED8",
            borderRadius: "8px",
            marginTop: "8px"
        }
    }
}
function SelectBox({
    name,
    list,
    title,
    handleChange,
    value,
    disabled = null,
    width = 340,
    bgColor = "",
    fontColor,
    color,
    borderColor
}) {
    return (
        <Box
            sx={{
                minWidth: {
                    sx: "100%",
                    sm: "100%",
                    md: "300px",
                    lg: width
                }
            }}
        >
            <FormControl variant="standard" fullWidth>
                <InputLabel
                    sx={{
                        color: fontColor,
                        "&.Mui-focused": {
                            color: theme.palette.primary.main
                        }
                    }}
                    // id="ncr-input-label"
                >
                    {title || " Select an Option"}
                </InputLabel>
                <Select
                    className={` ${bgColor && "ncr-select-wrapper"}`}
                    labelId="ncr-select-label"
                    // id={`ncr-select-${list[0]?.label}`}
                    value={value}
                    label={title || "Select an Option"}
                    onChange={(event) => handleChange(name, event.target.value)}
                    disabled={disabled}
                    sx={{
                        borderRadius: "8px",
                        borderColor: borderColor,
                        backgroundColor: "transparent",
                        color: color,
                        "& .MuiOutlinedInput-root": {
                            color: [disabled && fontColor]
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        },
                        "&.MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                            color: theme.palette.primary.main
                        }
                    }}
                    MenuProps={MenuProps}
                >
                    {list.map((item, index) => (
                        <MenuItem
                            sx={{
                                color: fontColor,
                                "&:hover": {
                                    color: "#1e1e1e"
                                },
                                "&:focus": {
                                    color: "#1e1e1e"
                                }
                            }}
                            key={index}
                            value={item.value}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
SelectBox.defaultProps = {
    fontColor: `#545454`
}
export default SelectBox
