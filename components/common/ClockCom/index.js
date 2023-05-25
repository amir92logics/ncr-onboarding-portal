import React, { useState, useEffect } from "react"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import InputAdornment from "@mui/material/InputAdornment"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { Box } from "@mui/system"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import dayjs from "dayjs"
import theme from "../../../src/theme"
export default function ClockComp({
    isCon,
    value,
    error,
    disabled,
    name,
    defaultLabel,
    handleChange,
    isDaypart,
    isMobile,
    widthHourOperation,
    widthHourOperationSM,
    ariaLabel
}) {
    const MyActionBar = ({ onAccept, onCancel }) => {
        return (
            <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                    className="back-button2"
                    onClick={onCancel}
                    sx={{ marginBottom: "10px", marginRight: "5px" }}
                >
                    {" "}
                    Cancel{" "}
                </Button>
                <Button
                    className="back-button1"
                    sx={{
                        borderRadius: "4px",
                        marginBottom: "10px",
                        marginRight: "10px"
                    }}
                    variant="outlined"
                    onClick={onAccept}
                >
                    {" "}
                    Confirm{" "}
                </Button>
            </DialogActions>
        )
    }
    const [open, setOpen] = useState(true)
    const [val, setVal] = useState(["--:--", "AM"])
    useEffect(() => {
        setVal(value)
        const temp = value && value.length > 0 ? value[1] : "AM"
        setAMPM(temp)
    }, [value])

    const [ampm, setAMPM] = useState("AM")
    const [value1, setValue] = useState(dayjs("2014-08-18T21:11:54"))
    const handlemobiletime = (val) => {
        let temp =
            val && val.length > 0
                ? `Mon Sep 19 2022 ${
                      val[0].split(":")[0] == "12" && val[1] == "AM"
                          ? "00" + val[0].split(":")[1]
                          : val[0].split(":")[0] < 12 && val[1] == "PM"
                          ? `${Number(val[0].split(":")[0]) + 12}:${
                                val[0].split(":")[1]
                            }`
                          : val[0]
                  }:00 GMT+0500 (Pakistan Standard Time)`
                : "hh:mm"
        return temp
    }
    return (
        <Box
            className={`clock ${
                name?.includes(" ") ? name?.replace(" ", "") : name
            }`}
        >
            <Box
                className="show-clock"
                // id={`toggle-clock-box${
                //     name?.includes(" ") ? name?.replace(" ", "") : name
                // }`}
            >
                {isCon ? (
                    isMobile ? (
                        <TextField
                            aria-label={ariaLabel}
                            disabled
                            variant="standard"
                            sx={{
                                width: "100%",
                                color: "#1E1E1E !important",
                                backgroundColor: "transparent !important",
                                paddingLeft: "10px  !important"
                            }}
                            id="time"
                            type="time"
                            InputProps={{
                                disableUnderline: true
                            }}
                            value={
                                (value?.toString()).length > 6
                                    ? value?.toString().slice(16, 21)
                                    : value
                            }
                            onBlur={(e) => {
                                if (isDaypart) {
                                } else {
                                    handleChange(
                                        name,
                                        `Mon Sep 19 2022 ${e.target.value}:00 GMT+0500 (Pakistan Standard Time)`
                                    )
                                }
                            }}
                            onChange={(newValue) => {
                                if (isDaypart) {
                                } else {
                                    setValue(
                                        `Mon Sep 19 2022 ${newValue.target.value}:00 GMT+0500 (Pakistan Standard Time)`
                                    )
                                }
                            }}
                        />
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                disabled
                                disableOpenPicker
                                value={value}
                                renderInput={(params) => {
                                    params.error = false
                                    return (
                                        <TextField
                                            aria-label={ariaLabel}
                                            id="time"
                                            variant="standard"
                                            sx={{
                                                width: isDaypart
                                                    ? "100px"
                                                    : "100%",
                                                fontSize: "16px",
                                                color: "#1E1E1E !important",
                                                backgroundColor: "transparent"
                                            }}
                                            {...params}
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                        />
                                    )
                                }}
                            />
                        </LocalizationProvider>
                    )
                ) : isMobile ? (
                    <LocalizationProvider
                        error={false}
                        dateAdapter={AdapterDateFns}
                    >
                        <MobileTimePicker
                            disabled={disabled}
                            orientation="portrait"
                            className="mui-pc "
                            label={defaultLabel || "Select Time"}
                            components={{
                                ActionBar: MyActionBar
                            }}
                            value={handlemobiletime(val)}
                            onOpen={() => setOpen(false)}
                            onClose={() => setOpen(true)}
                            onChange={(newValue) => {
                                if (newValue) {
                                    if (
                                        newValue.toString() !==
                                            "Invalid Date" &&
                                        open
                                    ) {
                                        if (isDaypart) {
                                            setValue(newValue)
                                        } else {
                                        }
                                    } else {
                                        const temp = newValue
                                            .toString()
                                            .slice(16, 21)
                                        const _temp = temp.split(":")
                                        if (_temp[0] > 11) {
                                            setAMPM("PM")
                                            setVal([
                                                `${
                                                    _temp[0] == 12
                                                        ? _temp[0]
                                                        : _temp[0] - 12 < 10
                                                        ? `0${_temp[0] - 12}`
                                                        : _temp[0] - 12
                                                }:${_temp[1]}`,
                                                "PM"
                                            ])
                                            handleChange(
                                                [
                                                    `${
                                                        _temp[0] == 12
                                                            ? _temp[0]
                                                            : _temp[0] - 12 < 10
                                                            ? `0${
                                                                  _temp[0] - 12
                                                              }`
                                                            : _temp[0] - 12
                                                    }:${_temp[1]}`,
                                                    "PM"
                                                ],
                                                name
                                            )
                                        } else {
                                            let temp2 =
                                                _temp[0] == "00"
                                                    ? `12:${_temp[1]}`
                                                    : temp
                                            setAMPM("AM")
                                            setVal([temp2, "AM"])
                                            handleChange([temp2, "AM"], name)
                                        }
                                    }
                                }
                            }}
                            renderInput={(params) => {
                                params.error = error ? error : false
                                return (
                                    <TextField
                                        aria-label={ariaLabel}
                                        id="time"
                                        className={` ${
                                            isDaypart
                                                ? ""
                                                : "hours-operation-clock"
                                        } `}
                                        sx={{
                                            backgroundColor: "transparent",
                                            borderRadius: "8px",
                                            width: widthHourOperationSM
                                                ? {
                                                      md: widthHourOperation,
                                                      xs: widthHourOperationSM
                                                  }
                                                : "100%"
                                        }}
                                        variant={"standard"}
                                        {...params}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    sx={{
                                                        cursor: "pointer",
                                                        color: !disabled
                                                            ? "#5C5C5C"
                                                            : "rgba(0, 0, 0, 0.54)"
                                                    }}
                                                    position="end"
                                                >
                                                    <AccessTimeIcon edge="end" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )
                            }}
                        />
                    </LocalizationProvider>
                ) : (
                    <>
                        <TextField
                            aria-label={ariaLabel}
                            variant="standard"
                            value={
                                val && val.length > 0
                                    ? val[0] == ":"
                                        ? "--:--"
                                        : val[0]
                                    : defaultLabel == "End of day time"
                                    ? ""
                                    : "--:--"
                            }
                            label={defaultLabel}
                            error={error}
                            sx={{
                                backgroundColor: "transparent",
                                width: {
                                    lg: isDaypart
                                        ? "100%"
                                        : widthHourOperation || "272px",
                                    md: isDaypart
                                        ? "100%"
                                        : widthHourOperation
                                        ? widthHourOperation
                                        : "100%"
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            right: 8,
                                            bottom: 8,
                                            border: "1px solid #E0E0E0",
                                            p: 1,
                                            borderRadius: "4px",
                                            bgcolor: "white",
                                            position: "absolute",
                                            cursor: !disabled && "pointer"
                                        }}
                                    >
                                        <Box
                                            onClick={(e) => {
                                                !disabled && setAMPM("AM")
                                                val &&
                                                val !== "" &&
                                                val.length != 0 &&
                                                val[0].length == 5 &&
                                                val[0] !== ":"
                                                    ? !disabled &&
                                                      handleChange(
                                                          [val[0], "AM"],
                                                          name
                                                      )
                                                    : !disabled &&
                                                      handleChange("", name)
                                            }}
                                            sx={{
                                                userSelect: "none",
                                                px: 2,
                                                py: 1,
                                                bgcolor:
                                                    ampm == "AM" && theme.chips.background.progress,
                                                color:
                                                    ampm == "AM" &&
                                                    !disabled ?
                                                    theme.chips.text.progress : "#1e1e1e",
                                                borderRadius: "2px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            AM
                                        </Box>
                                        <Box
                                            onClick={(e) => {
                                                !disabled && setAMPM("PM")
                                                if (
                                                    val &&
                                                    val !== "" &&
                                                    val.length != 0 &&
                                                    val[0].length == 5 &&
                                                    val[0] !== ":"
                                                ) {
                                                    !disabled &&
                                                        handleChange(
                                                            [val[0], "PM"],
                                                            name
                                                        )
                                                } else {
                                                    !disabled &&
                                                        handleChange("", name)
                                                }
                                            }}
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                userSelect: "none",
                                                bgcolor:
                                                    ampm == "PM" &&  theme.chips.background.progress,
                                                color:
                                                    ampm == "PM" &&
                                                    !disabled ?
                                                    theme.chips.text.progress : "#1e1e1e",
                                                borderRadius: "2px",
                                                fontSize: "14px",
                                                fontWeight: 400
                                            }}
                                        >
                                            PM
                                        </Box>
                                    </Box>
                                )
                            }}
                            disabled={disabled}
                            onChange={(e) => {
                                const x = e.target.value
                                    .replace(/\D/g, "")
                                    .match(/(\d{0,2})(\d{0,2})/)
                                const tempTime = !x[2]
                                    ? x[1]
                                    : x[1] + ":" + x[2]
                                let temp2 = tempTime.split(":")
                                const temp = []
                                temp.push(
                                    Number(temp2[0]) < 12 &&
                                        Number(temp2[0][0]) !== 0
                                        ? Number(temp2[0]) < 12 &&
                                          Number(temp2[0][0]) > 1
                                            ? 0 + temp2[0]
                                            : temp2[0]
                                        : !(Number(temp2[0]) > 23) &&
                                          Number(temp2[0]) > 12 &&
                                          ampm == "AM"
                                        ? Number(temp2[0]) - 12
                                        : Number(temp2[0]) > 23
                                        ? "01"
                                        : temp2[0] == "00"
                                        ? 12
                                        : temp2[0]
                                )
                                temp.push(
                                    Number(temp2[1]) > 59 ? "59" : temp2[1]
                                )
                                const res = [temp.join(":"), ampm]
                                setVal(res)
                                res[0] == ":" || res[0].length !== 5
                                    ? handleChange("", name)
                                    : handleChange(res, name)
                            }}
                        />
                    </>
                )}
            </Box>
        </Box>
    )
}
