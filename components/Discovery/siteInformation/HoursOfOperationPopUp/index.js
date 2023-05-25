import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import {
    Checkbox,
    Dialog,
    DialogContent,
    Divider,
    FormControlLabel,
    Typography,
    useMediaQuery
} from "@mui/material"
import CommonButton from "../../../common/CommonButton"
import SelectBox from "../../../common/SelectBox"
import { get24Hours } from "../../../../helper/Constraints"
import Togglebutton from "../../../common/Togglebutton"
export default function HoursOfOperationPopUp({
    openTimePopUp,
    setopenTimePopUp,
    data,
    handleChange,
    setDaysselected,
    daysSelected
}) {
    const [antToggle, setAntToggle] = useState({
        buisnessToggle: false,
        hourToggle: false
    })
    const [show, setShow] = useState("")
    const [error, setError] = useState(false)
    let Hours24 = get24Hours()
    const mdBelow = useMediaQuery("(max-width:670px)")
    const md = useMediaQuery("(max-width:900px)")
    const sm = useMediaQuery("(max-width:600px)")
    const xs = useMediaQuery("(max-width:0px)")
    const [disabled, setDisable] = useState(false)

    const [DaysData, setDayData] = useState({
        alltime: "",
        time: [
            {
                open: "",
                close: ""
            }
        ]
    })
    const handledisable = (e) => {
        let { name, checked } = e.target
        setAntToggle((pre) => ({ ...pre, [name]: checked }))
        if (name === "hourToggle") {
            if (checked) {
                setDayData({
                    alltime: "",
                    time: [
                        {
                            open: "",
                            close: ""
                        }
                    ]
                })
            } else {
                setDayData({
                    alltime: "",
                    time: [
                        {
                            open: "",
                            close: ""
                        }
                    ]
                })
            }
        } else {
            if (!checked) {
                setAntToggle((pre) => ({ ...pre, hourToggle: false }))
                setDayData({
                    alltime: "",
                    time: [
                        {
                            open: "",
                            close: ""
                        }
                    ]
                })
            }
        }
    }

    useEffect(() => {
        let temp = data?.find((it) => it.day == daysSelected[0])
        let temp12 = { ...DaysData }
        if (temp?.time[0].open !== "") {
            temp12.time = temp?.time
            setAntToggle((pre) => ({ ...pre, buisnessToggle: true }))
        }

        if (temp?.alltime !== "") {
            temp12.alltime = temp?.alltime
            setAntToggle({ buisnessToggle: true, hourToggle: true })
        }
        setDayData(temp12)
    }, [data])
    const addNewHours = () => {
        const newHour = { ...DaysData }
        let hours = [...newHour.time]
        hours.push({ open: "", close: "" })
        newHour.time = hours
        setDayData(newHour)
    }
    const daySelect = (day) => {
        let temp = [...daysSelected]
        if (temp.length > 0 && temp.includes(day)) {
            temp.splice(temp.indexOf(day), 1)
        } else {
            temp.push(day)
        }
        setDaysselected(temp)
    }

    const handleSubmit = () => {
        handleChange(DaysData)
        setopenTimePopUp(false)
    }
    const handleClose = () => {
        setopenTimePopUp(false)
    }
    const handlechange1 = (v, e) => {
        let index = e.split("-")[1]
        let name = e.split("-")[0]
        let temp = { ...DaysData }
        let time = [...temp.time]
        let current = { ...time[index] }
        current[name] = `${v[0]} ${v[1]}`
        time[index] = current
        temp.time = time
        if (v.length > 1) {
            setDayData(temp)
        }
    }
    const handlechange2 = (v, e) => {
        if (v.length > 1) {
            setDayData((pre) => ({ ...pre, alltime: `${v[0]} ${v[1]}` }))
        }
    }
    const removeHourClock = (id) => {
        let temp = { ...DaysData }
        let data = [...temp.time]
        let tempdata = data.filter((_, i) => i !== id)
        data = tempdata
        temp.time = data

        setDayData(temp)
    }
    const handledisabled = () => {
        if (antToggle.buisnessToggle && !antToggle.hourToggle) {
            let last = DaysData.time[DaysData.time.length - 1]
            if (last.open && last.close) {
                return false
            } else {
                return true
            }
        }
    }
    return (
        <Box>
            <Dialog
                className="hour-of-operation-item-popup"
                open={openTimePopUp}
                onClose={() => setopenTimePopUp(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
            >
                <DialogContent
                    sx={{
                        px: { md: "32px !important", xs: "24px !important" },
                        py: { md: "32px !important", xs: "24px !important" },
                        borderRadius: "8px !important",
                        background: "#FFFFFF"
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "24px"
                                    },
                                    lineHeight: "32px",
                                    fontWeight: 600
                                }}
                            >
                                {daysSelected?.length > 0 && daysSelected[0]}
                            </Typography>
                            <Box
                                sx={{
                                    cursor: "pointer",
                                    mt: { md: -0.7, xs: -4.4 },
                                    mr: 1
                                }}
                            >
                                <svg
                                    onClick={() => setopenTimePopUp(false)}
                                    width={14}
                                    height={14}
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>{`this is ${
                                        daysSelected?.length > 0 &&
                                        daysSelected[0]
                                    } icon`}</title>
                                    <path
                                        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: {
                                    xs: "flex"
                                },
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: {
                                    xs: "15px"
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: "16px"
                                    }
                                }}
                            >
                                Open for business?
                            </Typography>
                            <Box
                                aria-label="This is Toggle Button for Business hours"
                                sx={{
                                    display: {
                                        xs: "flex"
                                    },
                                    alignItems: "center",
                                    gap: 3,
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: "16px"
                                    }
                                }}
                            >
                                <Togglebutton
                                    ariaLabel={
                                        "This is Toggle Button for Business hours"
                                    }
                                    name="buisnessToggle"
                                    checked={antToggle.buisnessToggle}
                                    onChange={(e) => {
                                        handledisable(e)
                                    }}
                                    label={
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: {
                                                    xs: "16px"
                                                },
                                                color: antToggle.buisnessToggle
                                                    ? "#1E1E1E"
                                                    : "#5c5c5c",
                                                width: 27
                                            }}
                                        >
                                            {antToggle.buisnessToggle
                                                ? "Yes"
                                                : "No"}
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: {
                                    xs: "flex"
                                },
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: {
                                    xs: "16px"
                                },
                                opacity: antToggle.buisnessToggle
                                    ? "none"
                                    : "40%",
                                pointerEvents:
                                    !antToggle.buisnessToggle && "none"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: "16px"
                                    }
                                }}
                            >
                                Open 24/7?
                            </Typography>
                            <Box
                                aria-label="This is Toggle Button for Open 24/7"
                                sx={{
                                    display: {
                                        xs: "flex"
                                    },
                                    alignItems: "center",
                                    gap: 3,
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: "16px"
                                    }
                                }}
                            >
                                <Togglebutton
                                    ariaLabel={
                                        "This is Toggle Button for Open 24/7"
                                    }
                                    name="hourToggle"
                                    checked={antToggle.hourToggle}
                                    onChange={(e) => {
                                        handledisable(e)
                                    }}
                                    label={
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: {
                                                    xs: "16px"
                                                },
                                                color: antToggle.hourToggle
                                                    ? "#1E1E1E"
                                                    : "#5c5c5c",
                                                width: 27
                                            }}
                                        >
                                            {antToggle.hourToggle
                                                ? "Yes"
                                                : "No"}
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: { lg: 6.4, xs: 0 },
                            opacity: antToggle.buisnessToggle ? "none" : "40%",
                            pointerEvents: !antToggle.buisnessToggle && "none"
                        }}
                    >
                        {DaysData?.time?.map((item, i) => {
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },
                                        paddingTop: { md: "10px" },
                                        background: {
                                            md: "#FFFFFF",
                                            xs: !antToggle.hourToggle
                                                ? "#FAFAFA"
                                                : "#fff"
                                        },
                                        borderRadius: {
                                            xs: "8px"
                                        },
                                        alignItems: {
                                            md: "center",
                                            xs: "flex-start"
                                        },
                                        marginBottom:
                                            DaysData?.time?.length > 1
                                                ? "12px"
                                                : "",
                                        mt:
                                            i == 0
                                                ? { md: "0px", xs: 4.1 }
                                                : { md: "30px", xs: 4.1 }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: {
                                                md: "none",
                                                xs: antToggle.hourToggle
                                                    ? "none"
                                                    : "block"
                                            },
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            aria-label="This is Delete Time Button"
                                            onClick={() => removeHourClock(i)}
                                            sx={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                gap: "8px",
                                                padding: "16px 17px 16px 0",

                                                opacity:
                                                    DaysData.time?.length < 2
                                                        ? 0.5
                                                        : "",
                                                pointerEvents:
                                                    DaysData.time?.length < 2 &&
                                                    "none"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>{`this is Delete Time icon`}</title>
                                                <path
                                                    d="M12.667 9.33268H5.33366V8.66602H12.667V9.33268ZM1.16699 8.99935C1.16699 4.67549 4.67647 1.16602 9.00033 1.16602C13.3242 1.16602 16.8337 4.67549 16.8337 8.99935C16.8337 13.3232 13.3242 16.8327 9.00033 16.8327C4.67647 16.8327 1.16699 13.3232 1.16699 8.99935ZM1.83366 8.99935C1.83366 12.9505 5.04918 16.166 9.00033 16.166C12.9515 16.166 16.167 12.9505 16.167 8.99935C16.167 5.04821 12.9515 1.83268 9.00033 1.83268C5.04918 1.83268 1.83366 5.04821 1.83366 8.99935Z"
                                                    fill="#323232"
                                                    stroke="#F44336"
                                                />
                                            </svg>
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    color: "#F44336"
                                                }}
                                            >
                                                Delete Time
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {!antToggle.hourToggle ? (
                                        <>
                                            <Box
                                                sx={{
                                                    width: "100%"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        columnGap: {
                                                            md: 4,
                                                            xs: 2
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            mx: {
                                                                md: 0,
                                                                xs: "12px"
                                                            },

                                                            width: mdBelow
                                                                ? "93%"
                                                                : "100%"
                                                        }}
                                                    >
                                                        <SelectBox
                                                            ariaLabel={
                                                                "This is Open Time Input Field"
                                                            }
                                                            show={show}
                                                            setShow={setShow}
                                                            required={true}
                                                            defaultLabel={
                                                                "Open Time"
                                                            }
                                                            name={`open-${i}`}
                                                            disabled={
                                                                !antToggle.buisnessToggle
                                                            }
                                                            initialValue={
                                                                item.open
                                                                    .length > 5
                                                                    ? item.open?.split(
                                                                          " "
                                                                      )
                                                                    : ""
                                                            }
                                                            list={Hours24}
                                                            handleChange={
                                                                handlechange1
                                                            }
                                                            error={error}
                                                            value={""}
                                                            widthHourOperation={
                                                                203
                                                            }
                                                            widthHourOperationSM={
                                                                mdBelow
                                                                    ? "100%"
                                                                    : 295
                                                            }
                                                            width={
                                                                xs
                                                                    ? 290
                                                                    : sm
                                                                    ? 203
                                                                    : md
                                                                    ? 203
                                                                    : 203
                                                            }
                                                            bgColor="white"
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: {
                                                                md: "none",
                                                                xs: "block"
                                                            },
                                                            cursor: "pointer",
                                                            mt: {md:1,xs:3}
                                                        }}
                                                    ></Box>
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: mdBelow
                                                        ? "93%"
                                                        : "100%",

                                                    mb: { md: 0, xs: "16px" },
                                                    ml: { md: 0, xs: "11px" }
                                                }}
                                            >
                                                <SelectBox
                                                    ariaLabel={
                                                        "This is Close Time Input Field"
                                                    }
                                                    show={show}
                                                    setShow={setShow}
                                                    required={true}
                                                    defaultLabel={"Close Time"}
                                                    name={`close-${i}`}
                                                    disabled={
                                                        !antToggle.buisnessToggle
                                                    }
                                                    initialValue={
                                                        item.close.length > 5
                                                            ? item.close?.split(
                                                                  " "
                                                              )
                                                            : ""
                                                    }
                                                    list={Hours24}
                                                    handleChange={handlechange1}
                                                    error={error}
                                                    value={""}
                                                    widthHourOperation={203}
                                                    widthHourOperationSM={
                                                        mdBelow ? "100%" : 295
                                                    }
                                                    width={
                                                        xs
                                                            ? 290
                                                            : sm
                                                            ? 203
                                                            : md
                                                            ? 203
                                                            : 203
                                                    }
                                                    bgColor="white"
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    display: {
                                                        md: "block",
                                                        xs: "none"
                                                    },
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {DaysData.time?.length < 2 ? (
                                                    <svg
                                                        width={18}
                                                        height={18}
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>{`This is add hours icon`}</title>
                                                        <path
                                                            d="M4.83317 8.16797V9.83464H13.1665V8.16797H4.83317ZM8.99984 0.667969C4.39984 0.667969 0.666504 4.4013 0.666504 9.0013C0.666504 13.6013 4.39984 17.3346 8.99984 17.3346C13.5998 17.3346 17.3332 13.6013 17.3332 9.0013C17.3332 4.4013 13.5998 0.667969 8.99984 0.667969ZM8.99984 15.668C5.32484 15.668 2.33317 12.6763 2.33317 9.0013C2.33317 5.3263 5.32484 2.33464 8.99984 2.33464C12.6748 2.33464 15.6665 5.3263 15.6665 9.0013C15.6665 12.6763 12.6748 15.668 8.99984 15.668Z"
                                                            fill="#B3B3B5"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        onClick={() =>
                                                            removeHourClock(i)
                                                        }
                                                        width={18}
                                                        height={18}
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>{`This is delete hours icon`}</title>

                                                        <path
                                                            d="M4.83329 8.16797V9.83464H13.1666V8.16797H4.83329ZM8.99996 0.667969C4.39996 0.667969 0.666626 4.4013 0.666626 9.0013C0.666626 13.6013 4.39996 17.3346 8.99996 17.3346C13.6 17.3346 17.3333 13.6013 17.3333 9.0013C17.3333 4.4013 13.6 0.667969 8.99996 0.667969ZM8.99996 15.668C5.32496 15.668 2.33329 12.6763 2.33329 9.0013C2.33329 5.3263 5.32496 2.33464 8.99996 2.33464C12.675 2.33464 15.6666 5.3263 15.6666 9.0013C15.6666 12.6763 12.675 15.668 8.99996 15.668Z"
                                                            fill="#E31B0C"
                                                        />
                                                    </svg>
                                                )}
                                            </Box>
                                        </>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: "100%",
                                                mt: { md: 0, xs: "-10px" }
                                            }}
                                        >
                                            <SelectBox
                                                ariaLabel={
                                                    "This is End of day time Input Field"
                                                }
                                                show={show}
                                                setShow={setShow}
                                                required={true}
                                                defaultLabel={"End of day time"}
                                                name={`open24`}
                                                disabled={
                                                    !antToggle.buisnessToggle
                                                }
                                                initialValue={
                                                    DaysData.alltime.length > 5
                                                        ? DaysData.alltime?.split(
                                                              " "
                                                          )
                                                        : ""
                                                }
                                                list={Hours24}
                                                handleChange={handlechange2}
                                                error={error}
                                                value={""}
                                                widthHourOperation={"100%"}
                                                width={
                                                    xs
                                                        ? 290
                                                        : sm
                                                        ? 203
                                                        : md
                                                        ? "100%"
                                                        : "100%"
                                                }
                                                bgColor="white"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            )
                        })}

                        <Box
                            sx={{
                                display: {
                                    xs: "flex"
                                },
                                gap: "8px",
                                justifyContent: {
                                    md: "flex-end",
                                    xs: "flex-start"
                                },
                                alignItems: "center",
                                mt: {
                                    md: "17px",
                                    xs: "8px"
                                }
                            }}
                        >
                            {!mdBelow ? (
                                <Box
                                    onClick={() => addNewHours()}
                                    aria-label="This is Add another button"
                                    sx={{
                                        visibility: antToggle.hourToggle
                                            ? "hidden"
                                            : "visible",
                                        display: "flex",
                                        alignItems: "center",
                                        columnGap: "8px",
                                        cursor: "pointer",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            background: "#F5F6FF"
                                        }
                                    }}
                                >
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`this is  Add another icon`}</title>
                                        <path
                                            d="M8.16669 8.6665H8.66669V8.1665V5.33317H9.33335V8.1665V8.6665H9.83335H12.6667V9.33317H9.83335H9.33335V9.83317V12.6665H8.66669V9.83317V9.33317H8.16669H5.33335V8.6665H8.16669ZM1.16669 8.99984C1.16669 4.67598 4.67616 1.1665 9.00002 1.1665C13.3239 1.1665 16.8334 4.67598 16.8334 8.99984C16.8334 13.3237 13.3239 16.8332 9.00002 16.8332C4.67616 16.8332 1.16669 13.3237 1.16669 8.99984ZM1.83335 8.99984C1.83335 12.951 5.04888 16.1665 9.00002 16.1665C12.9512 16.1665 16.1667 12.951 16.1667 8.99984C16.1667 5.0487 12.9512 1.83317 9.00002 1.83317C5.04888 1.83317 1.83335 5.0487 1.83335 8.99984Z"
                                            fill="#323232"
                                            stroke="#1D4ED8"
                                        />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "#1D4ED8"
                                        }}
                                    >
                                        Add another
                                    </Typography>
                                </Box>
                            ) : (
                                !antToggle.hourToggle && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            columnGap: "8px",
                                            width: "100%",
                                            cursor: "pointer",
                                            py: "10px",
                                            border: "1px solid #E0E0E0",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                background: "#F5F6FF",
                                                border: "1px solid #1D4ED8"
                                            }
                                        }}
                                        aria-label="This is Add another button"
                                        onClick={() => addNewHours()}
                                    >
                                        <svg
                                            width={17}
                                            height={18}
                                            viewBox="0 0 17 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>{`this is  Add another icon`}</title>
                                            <path
                                                d="M7.66699 8.66602H8.16699V8.16602V5.33268H8.83366V8.16602V8.66602H9.33366H12.167V9.33268H9.33366H8.83366V9.83268V12.666H8.16699V9.83268V9.33268H7.66699H4.83366V8.66602H7.66699ZM0.666992 8.99935C0.666992 4.67549 4.17647 1.16602 8.50033 1.16602C12.8242 1.16602 16.3337 4.67549 16.3337 8.99935C16.3337 13.3232 12.8242 16.8327 8.50033 16.8327C4.17647 16.8327 0.666992 13.3232 0.666992 8.99935ZM1.33366 8.99935C1.33366 12.9505 4.54918 16.166 8.50033 16.166C12.4515 16.166 15.667 12.9505 15.667 8.99935C15.667 5.04821 12.4515 1.83268 8.50033 1.83268C4.54918 1.83268 1.33366 5.04821 1.33366 8.99935Z"
                                                fill="#323232"
                                                stroke="#1D4ED8"
                                            />
                                        </svg>

                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#1D4ED8"
                                            }}
                                        >
                                            Add another
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Box>
                    </Box>

                    <Divider
                        className="divider-col"
                        sx={{ width: "100%", mt: "20px" }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            mt: { md: 6.3, xs: 6.4 }
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                lineHeight: "28px",
                                fontSize: "17.9px"
                            }}
                        >
                            Select the days you would like these hours to apply
                            to
                        </Typography>
                        {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday"
                        ].map((day, id) => {
                            return (
                                <FormControlLabel
                                    key={id}
                                    aria-label={`This is checkbox label for ${day}`}
                                    label={day}
                                    sx={{
                                        display: {
                                            xs: "flex"
                                        },
                                        padding: {
                                            md: "19px 0px 0px 0px",
                                            xs: "17px 0px 0px 0px"
                                        },
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        columnGap: { md: 2, xs: 2.1 },
                                        maxHeight: "39.8px",
                                        minHeight: "39.8px",
                                        height: "39.8px",
                                        maxWidth: "max-content"
                                    }}
                                    control={
                                        <Checkbox
                                            checked={daysSelected?.includes(
                                                day
                                            )}
                                            onChange={() =>
                                                daysSelected.length == 1 &&
                                                daysSelected?.includes(day)
                                                    ? ""
                                                    : daySelect(day)
                                            }
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    padding: ".6px !important"
                                                },
                                                padding: "6px",
                                                ml: { md: 3, xs: 2.5 },
                                                "&:hover": {
                                                    bgcolor:
                                                        "#F5F5F5 !important"
                                                }
                                            }}
                                        />
                                    }
                                />
                            )
                        })}
                        <Divider
                            className="divider-col"
                            sx={{ width: "100%", mt: "24px" }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { md: "row", xs: "column" },
                            justifyContent: "flex-end",
                            alignItems: "center",
                            pt: { md: 5, xs: 5.5 },
                            columnGap: 1.5,
                            rowGap: 2,
                            width: "100%"
                        }}
                    >
                        <CommonButton
                            className={"model-button"}
                            ariaTag={"This is Cancel button"}
                            variant={"text"}
                            onclickHandler={handleClose}
                            mr={{ lg: "3px" }}
                            px={"18.8px"}
                            py={"11px"}
                            color="#5C5C5C"
                            width={{ xs: "100%", md: "auto" }}
                            fontSize={{ md: "16px", xs: "14px" }}
                            lineHeight={{ md: "24px", xs: "18px" }}
                            fontWeight="600"
                            content={"Cancel"}
                        />

                        <CommonButton
                            onclickHandler={() => handleSubmit()}
                            className={"next-button"}
                            disabled={handledisabled()}
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            px={"20px"}
                            py={"12px"}
                            color="white"
                            width={{ xs: "100%", md: "auto" }}
                            fontSize={{ md: "16px", xs: "14px" }}
                            lineHeight={{ md: "24px", xs: "18px" }}
                            fontWeight="600"
                            hover="#062EC9"
                            content={"Save"}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
