import React from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Chip from "@mui/material/Chip"
import BpCheckbox from "../BpCheckbox"
import theme from "../../../src/theme"
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            border: `1px solid ${theme.palette.primary.main}`,
            marginTop: "8px",
            borderRadius: "8px"
        }
    }
}

function getStyles(value, values, theme) {
    return {
        fontWeight:
            values?.indexOf(value) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        color: "#1E1E1E",
        fontSize: "14px"
    }
}

export default function MultipleSelectChip({
    name,
    values,
    list,
    handleChange,
    disabled = null,
    buildName,
    bgClr
}) {
    const theme = useTheme()
    const [currentvalue, setCurrentvalue] = React.useState(values || [])
    const onChange = (event) => {
        const { name, value } = event.target
        setCurrentvalue(typeof value === "string" ? value.split(",") : value)
        handleChange(name, typeof value === "string" ? value.split(",") : value)
    }
    return (
        <FormControl
            
            variant="standard"
            sx={{
                width: {
                    md: buildName?.includes("new-install") ? "100%" : 340,
                    sm: "100%",
                    xs: "100%"
                }
            }}
        >
            <InputLabel
                sx={{
                    "&.Mui-focused": {
                        color: theme.palette.primary.main
                    }
                }}
            >
                Select an Option
            </InputLabel>
            <Select
                aria-label="This is Multiselect"
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                name={name}
                disabled={disabled}
                value={values ? values : []}
                onChange={(e) => onChange(e)}
                sx={{
                    backgroundColor: "transparent",
                    color: "#1E1E1E !important",
                    fontSize: "14px",
                    borderRadius: "8px",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main
                    },

                    "&.MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                        color: theme.palette.primary.main
                    }
                }}
                renderValue={(selected) => (
                    <Box
                        sx={{
                            gap: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            paddingX: 1,
                            mt: "-1px",
                            color: "#1E1E1E !important"
                        }}
                    >
                        {selected.map((value, idx) => (
                            <Chip
                                style={{
                                    color: "#1E1E1E",
                                    fontSize: "14px",
                                    background: bgClr,
                                    mt: "3px"
                                }}
                                key={idx}
                                label={value}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {list?.map((item, idx) => {
                    return (
                        <MenuItem
                            aria-label={item}
                            handleChange={handleChange}
                            className="menuitems"
                            sx={{
                                alignitems: "center",
                                "&:hover": {
                                    color: "#1e1e1e"
                                },
                                "&:focus": {
                                    color: "#1e1e1e"
                                }
                            }}
                            key={idx}
                            value={item}
                            style={getStyles(item, currentvalue, theme)}
                        >
                            <BpCheckbox
                                checked={currentvalue.includes(item)}
                                name={"third-party-integration"}
                            />

                            {item}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}
