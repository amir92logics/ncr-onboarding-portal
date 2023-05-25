import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, useMediaQuery } from "@mui/material"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow, { tableRowClasses } from "@mui/material/TableRow"
import SelectBox from "../../../common/SelectBox"
import MuiTextArea from "../../../common/MuiTextArea/MuiTextArea"
import { useDispatch, useSelector } from "react-redux"
import {
    calculatePercentage,
    get24Hours,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import HoursOfOperationMobile from "../HoursOfOperationMobile"
import HoursOfOperationPopUp from "../HoursOfOperationPopUp"
import Notification from "../../../common/Notifications"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
        height: "25px "
    }
}))
export default function HoursOfOperationNew() {
    const smd = useMediaQuery("(max-width:671px)")
    const router = useRouter()
    const [disabled, setDisable] = useState(false)
    const [earlyTime, setEarlyTime] = useState({
        name: "earliestTime",
        value: ""
    })
    const [open, setOpen] = useState(false)
    const routerID = router.query.id
    const sm = useMediaQuery("(max-width:600px)")
    const xs = useMediaQuery("(max-width:0px)")
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Site Information",
        "Hours of Operation"
    )
    let dayspartper = substageinnerstages.find(
        (it) => it.name == "Day Parts"
    ).percentage
    let revenueper = substageinnerstages.find(
        (it) => it.name == "Revenue Centers"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let hoursdata = { ...substageinnerstages[currentindex] }
    let initialData = hoursdata.data
    const handleStoreData = (data, early, notes) => {
        let count1 = data.filter(
            (it) => it.time[0].open !== "" || it.alltime !== ""
        ).length
        let count2 = data.filter((it) => it.close).length
        const count =
            count2 == 7
                ? 0 + (early.value ? 1 : 0)
                : count2 + count1 + (early.value ? 1 : 0)
        const tempPercent = calculatePercentage(8, count)
        const siteinfodataper = Math.round(
            (revenueper + dayspartper + tempPercent) / 3
        )
        let temp = [{ notes, hourData: data, earlyTime: early }]
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Site Information",
            "Hours of Operation",
            temp,
            tempPercent,
            siteinfodataper,
            false
        )

        dispatch(SetSideBarData(tempsidebar))
    }
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)

        if (initialData.length > 0) {
            setHoursdata(initialData[0]?.hourData)
            setNotes(initialData[0]?.notes || "")
            setEarlyTime(initialData[0]?.earlyTime)
        }
    }, [sideBarData])

    const dispatch = useDispatch()
    const [notes, setNotes] = useState("")
    const [openTimePopUp, setTimePopUp] = useState(false)
    const [hoursOfOperation, setHoursdata] = useState([
        {
            day: "Monday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },
        {
            day: "Tuesday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },

        {
            day: "Wednesday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },
        {
            day: "Thursday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },
        {
            day: "Friday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },
        {
            day: "Saturday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        },
        {
            day: "Sunday",
            close: false,
            alltime: "",
            time: [
                {
                    open: "",
                    close: ""
                }
            ]
        }
    ])
    const [show, setShow] = useState("")
    let Hours24 = get24Hours()
    const [daysSelected, setDaysSelected] = useState([])
    const handleChange = (data) => {
        setOpen(true)
        let hoursOperation = [...hoursOfOperation]
        for (let j = 0; j < hoursOperation.length; j++) {
            for (let i = 0; i < daysSelected.length; i++) {
                if (hoursOperation[j]?.day == daysSelected[i]) {
                    let tempopening = { ...hoursOperation[j] }
                    if (data?.alltime !== "") {
                        tempopening.alltime = data.alltime
                        tempopening.time = [
                            {
                                open: "",
                                close: ""
                            }
                        ]

                        tempopening.close = false
                    } else if (
                        data?.time[0].open !== "" &&
                        data?.time[0].close !== ""
                    ) {
                        tempopening.close = false
                        tempopening.alltime = ""
                        tempopening.time = data.time
                    } else {
                        tempopening.alltime = ""
                        tempopening.time = [
                            {
                                open: "",
                                close: ""
                            }
                        ]
                        tempopening.close = true
                    }
                    hoursOperation[j] = tempopening
                }
            }
        }
        // if (
        //     hoursOfOperation?.filter((it) => it.openingTime[0] != "").length ==
        //         0 &&
        //     earlyTime.value == ""
        // ) {
        //     if (data.everyTimeOpen[0] != "") {
        //         setEarlyTime(data.everyTimeOpen[0])
        //         handleStoreData(
        //             hoursOperation,
        //             { ...earlyTime, value: data.everyTimeOpen[0] },
        //             notes
        //         )
        //     } else {
        //         setEarlyTime(data.opentime[0])
        //         handleStoreData(
        //             hoursOperation,
        //             { ...earlyTime, value: data.opentime[0] },
        //             notes
        //         )
        //     }
        // } else {
        handleStoreData(hoursOperation, earlyTime, notes)
        // }
        setHoursdata(hoursOperation)
    }
    const handleEarlyTime = (value, name) => {
        setEarlyTime({ ...earlyTime, value })

        handleStoreData(hoursOfOperation, { ...earlyTime, value }, notes)
    }
    const submitForm = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/discovery/site-information/revenue-center/${routerID}`,
            query: { inner: true }
        })
    }
    const addOrEditPopUp = (item) => {
        if (!disabled) {
            setDaysSelected([item?.day])
            setTimePopUp(true)
        }
    }
    const handleTextChange = (e) => {
        setNotes(e.target.value)
        handleStoreData(hoursOfOperation, earlyTime, e.target.value)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box className="Hours-of-operation">
                <Typography
                    sx={{
                        fontWeight: "600",
                        paddingRight: "16px",
                        fontSize: {
                            xs: "18px"
                        },
                        lineHeight: {
                            lg: "24px",
                            xs: "28px"
                        },
                        color: "#1E1E1E",

                        mb: "10px"
                    }}
                >
                    Business Hours
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: {
                            xs: "16px"
                        },
                        lineHeight: {
                            xs: "24px"
                        },
                        color: "#5c5c5c",
                        marginTop: {
                            lg: "8px",
                            md: "-2.5px",
                            xs: "-2px"
                        }
                    }}
                >
                    Please specify your business hours by clicking on Edit hours
                </Typography>
            </Box>
            <form
                aria-label="This is hours of operations form"
                action=""
                onSubmit={submitForm}
            >
                <Box
                    className="Hours-of-operation"
                    sx={{
                        position: "relative !important"
                    }}
                >
                    <TableContainer
                        className="shadow"
                        sx={{
                            marginTop: {
                                lg: "32px",
                                xs: "32px"
                            },

                            borderRadius: 2,
                            background: "white",
                            display: {
                                md: "block",
                                xs: "none"
                            }
                        }}
                    >
                        <Table
                            sx={{
                                maxHeight: "430px",
                                minHeight: "430px"
                            }}
                            aria-label="This is Hour of Operation Table"
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        color: theme.palette.textColor.main,
                                        lineHeight: "24px"
                                    }}
                                >
                                    <TableCell
                                        align="left"
                                        colSpan={2}
                                        sx={{
                                            fontSize: "14px ",
                                            fontWeight: "600 ",
                                            px: "16px",
                                            py: { lg: "14.8px", md: "15.5px" },
                                            borderBottom: "1px solid #EBEBEB",
                                            color: "#1e1e1e"
                                        }}
                                    >
                                        Day{" "}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            fontSize: "14px ",
                                            fontWeight: 600,
                                            px: { lg: "16px", md: "20px" },
                                            py: {
                                                lg: "14.8px !important",
                                                md: "15.5px"
                                            },
                                            borderBottom: "1px solid #EBEBEB",
                                            color: "#1e1e1e"
                                        }}
                                    >
                                        Timings
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "1px solid #EBEBEB"
                                        }}
                                    >
                                        {" "}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{}}>
                                {hoursOfOperation.map((item, id) => {
                                    return (
                                        <StyledTableRow
                                            key={id}
                                            sx={{ alignItems: "start" }}
                                        >
                                            <TableCell
                                                colSpan={2}
                                                sx={{
                                                    alignItems: "start",
                                                    px: "16px",
                                                    py: {
                                                        lg: "16.7px",
                                                        md: "16.8px"
                                                    },
                                                    fontSize: {
                                                        lg: "14px"
                                                    },
                                                    fontWeight: {
                                                        lg: "500"
                                                    },
                                                    width: {
                                                        xxl: "357.5px",
                                                        xl: "206px",
                                                        lg: "260px",
                                                        md: "237px"
                                                    },
                                                    borderBottom:
                                                        hoursOfOperation.length -
                                                            1 ==
                                                        id
                                                            ? "none"
                                                            : "1px solid #EBEBEB",
                                                    color: item?.close
                                                        ? "#727272"
                                                        : "#1e1e1e !important",
                                                    verticalAlign:
                                                        item?.time?.length > 1
                                                            ? "top"
                                                            : "middle"
                                                }}
                                            >
                                                {item?.day}
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                sx={{
                                                    px: {
                                                        lg: "16px",
                                                        md: "20.5px"
                                                    },
                                                    py: {
                                                        lg: "16.7px",
                                                        md: "16px"
                                                    },
                                                    fontSize: {
                                                        xs: "14px"
                                                    },
                                                    fontWeight: {
                                                        xs: "400"
                                                    },
                                                    lineHeight: {
                                                        xs: "19px"
                                                    },
                                                    color: "#5C5C5C",

                                                    borderBottom:
                                                        hoursOfOperation.length -
                                                            1 ==
                                                        id
                                                            ? "none"
                                                            : "1px solid #EBEBEB",
                                                    width: {
                                                        xxl: "595px",
                                                        xl: "467px",
                                                        lg: "371px",
                                                        md: "278px"
                                                    }
                                                }}
                                            >
                                                {item?.alltime !== "" ? (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            columnGap: 4
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    theme
                                                                        .fontsize
                                                                        .sm,
                                                                lineHeight:
                                                                    "19px",
                                                                color: "#5c5c5c"
                                                            }}
                                                        >
                                                            {item?.alltime}
                                                        </Typography>

                                                        <Box
                                                            sx={{
                                                                color: theme
                                                                    .palette
                                                                    .secondary
                                                                    .main,
                                                                fontSize:
                                                                    "12px",
                                                                lineHeight:
                                                                    "18px",
                                                                fontWeight: 400,
                                                                textTransform:
                                                                    "capitalize",
                                                                py: "3px",
                                                                px: 2,
                                                                backgroundColor:
                                                                    "#f5f5f5",
                                                                borderRadius: 6
                                                            }}
                                                        >
                                                            End of Day Time
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Box>
                                                        {item?.close ? (
                                                            <Box
                                                                sx={{
                                                                    textTransform:
                                                                        "capitalize"
                                                                }}
                                                            >
                                                                {" "}
                                                                Closed{" "}
                                                            </Box>
                                                        ) : (
                                                            item?.time?.map(
                                                                (
                                                                    item1,
                                                                    idx
                                                                ) => (
                                                                    <Typography
                                                                        key={
                                                                            idx
                                                                        }
                                                                        sx={{
                                                                            fontSize:
                                                                                theme
                                                                                    .fontsize
                                                                                    .sm,
                                                                            lineHeight:
                                                                                "19px",
                                                                            color: item?.close
                                                                                ? "#727272"
                                                                                : "#5C5C5C",
                                                                            mt:
                                                                                idx !=
                                                                                    0 &&
                                                                                3
                                                                        }}
                                                                    >
                                                                        {item1.open ==
                                                                        ""
                                                                            ? "--"
                                                                            : item1.open +
                                                                              " to " +
                                                                              item1.close}
                                                                    </Typography>
                                                                )
                                                            )
                                                        )}
                                                    </Box>
                                                )}
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                sx={{
                                                    padding: "16px",
                                                    width: "103px",
                                                    borderBottom:
                                                        hoursOfOperation.length -
                                                            1 ==
                                                        id
                                                            ? "none"
                                                            : "1px solid #EBEBEB",
                                                    verticalAlign: "top"
                                                }}
                                            >
                                                <Typography
                                                    aria-label="This is Edit Hours button"
                                                    onClick={() =>
                                                        addOrEditPopUp(item)
                                                    }
                                                    sx={{
                                                        cursor: disabled
                                                            ? "default"
                                                            : "pointer",
                                                        fontSize: {
                                                            xs: "14px"
                                                        },
                                                        fontWeight: {
                                                            xs: "500"
                                                        },

                                                        color: "#1D4ED8",
                                                        opacity:
                                                            disabled && 0.5,
                                                        width: "88px",
                                                        textAlign: "right",
                                                        padding: "8px",
                                                        borderRadius: "8px",
                                                        "&:hover": {
                                                            background: disabled
                                                                ? "transparent"
                                                                : "#F5F6FF !important"
                                                        }
                                                    }}
                                                >
                                                    Edit Hours
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {smd && (
                    <Box sx={{ display: { md: "none", xs: "block" } }}>
                        <HoursOfOperationMobile
                            openTimePopUp={openTimePopUp}
                            setopenTimePopUp={setTimePopUp}
                            hoursOfOperation={hoursOfOperation}
                            handleChange={handleChange}
                            setDaysselected={setDaysSelected}
                            daysSelected={daysSelected}
                            disabled={disabled}
                        />
                    </Box>
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        marginTop: {
                            xl: "44px",
                            lg: "33px",
                            md: "44px",
                            xs: "26px"
                        },
                        justifyContent: {
                            md: "space-between",
                            xs: "flex-start"
                        },
                        alignItems: { lg: "center" },
                        columnGap: { md: 3.5 },
                        rowGap: { md: 0, xs: 6 }
                    }}
                    className="Hours-of-operation"
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: {
                                xs: "18px"
                            },
                            lineHeight: {
                                xs: "28px"
                            },
                            color: "#1E1E1E",
                            maxWidth: {
                                xl: "517px",
                                lg: "450px",
                                md: "100%",
                                xs: "100%"
                            },
                            width: "100%"
                        }}
                    >
                        Earliest time any employee will be clocking into the
                        system
                    </Typography>
                    <Box sx={{ mt: { md: -0.5, xs: -0.3 } }}>
                        <SelectBox
                            ariaLabel={"This is Early Time Input Field"}
                            show={show}
                            setShow={setShow}
                            required={true}
                            defaultLabel={"Select Time"}
                            name={`earliestTime`}
                            disabled={disabled}
                            initialValue={earlyTime.value}
                            list={Hours24}
                            handleChange={handleEarlyTime}
                            value={""}
                            widthHourOperation={340}
                            width={xs ? null : sm ? 192 : 340}
                            bgColor="white"
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            marginTop: {
                                xl: "33px",
                                lg: "34px",
                                md: "44px",
                                xs: 6.7
                            },
                            fontWeight: 600,
                            fontSize: {
                                xs: "18px"
                            },
                            lineHeight: {
                                xs: "28px"
                            },
                            color: "#1E1E1E"
                        }}
                    >
                        Special Notes
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: {
                                xl: "10px",
                                lg: "8px",
                                xs: 2
                            },
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: theme.palette.secondary.main
                        }}
                    >
                        Please indicate any special notes about Open or Close
                        times that are not accounted for above. This may include
                        closing certain parts of the day or always closing
                        certain days of the week.
                    </Typography>
                </Box>
                {/* Text area Here */}
                <Box>
                    <MuiTextArea
                        disableText={disabled}
                        handleChange={(e) => handleTextChange(e)}
                        comment={notes}
                        ariaLabel={"This is Special Notes textarea"}
                    />
                </Box>

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        marginTop: { md: "32px", xs: "24px" }
                    }}
                />

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        py: { xs: 5.5 },
                        flexDirection: {
                            lg: "row",
                            md: "column",
                            sm: "column",
                            xs: "column"
                        }
                    }}
                >
                    <Box
                        display="flex"
                        sx={{
                            justifyContent: "flex-end",
                            flexDirection: {
                                lg: "row",
                                md: "row",
                                xs: "column"
                            }
                        }}
                    >
                        <CommonButton
                            className={"next-button"}
                            type={"submit"}
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            disabled={hoursdata.percentage < 100}
                            mt={{ xs: "8px", md: "0px" }}
                            px={"21px"}
                            py={"12px"}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            hover="#062EC9"
                            content={"Next Step"}
                        />
                    </Box>
                </Box>
            </form>
            {open && (
                <Notification
                    open={open}
                    title={"Hours of Operation"}
                    error={"added"}
                    subtitle={"has been added"}
                    close={() => handleClose()}
                />
            )}
            {openTimePopUp && (
                <HoursOfOperationPopUp
                    openTimePopUp={openTimePopUp}
                    setopenTimePopUp={setTimePopUp}
                    data={hoursOfOperation}
                    handleChange={handleChange}
                    setDaysselected={setDaysSelected}
                    daysSelected={daysSelected}
                />
            )}
        </Box>
    )
}
