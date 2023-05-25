import { styled } from "@mui/material/styles"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

const CommonToggle = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        width: 36,
        maxHeight: 20,
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor: "rgba(0,0,0,.25)",
        boxSizing: "border-box"
    },
    "& .MuiSwitch-thumb": {
        width: 17,
        height: 16,
        margin: 1
    },
    "& .MuiSwitch-switchBase": {
        "&.Mui-checked": {
            transform: "translateX(15px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#1D4ED8"
            },
            "&.Mui-disabled": {
                color: "#f5f5f5"
            }
        },

        "&.Mui-disabled": {
            "& + .MuiSwitch-thumb": {
                opacity: 0.4,
                backgroundColor: "#fff"
            },
            "& + .MuiSwitch-track": {
                opacity: 0.4
            }
        },
        "&:hover": {
            background: "rgba(189, 189, 189, 0.2)"
        }
    }
}))

export default function index({
    disabled,
    checked,
    onChange,
    label,
    name,
    reverse = false,
    ariaLabel
}) {
    return (
        <FormGroup>
            <FormControlLabel
                aria-label={ariaLabel}
                sx={{
                    display: "flex !important",
                    flexDirection: {
                        xs: reverse
                            ? "row-reverse !important"
                            : "row !important",
                        sm: "row !important"
                    },
                    mr: {
                        xs: reverse ? "-10px" : "16px",
                        sm: reverse ? "0px" : "16px"
                    }
                }}
                name={name || ""}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                control={<CommonToggle />}
                label={label || ""}
            />
        </FormGroup>
    )
}
